import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Menu } from "lucide-react";
import logoPath from "@assets/logo-phaison_1749772164016.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <img src={logoPath} alt="Phaison Logo" className="h-[24px]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <Link 
            href="/" 
            className={`transition-colors duration-200 ${isActive("/") ? "text-white" : "text-white/70 hover:text-primary"}`}
          >
            Galeria
          </Link>
          <Link 
            href="/projects" 
            className={`transition-colors duration-200 ${isActive("/projects") ? "text-white" : "text-white/70 hover:text-primary"}`}
          >
            Projetos
          </Link>
          <Link 
            href="/about" 
            className={`transition-colors duration-200 ${isActive("/about") ? "text-white" : "text-white/70 hover:text-primary"}`}
          >
            Sobre mim
          </Link>
          <button 
            onClick={() => {
              if (window.location.pathname === '/') {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#contact';
              }
            }}
            className="transition-colors duration-200 text-white/70 hover:text-primary"
          >
            Contatos
          </button>
          {user && (
            <Link 
              href="/dashboard" 
              className={`transition-colors duration-200 ${isActive("/dashboard") ? "text-white" : "text-white/70 hover:text-primary"}`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Auth buttons */}
        <div className="hidden items-center space-x-4 md:flex">
          {user ? (
            <>
              <span className="text-white/70">{user.name}</span>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-white/70"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth" className="rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-200 transition duration-200">
                Entrar
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-0 md:hidden" aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black border-white/10">
            <nav className="flex flex-col space-y-4 mt-8">
              <Link 
                href="/" 
                className={`text-lg font-medium ${isActive("/") ? "text-white" : "text-white/70"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Galeria
              </Link>
              <Link 
                href="/projects" 
                className={`text-lg font-medium ${isActive("/projects") ? "text-white" : "text-white/70"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projetos
              </Link>
              <Link 
                href="/about" 
                className={`text-lg font-medium ${isActive("/about") ? "text-white" : "text-white/70"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre mim
              </Link>
              {user && (
                <Link 
                  href="/dashboard" 
                  className={`text-lg font-medium ${isActive("/dashboard") ? "text-white" : "text-white/70"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <div className="pt-4 border-t border-white/10 mt-4">
                {user ? (
                  <>
                    <div className="mb-2 text-white">{user.name}</div>
                    <Button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/auth" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button className="w-full">
                        Entrar
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
