import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ProjectsTable } from "@/components/dashboard/projects-table";
import { ProjectForm } from "@/components/dashboard/project-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, FolderKanban, UserCircle, Clock } from "lucide-react";

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

  return (
    <DashboardLayout>
      {/* Dashboard Overview */}
      {!isProjects && !isNewProject && !isEditProject && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <Button asChild>
              <a href="/dashboard/new-project">New Project</a>
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-zinc-900 border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Projects</CardTitle>
                <FolderKanban className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProjects}</div>
                <p className="text-xs text-gray-400 mt-1">All your projects</p>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Published</CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{publishedCount}</div>
                <p className="text-xs text-gray-400 mt-1">Live projects</p>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Drafts</CardTitle>
                <Clock className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{draftCount}</div>
                <p className="text-xs text-gray-400 mt-1">Work in progress</p>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">User</CardTitle>
                <UserCircle className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData?.name || "User"}</div>
                <p className="text-xs text-gray-400 mt-1">{userData?.username || "username"}</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Projects</h2>
            <ProjectsTable />
          </div>
        </div>
      )}

      {/* Projects List */}
      {isProjects && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Projects</h1>
            <Button asChild>
              <a href="/dashboard/new-project">New Project</a>
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ProjectsTable />
            </TabsContent>
            
            <TabsContent value="published">
              <ProjectsTable />
            </TabsContent>
            
            <TabsContent value="drafts">
              <ProjectsTable />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* New Project Form */}
      {isNewProject && (
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">Create New Project</h1>
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
          <h1 className="text-2xl font-semibold">Edit Project</h1>
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
