import { ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/hooks/use-auth";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();

  if (!user) {
    return null; // This should never happen due to ProtectedRoute, but just in case
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <div className="flex-grow flex">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-64 border-r border-white/10">
          <DashboardSidebar />
        </div>

        {/* Mobile sidebar */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden absolute left-4 top-24">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-black border-r border-white/10">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
