import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Menu } from "lucide-react";
import logoPath from "@assets/logo-phaison_1749772164016.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    let isScrolling = false;

    const handleScroll = () => {
      if (isScrolling) return;
      
      isScrolling = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Se está no topo, sempre mostrar
        if (currentScrollY <= 50) {
          setIsHeaderVisible(true);
          setLastScrollY(currentScrollY);
          isScrolling = false;
          return;
        }

        // Determinar direção do scroll
        if (currentScrollY > lastScrollY) {
          // Scrolling para baixo
          if (scrollDirection !== 'down') {
            setScrollDirection('down');
          }
          if (currentScrollY > 100) {
            setIsHeaderVisible(false);
          }
        } else if (currentScrollY < lastScrollY) {
          // Scrolling para cima
          if (scrollDirection !== 'up') {
            setScrollDirection('up');
          }
          setIsHeaderVisible(true);
        }

        setLastScrollY(currentScrollY);
        isScrolling = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollDirection]);

  const isActive = (path: string) => {
    return location === path;
  };

  const handleScrollClick = (sectionId: string) => {
    if (location === '/') {
      // Já estamos na home, só fazer scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navegue para home e adicione parâmetro na URL para fazer scroll
      navigate(`/?scrollTo=${sectionId}`);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm transition-transform duration-300 ease-in-out walking-light-border ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <img src={logoPath} alt="Phaison Logo" className="h-[24px]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex flex-1 justify-center">
          <button 
            onClick={() => handleScrollClick('hero')}
            className={`transition-colors duration-200 ${location === "/" ? "text-white" : "text-white/70 hover:text-primary"}`}
          >
            Início
          </button>
          <Link 
            href="/projects" 
            className={`transition-colors duration-200 ${isActive("/projects") ? "text-white" : "text-white/70 hover:text-primary"}`}
          >
            Projetos
          </Link>
          <button 
            onClick={() => handleScrollClick('about')}
            className="transition-colors duration-200 text-white/70 hover:text-primary"
          >
            Sobre Mim
          </button>
          <button 
            onClick={() => handleScrollClick('contact')}
            className="transition-colors duration-200 text-white/70 hover:text-primary"
          >
            Contato
          </button>
        </nav>

        {/* No admin area in header - completely hidden */}

        {/* Mobile Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-0 md:hidden" aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black border-white/10">
            <nav className="flex flex-col space-y-4 mt-8">
              <button 
                onClick={() => {
                  handleScrollClick('hero');
                  setIsMenuOpen(false);
                }}
                className={`text-lg font-medium text-left ${location === "/" ? "text-white" : "text-white/70"}`}
              >
                Início
              </button>
              <Link 
                href="/projects" 
                className={`text-lg font-medium ${isActive("/projects") ? "text-white" : "text-white/70"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projetos
              </Link>
              <button 
                onClick={() => {
                  handleScrollClick('about');
                  setIsMenuOpen(false);
                }}
                className="text-lg font-medium text-left text-white/70"
              >
                Sobre Mim
              </button>
              <button 
                onClick={() => {
                  handleScrollClick('contact');
                  setIsMenuOpen(false);
                }}
                className="text-lg font-medium text-left text-white/70"
              >
                Contato
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
