import { users, type User, type InsertUser, 
         projects, type Project, type InsertProject,
         tags, type Tag, type InsertTag,
         projectTags, type ProjectTag, type InsertProjectTag,
         type ProjectWithTags } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<ProjectWithTags[]>;
  getProjectById(id: number): Promise<ProjectWithTags | undefined>;
  getProjectsByUserId(userId: number): Promise<ProjectWithTags[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: InsertProject): Promise<void>;
  deleteProject(id: number): Promise<void>;
  
  // Tag methods
  getAllTags(): Promise<Tag[]>;
  getTagById(id: number): Promise<Tag | undefined>;
  getTagByName(name: string): Promise<Tag | undefined>;
  createTag(tag: InsertTag): Promise<Tag>;
  
  // ProjectTag methods
  createProjectTag(projectTag: InsertProjectTag): Promise<ProjectTag>;
  removeProjectTags(projectId: number): Promise<void>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private tags: Map<number, Tag>;
  private projectTags: Map<number, ProjectTag>;
  private userIdCounter: number;
  private projectIdCounter: number;
  private tagIdCounter: number;
  private projectTagIdCounter: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.tags = new Map();
    this.projectTags = new Map();
    this.userIdCounter = 1;
    this.projectIdCounter = 1;
    this.tagIdCounter = 1;
    this.projectTagIdCounter = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });

    // Add some initial tags
    this.createTag({ name: "Website" });
    this.createTag({ name: "Mobile App" });
    this.createTag({ name: "3D Design" });
    this.createTag({ name: "UI/UX" });
    this.createTag({ name: "Branding" });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getAllProjects(): Promise<ProjectWithTags[]> {
    return Array.from(this.projects.values()).map((project) => {
      const user = this.users.get(project.userId);
      const projectTagEntries = Array.from(this.projectTags.values())
        .filter((pt) => pt.projectId === project.id);
      
      const projectTags = projectTagEntries.map((pt) => {
        const tag = this.tags.get(pt.tagId);
        return tag;
      }).filter((tag): tag is Tag => tag !== undefined);

      return {
        project,
        user: user ? { 
          id: user.id, 
          name: user.name, 
          avatarUrl: user.avatarUrl 
        } : { 
          id: 0, 
          name: "Unknown", 
          avatarUrl: null 
        },
        tags: projectTags
      };
    });
  }

  async getProjectById(id: number): Promise<ProjectWithTags | undefined> {
    const project = this.projects.get(id);
    if (!project) {
      return undefined;
    }
    
    const user = this.users.get(project.userId);
    const projectTagEntries = Array.from(this.projectTags.values())
      .filter((pt) => pt.projectId === project.id);
    
    const projectTags = projectTagEntries.map((pt) => {
      const tag = this.tags.get(pt.tagId);
      return tag;
    }).filter((tag): tag is Tag => tag !== undefined);

    return {
      project,
      user: user ? { 
        id: user.id, 
        name: user.name, 
        avatarUrl: user.avatarUrl 
      } : { 
        id: 0, 
        name: "Unknown", 
        avatarUrl: null 
      },
      tags: projectTags
    };
  }

  async getProjectsByUserId(userId: number): Promise<ProjectWithTags[]> {
    const userProjects = Array.from(this.projects.values())
      .filter((project) => project.userId === userId);
    
    return userProjects.map((project) => {
      const user = this.users.get(project.userId);
      const projectTagEntries = Array.from(this.projectTags.values())
        .filter((pt) => pt.projectId === project.id);
      
      const projectTags = projectTagEntries.map((pt) => {
        const tag = this.tags.get(pt.tagId);
        return tag;
      }).filter((tag): tag is Tag => tag !== undefined);

      return {
        project,
        user: user ? { 
          id: user.id, 
          name: user.name, 
          avatarUrl: user.avatarUrl 
        } : { 
          id: 0, 
          name: "Unknown", 
          avatarUrl: null 
        },
        tags: projectTags
      };
    });
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const now = new Date();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: now
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectData: InsertProject): Promise<void> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      throw new Error(`Project with id ${id} not found`);
    }
    
    const updatedProject: Project = {
      ...existingProject,
      ...projectData,
      id: existingProject.id, // Ensure id doesn't change
      createdAt: existingProject.createdAt // Preserve original creation date
    };
    
    this.projects.set(id, updatedProject);
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
  }

  // Tag methods
  async getAllTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }

  async getTagById(id: number): Promise<Tag | undefined> {
    return this.tags.get(id);
  }

  async getTagByName(name: string): Promise<Tag | undefined> {
    return Array.from(this.tags.values()).find(
      (tag) => tag.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async createTag(insertTag: InsertTag): Promise<Tag> {
    const id = this.tagIdCounter++;
    const tag: Tag = { ...insertTag, id };
    this.tags.set(id, tag);
    return tag;
  }

  // ProjectTag methods
  async createProjectTag(insertProjectTag: InsertProjectTag): Promise<ProjectTag> {
    const id = this.projectTagIdCounter++;
    const projectTag: ProjectTag = { ...insertProjectTag, id };
    this.projectTags.set(id, projectTag);
    return projectTag;
  }

  async removeProjectTags(projectId: number): Promise<void> {
    // Find all projectTags with the given projectId and delete them
    Array.from(this.projectTags.entries())
      .filter(([_, pt]) => pt.projectId === projectId)
      .forEach(([key, _]) => this.projectTags.delete(key));
  }
}

export const storage = new MemStorage();
