import { Switch, Route } from "wouter";
import HomePage from "@/pages/home-page";
import ProjectsPage from "@/pages/projects-page";
import ProjectDetailPage from "@/pages/project-detail-page";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import NotFound from "@/pages/not-found";
import { ProtectedRoute } from "./lib/protected-route";

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/inicio" component={HomePage} />
      <Route path="/projetos" component={ProjectsPage} />
      <Route path="/projetos/:id" component={ProjectDetailPage} />
      <Route path="/acesso" component={AuthPage} />
      <ProtectedRoute path="/painel" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}