import { useQuery, useMutation } from "@tanstack/react-query";
import { ProjectWithTags } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ProjectModel } from "@/models/ProjectModel";

export class ProjectController {
  static useProjectsQuery() {
    return useQuery<ProjectWithTags[]>({
      queryKey: ["/api/projects"],
    });
  }

  static useProjectQuery(id: string) {
    return useQuery<ProjectWithTags>({
      queryKey: ["/api/projects", id],
    });
  }

  static useTagsQuery() {
    return useQuery<{ id: number, name: string }[]>({
      queryKey: ["/api/tags"],
    });
  }

  static useCreateProjectMutation() {
    return useMutation({
      mutationFn: async (projectData: any) => {
        const res = await apiRequest("POST", "/api/projects", projectData);
        return await res.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      },
    });
  }

  static useUpdateProjectMutation() {
    return useMutation({
      mutationFn: async ({ id, ...projectData }: any) => {
        const res = await apiRequest("PUT", `/api/projects/${id}`, projectData);
        return await res.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      },
    });
  }

  static useDeleteProjectMutation() {
    return useMutation({
      mutationFn: async (id: string) => {
        await apiRequest("DELETE", `/api/projects/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      },
    });
  }

  static filterProjectsByTag(projects: ProjectWithTags[] | undefined, selectedTag: string | null): ProjectWithTags[] {
    if (!projects) return [];
    if (!selectedTag) return projects;
    return ProjectModel.filterByTag(projects, selectedTag);
  }
}