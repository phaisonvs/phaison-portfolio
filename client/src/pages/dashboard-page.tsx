import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ProjectsTable } from "@/components/dashboard/projects-table";
import { ProjectForm } from "@/components/dashboard/project-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, FolderKanban, UserCircle, Clock, Eye, EyeOff, Plus, Pencil, Trash, LayoutDashboard } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function DashboardPage() {
  const [location, setLocation] = useLocation();
  const params = useParams();
  
  // Determine which view to show based on the current route
  const isProjects = location === "/dashboard/projects";
  const isNewProject = location === "/dashboard/new-project";
  const isEditProject = location.startsWith("/dashboard/edit-project/");
  const projectId = isEditProject ? parseInt(params.id || "") : undefined;
  
  // Fetch user data
  const { data: userData } = useQuery({
    queryKey: ['/api/user'],
  });

  // Fetch projects for stats
  const { data: projects } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Handle form completion
  const handleFormSuccess = () => {
    setLocation("/dashboard/projects");
  };

  // Project count statistics
  const publishedCount = projects?.filter((p: any) => p.project.publishedStatus === "published").length || 0;
  const draftCount = projects?.filter((p: any) => p.project.publishedStatus === "draft").length || 0;
  const totalProjects = projects?.length || 0;

  // Estados para modais 
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // Handlers para modais
  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  const handleEditProject = (id: number) => {
    setSelectedProjectId(id);
    setShowEditProjectModal(true);
  };

  const handleCloseModals = () => {
    setShowNewProjectModal(false);
    setShowEditProjectModal(false);
    setSelectedProjectId(null);
  };

  return (
    <DashboardLayout>
      {/* Modal de Novo Projeto */}
      <Dialog open={showNewProjectModal} onOpenChange={setShowNewProjectModal}>
        <DialogContent className="max-w-4xl bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Adicionar Novo Projeto</DialogTitle>
            <DialogDescription>
              Preencha os dados do seu novo projeto para publicação
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <ProjectForm 
              onSuccess={() => {
                handleCloseModals();
                // Refrescar a lista de projetos
                setLocation(location);
              }} 
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Projeto */}
      <Dialog open={showEditProjectModal} onOpenChange={setShowEditProjectModal}>
        <DialogContent className="max-w-4xl bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Editar Projeto</DialogTitle>
            <DialogDescription>
              Faça as alterações necessárias no seu projeto
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedProjectId && (
              <ProjectForm 
                projectId={selectedProjectId} 
                onSuccess={() => {
                  handleCloseModals();
                  // Refrescar a lista de projetos
                  setLocation(location);
                }} 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dashboard Overview */}
      {!isProjects && !isNewProject && !isEditProject && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Seu Dashboard</h1>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setLocation("/dashboard/projects")}>
                <Eye className="mr-2 h-4 w-4" />
                Ver Projetos
              </Button>
              <Button onClick={handleNewProject}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Projeto
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-zinc-900 border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Projetos</CardTitle>
                <FolderKanban className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProjects}</div>
                <p className="text-xs text-gray-400 mt-1">Todos os seus projetos</p>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Publicados</CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{publishedCount}</div>
                <p className="text-xs text-gray-400 mt-1">Projetos publicados</p>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Rascunhos</CardTitle>
                <Clock className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{draftCount}</div>
                <p className="text-xs text-gray-400 mt-1">Projetos em andamento</p>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Usuário</CardTitle>
                <UserCircle className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData?.name || "Usuário"}</div>
                <p className="text-xs text-gray-400 mt-1">@{userData?.username || "username"}</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Projetos Recentes</h2>
            <ProjectsTable onEdit={handleEditProject} />
          </div>
        </div>
      )}

      {/* Projects List */}
      {isProjects && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Gerenciar Projetos</h1>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setLocation("/dashboard")}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button onClick={handleNewProject}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Projeto
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Todos os Projetos</TabsTrigger>
              <TabsTrigger value="published">Publicados</TabsTrigger>
              <TabsTrigger value="drafts">Rascunhos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card className="bg-zinc-900 border-none">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg font-medium">Lista de Projetos</CardTitle>
                  <CardDescription>
                    Gerencie todos os seus projetos e suas configurações
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ProjectsTable onEdit={handleEditProject} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="published">
              <Card className="bg-zinc-900 border-none">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg font-medium">Projetos Publicados</CardTitle>
                  <CardDescription>
                    Projetos atualmente visíveis no seu portfólio
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ProjectsTable onEdit={handleEditProject} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="drafts">
              <Card className="bg-zinc-900 border-none">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg font-medium">Projetos em Rascunho</CardTitle>
                  <CardDescription>
                    Projetos em desenvolvimento que não são visíveis publicamente
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ProjectsTable onEdit={handleEditProject} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* New Project Form */}
      {isNewProject && (
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">Criar Novo Projeto</h1>
          <Card className="bg-zinc-900 border-none">
            <CardContent className="pt-6">
              <ProjectForm onSuccess={handleFormSuccess} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Project Form */}
      {isEditProject && projectId && (
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">Editar Projeto</h1>
          <Card className="bg-zinc-900 border-none">
            <CardContent className="pt-6">
              <ProjectForm projectId={projectId} onSuccess={handleFormSuccess} />
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}