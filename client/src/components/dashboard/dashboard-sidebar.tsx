import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle,
  Settings, 
  Home,
  Box,
  SquareCode,
  HelpCircle,
  LogOut
} from "lucide-react";

// Categorized menu items for better organization
const mainMenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    exact: true
  },
  {
    title: "Novo Projeto",
    icon: PlusCircle,
    href: "/dashboard/new-project",
  },
  {
    title: "Home",
    icon: Home,
    href: "/",
    external: true
  },
];

const projectStatusItems = [
  {
    title: "Projetos Publicados",
    icon: FolderKanban,
    href: "/dashboard/projects/published",
  },
  {
    title: "Projetos Ocultos",
    icon: Box,
    href: "/dashboard/projects/hidden",
  },
  {
    title: "Rascunhos",
    icon: SquareCode,
    href: "/dashboard/projects/drafts",
  },
];

const settingsItems = [
  {
    title: "Configurações",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function DashboardSidebar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location === path;
    }
    return location === path || location.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="h-full py-4 flex flex-col bg-black">
      {/* User Profile */}
      <div className="px-4 my-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{user?.name || 'Usuário'}</p>
            <p className="text-xs text-gray-500">@{user?.username || 'username'}</p>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="px-4 py-2">
        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Menu</h3>
        <nav className="space-y-1">
          {mainMenuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive(item.href, item.exact) 
                  ? "bg-zinc-800 text-white" 
                  : "text-gray-400 hover:bg-zinc-900 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Project Status Menu */}
      <div className="px-4 py-2 mt-4">
        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Projetos</h3>
        <nav className="space-y-1">
          {projectStatusItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive(item.href) 
                  ? "bg-zinc-800 text-white" 
                  : "text-gray-400 hover:bg-zinc-900 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Settings Menu */}
      <div className="px-4 py-2 mt-2">
        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Configurações</h3>
        <nav className="space-y-1">
          {settingsItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive(item.href) 
                  ? "bg-zinc-800 text-white" 
                  : "text-gray-400 hover:bg-zinc-900 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="mt-auto">
        <div className="px-4 py-2">
          <nav className="space-y-1">
            <Link 
              href="/dashboard/help"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Ajuda</span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </nav>
        </div>
        
        <div className="px-6 py-4 border-t border-white/10 mt-4">
          <p className="text-xs text-gray-500">Phaison Dashboard v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
