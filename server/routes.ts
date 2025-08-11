import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertProjectSchema, insertTagSchema, insertProjectTagSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Projects endpoints
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const validationResult = insertProjectSchema.safeParse({
        ...req.body,
        userId: req.user.id
      });

      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid project data", 
          errors: validationResult.error.format() 
        });
      }

      const project = await storage.createProject(validationResult.data);
      
      // Handle tags if provided
      if (req.body.tags && Array.isArray(req.body.tags)) {
        for (const tagName of req.body.tags) {
          // Find or create tag
          let tag = await storage.getTagByName(tagName);
          if (!tag) {
            tag = await storage.createTag({ name: tagName });
          }
          
          // Create project-tag relationship
          await storage.createProjectTag({
            projectId: project.id,
            tagId: tag.id
          });
        }
      }

      const projectWithTags = await storage.getProjectById(project.id);
      res.status(201).json(projectWithTags);
    } catch (error) {
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.project.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden: You don't own this project" });
      }

      // Update project
      const validatedData = insertProjectSchema.parse({
        ...req.body,
        userId: req.user.id,
      });

      await storage.updateProject(id, validatedData);
      
      // Handle tags - remove existing and add new ones
      if (req.body.tags && Array.isArray(req.body.tags)) {
        // Remove existing tags
        await storage.removeProjectTags(id);
        
        // Add new tags
        for (const tagName of req.body.tags) {
          let tag = await storage.getTagByName(tagName);
          if (!tag) {
            tag = await storage.createTag({ name: tagName });
          }
          
          await storage.createProjectTag({
            projectId: id,
            tagId: tag.id
          });
        }
      }

      const updatedProject = await storage.getProjectById(id);
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.project.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden: You don't own this project" });
      }

      // Remove project tags first
      await storage.removeProjectTags(id);
      
      // Then remove the project
      await storage.deleteProject(id);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Update project status endpoint
  app.patch("/api/projects/:id/status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autorizado" });
    }

    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID de projeto inválido" });
      }

      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
      }

      if (project.project.userId !== req.user.id) {
        return res.status(403).json({ message: "Proibido: Você não é dono deste projeto" });
      }

      // Validate status
      const statusSchema = z.object({
        publishedStatus: z.enum(['published', 'draft', 'hidden'])
      });

      const validationResult = statusSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Status de publicação inválido", 
          errors: validationResult.error.format() 
        });
      }

      // Update project status
      await storage.updateProject(id, {
        ...project.project,
        publishedStatus: validationResult.data.publishedStatus
      });
      
      const updatedProject = await storage.getProjectById(id);
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: "Falha ao atualizar o status do projeto" });
    }
  });

  // Tags endpoints
  app.get("/api/tags", async (req, res) => {
    try {
      const tags = await storage.getAllTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tags" });
    }
  });

  // Like endpoints
  app.post("/api/projects/:id/like", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Generate user fingerprint from IP and User-Agent
      const userFingerprint = req.ip + "|" + (req.get('User-Agent') || 'unknown');
      
      const liked = await storage.likeProject(id, userFingerprint);
      const likesCount = await storage.getProjectLikes(id);
      
      res.json({ 
        success: liked, 
        liked: true,
        likesCount 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to like project" });
    }
  });

  app.delete("/api/projects/:id/like", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Generate user fingerprint from IP and User-Agent
      const userFingerprint = req.ip + "|" + (req.get('User-Agent') || 'unknown');
      
      const unliked = await storage.unlikeProject(id, userFingerprint);
      const likesCount = await storage.getProjectLikes(id);
      
      res.json({ 
        success: unliked, 
        liked: false,
        likesCount 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to unlike project" });
    }
  });

  app.get("/api/projects/:id/like-status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Generate user fingerprint from IP and User-Agent
      const userFingerprint = req.ip + "|" + (req.get('User-Agent') || 'unknown');
      
      const isLiked = await storage.isProjectLiked(id, userFingerprint);
      const likesCount = await storage.getProjectLikes(id);
      
      res.json({ 
        liked: isLiked,
        likesCount 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get like status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
