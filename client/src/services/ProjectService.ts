import { apiRequest } from "@/lib/queryClient";
import { ProjectWithTags, InsertProject } from "@shared/schema";

export class ProjectService {
  static async getProjects(): Promise<ProjectWithTags[]> {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  }

  static async getProject(id: string): Promise<ProjectWithTags> {
    const response = await fetch(`/api/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  }

  static async createProject(project: InsertProject): Promise<ProjectWithTags> {
    const response = await apiRequest("POST", "/api/projects", project);
    return response.json();
  }

  static async updateProject(id: string, project: Partial<InsertProject>): Promise<ProjectWithTags> {
    const response = await apiRequest("PUT", `/api/projects/${id}`, project);
    return response.json();
  }

  static async deleteProject(id: string): Promise<void> {
    await apiRequest("DELETE", `/api/projects/${id}`);
  }

  static async getTags() {
    const response = await fetch('/api/tags');
    if (!response.ok) throw new Error('Failed to fetch tags');
    return response.json();
  }
}