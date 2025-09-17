import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X } from "lucide-react";
import { FaFigma } from "react-icons/fa";
import logoPath from "@assets/logo-phaison_1749772164016.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleScrollClick('contact')}
                className="transition-colors duration-200 text-white/70 hover:text-primary"
              >
                Contato
              </button>
              <div className="relative group">
                <a 
                  href="https://figma.com/@phaison" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full"
                  aria-label="Acessar portfolio no Figma"
                  data-testid="link-figma-portfolio"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-900/80 border-2 border-primary/60 flex items-center justify-center group-hover:scale-110 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-200">
                    <FaFigma className="h-4 w-4 text-white" />
                  </div>
                </a>
                
                {/* Hover Tooltip */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="bg-primary text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
                    Portfólio no Figma
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
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
        transition-all duration-500 ease-in-out overflow-hidden mobile-menu-light-border
        ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-b-0'}
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
            
            {/* Portfolio Button */}
            <a 
              href="https://figma.com/@phaison" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg font-medium text-left text-white/70 hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
              Portfolio
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
