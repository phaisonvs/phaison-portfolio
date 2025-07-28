import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/features/home/home-page";
import ProjectsPage from "@/features/projetos/projects-page";
import ProjectDetail from "@/features/projetos/project-detail";
import AboutPage from "@/features/home/about-page";
import AuthPage from "@/features/auth/auth-page";
import DashboardPage from "@/features/dashboard/dashboard-page";
import NotFound from "@/features/shared/not-found";
import { ProtectedRoute } from "@/lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";
import { PageTransition } from "@/features/shared/page-transition";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/about" component={AboutPage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/dashboard/projects" component={DashboardPage} />
      <ProtectedRoute path="/dashboard/new-project" component={DashboardPage} />
      <ProtectedRoute path="/dashboard/edit-project/:id" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <PageTransition />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
