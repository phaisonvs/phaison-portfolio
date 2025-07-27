import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home-page";
import ProjectsPage from "@/pages/projects-page";
import ProjectDetail from "@/pages/project-detail";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import NotFound from "@/pages/not-found";
import { ProtectedRoute } from "@/lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";
import { PageTransition } from "@/components/page-transition";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/inicio" component={HomePage} />
      <Route path="/projetos" component={ProjectsPage} />
      <Route path="/projetos/:id" component={ProjectDetail} />
      <Route path="/acesso" component={AuthPage} />
      <ProtectedRoute path="/painel" component={DashboardPage} />
      <ProtectedRoute path="/painel/projetos" component={DashboardPage} />
      <ProtectedRoute path="/painel/novo-projeto" component={DashboardPage} />
      <ProtectedRoute path="/painel/editar-projeto/:id" component={DashboardPage} />
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
