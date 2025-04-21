import { useState } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate, truncate } from "@/lib/utils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, ExternalLink, Loader2 } from "lucide-react";

export function ProjectsTable() {
  const { toast } = useToast();
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  
  // Fetch projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Delete project mutation
  const deleteProject = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Success!",
        description: "Project deleted successfully.",
      });
      setProjectToDelete(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete project.",
        variant: "destructive",
      });
    },
  });

  // Status badge variant mapping
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'green';
      case 'draft':
        return 'yellow';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-gray-600 rounded-xl">
        <h3 className="text-xl font-medium mb-2">No projects yet</h3>
        <p className="text-gray-400 mb-6">Start by creating your first project</p>
        <Button asChild>
          <Link href="/dashboard/new-project">Create New Project</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-zinc-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-black">
              {projects.map((project: any) => (
                <tr key={project.project.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-zinc-900 overflow-hidden mr-3">
                        <img 
                          src={project.project.imageUrl} 
                          alt={project.project.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{truncate(project.project.title, 30)}</div>
                        <div className="text-xs text-gray-400">{truncate(project.project.description, 40)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary">{project.project.category}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(project.project.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(project.project.publishedStatus)}>
                      {project.project.publishedStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/projects/${project.project.id}`}>
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/edit-project/${project.project.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setProjectToDelete(project.project.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={projectToDelete !== null} onOpenChange={() => setProjectToDelete(null)}>
        <DialogContent className="bg-zinc-900 border-white/10">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setProjectToDelete(null)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => projectToDelete && deleteProject.mutate(projectToDelete)}
              disabled={deleteProject.isPending}
            >
              {deleteProject.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
