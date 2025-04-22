import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import logoPhaison from "@assets/logo-phaison.png";
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle,
  Settings, 
  BarChart3,
  Home,
  Box,
  SquareCode,
  Users,
  BookOpen,
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
    title: "Projetos",
    icon: FolderKanban,
    href: "/dashboard/projects",
  },
  {
    title: "Home",
    icon: Home,
    href: "/",
    external: true
  },
];

const resourcesItems = [
  {
    title: "Projetos",
    icon: Box,
    href: "/dashboard/projects",
  },
  {
    title: "Templates",
    icon: SquareCode,
    href: "/dashboard/templates",
  },
];

const connectItems = [
  {
    title: "Contato",
    icon: Users,
    href: "/dashboard/contacts",
  },
  {
    title: "Feed",
    icon: BookOpen,
    href: "/dashboard/feed",
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
      {/* Header with logo */}
      <div className="px-4 mb-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <img src={logoPhaison} alt="Phaison Logo" className="h-8" />
          <div>
            <span className="font-semibold text-sm text-white">Phaison Design</span>
          </div>
        </Link>
      </div>

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

      {/* Resources Section */}
      <div className="px-4 py-2 mt-4">
        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Recursos</h3>
        <nav className="space-y-1">
          {resourcesItems.map((item) => (
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

      {/* Connect Section */}
      <div className="px-4 py-2 mt-2">
        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Conectar</h3>
        <nav className="space-y-1">
          {connectItems.map((item) => (
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
              href="/dashboard/settings"
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive('/dashboard/settings') 
                  ? "bg-zinc-800 text-white" 
                  : "text-gray-400 hover:bg-zinc-900 hover:text-white"
              )}
            >
              <Settings className="h-4 w-4" />
              <span>Configurações</span>
            </Link>
            
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
