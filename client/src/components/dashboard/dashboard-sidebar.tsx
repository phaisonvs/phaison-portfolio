import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle,
  Settings, 
  BarChart3 
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    exact: true
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/dashboard/projects",
  },
  {
    title: "New Project",
    icon: PlusCircle,
    href: "/dashboard/new-project",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  }
];

export function DashboardSidebar() {
  const [location] = useLocation();

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location === path;
    }
    return location === path || location.startsWith(`${path}/`);
  };

  return (
    <div className="h-full py-8 flex flex-col">
      <div className="px-6 mb-8">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">P</span>
          </div>
          <span className="font-semibold text-lg">Dashboard</span>
        </Link>
      </div>

      <nav className="space-y-1 px-3 flex-1">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
              isActive(item.href, item.exact) 
                ? "bg-primary text-white" 
                : "text-gray-400 hover:bg-zinc-900 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-6 py-4 border-t border-white/10">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium">
            AD
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Admin Dashboard</p>
            <p className="text-xs text-gray-500">v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
