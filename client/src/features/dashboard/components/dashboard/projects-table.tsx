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
import { Edit, Trash2, ExternalLink, Loader2, Eye, EyeOff, RefreshCw } from "lucide-react";
import { ProjectForm } from "./project-form";

// Interface para props
interface ProjectsTableProps {
  onEdit?: (id: number) => void;
}

export function ProjectsTable({ onEdit }: ProjectsTableProps) {
  const { toast } = useToast();
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
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
        title: "Projeto excluído",
        description: "O projeto foi excluído com sucesso.",
      });
      setProjectToDelete(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message || "Falha ao excluir o projeto.",
        variant: "destructive",
      });
    },
  });
  
  // Update project status mutation
  const updateProjectStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      await apiRequest("PATCH", `/api/projects/${id}/status`, { publishedStatus: status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Status atualizado",
        description: "O status do projeto foi atualizado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message || "Falha ao atualizar o status do projeto.",
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
        return 'secondary';
      case 'hidden':
        return 'outline';
      default:
        return 'secondary';
    }
  };
  
  // Status label mapping
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'draft':
        return 'Rascunho';
      case 'hidden':
        return 'Oculto';
      default:
        return status;
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
        <h3 className="text-xl font-medium mb-2">Nenhum projeto ainda</h3>
        <p className="text-gray-400 mb-6">Comece criando seu primeiro projeto</p>
        <Button asChild>
          <Link href="/dashboard/new-project">Criar Novo Projeto</Link>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Projeto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
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
                      {getStatusLabel(project.project.publishedStatus)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {/* View button for all projects */}
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/projects/${project.project.id}`}>
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Ver</span>
                        </Link>
                      </Button>
                      
                      {/* Edit button for all projects */}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEdit ? onEdit(project.project.id) : null}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      
                      {/* Status-specific action buttons */}
                      {project.project.publishedStatus === 'published' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateProjectStatus.mutate({ 
                            id: project.project.id, 
                            status: 'hidden' 
                          })}
                          disabled={updateProjectStatus.isPending}
                          title="Ocultar projeto"
                        >
                          <EyeOff className="h-4 w-4 text-amber-500" />
                          <span className="sr-only">Ocultar</span>
                        </Button>
                      )}
                      
                      {project.project.publishedStatus === 'hidden' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateProjectStatus.mutate({ 
                            id: project.project.id, 
                            status: 'published' 
                          })}
                          disabled={updateProjectStatus.isPending}
                          title="Publicar projeto"
                        >
                          <Eye className="h-4 w-4 text-green-500" />
                          <span className="sr-only">Publicar</span>
                        </Button>
                      )}
                      
                      {project.project.publishedStatus === 'draft' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit ? onEdit(project.project.id) : null}
                          title="Continuar edição"
                        >
                          <RefreshCw className="h-4 w-4 text-blue-500" />
                          <span className="sr-only">Continuar edição</span>
                        </Button>
                      )}
                      
                      {/* Delete button for all projects */}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setProjectToDelete(project.project.id)}
                        title="Excluir projeto"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Excluir</span>
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
            <DialogTitle>Excluir Projeto</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setProjectToDelete(null)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => projectToDelete && deleteProject.mutate(projectToDelete)}
              disabled={deleteProject.isPending}
            >
              {deleteProject.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
