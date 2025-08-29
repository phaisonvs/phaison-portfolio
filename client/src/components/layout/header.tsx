import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/logo-phaison_1749772164016.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Evitar cálculos desnecessários se a posição não mudou significativamente
      if (Math.abs(currentScrollY - lastScrollY) < 5) return;
      
      // Sempre mostrar o header quando estiver próximo do topo (até 150px)
      if (currentScrollY <= 150) {
        setIsHeaderVisible(true);
      }
      // Entre 150px e 500px: comportamento normal de esconder/mostrar
      else if (currentScrollY > 150 && currentScrollY <= 500) {
        if (currentScrollY > lastScrollY) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
      }
      // Após 500px: mostrar quando rolar para cima (diferença mínima de 30px)
      else if (currentScrollY > 500) {
        if (currentScrollY > lastScrollY) {
          // Rolando para baixo - esconder
          setIsHeaderVisible(false);
        } else if (lastScrollY - currentScrollY >= 30) {
          // Rolando para cima com movimento significativo - mostrar
          setIsHeaderVisible(true);
        }
        // Se está rolando para cima mas menos de 30px, manter estado atual
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
    <div className="relative">
      {/* Main Header - Fixed */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm transition-all duration-300 ease-in-out walking-light-border ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        } border-b border-white/10`}
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

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="p-0 md:hidden" 
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu - Fixed and positioned below header */}
      <div className={`
        fixed top-[72px] left-0 right-0 z-40 md:hidden bg-black/95 backdrop-blur-sm border-b border-white/10
        transition-all duration-500 ease-in-out overflow-hidden
        ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 border-b-0'}
      `}>
        <nav className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex flex-col space-y-6">
            <button 
              onClick={() => {
                handleScrollClick('hero');
                setIsMenuOpen(false);
              }}
              className={`text-lg font-medium text-left transition-colors duration-200 ${
                location === "/" ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Início
            </button>
            <Link 
              href="/projects" 
              className={`text-lg font-medium transition-colors duration-200 ${
                isActive("/projects") ? "text-white" : "text-white/70 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Projetos
            </Link>
            <button 
              onClick={() => {
                handleScrollClick('about');
                setIsMenuOpen(false);
              }}
              className="text-lg font-medium text-left text-white/70 hover:text-white transition-colors duration-200"
            >
              Sobre Mim
            </button>
            <button 
              onClick={() => {
                handleScrollClick('contact');
                setIsMenuOpen(false);
              }}
              className="text-lg font-medium text-left text-white/70 hover:text-white transition-colors duration-200"
            >
              Contato
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
