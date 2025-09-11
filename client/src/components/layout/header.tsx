import { useState, useEffect, useRef } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Comportamento de scroll otimizado
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Limpar timeout anterior se existir
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Debounce para otimizar performance
      scrollTimeoutRef.current = setTimeout(() => {
        // Sempre mostrar no topo da página
        if (currentScrollY <= 100) {
          setIsHeaderVisible(true);
        } else {
          // Comportamento de scroll: esconder ao descer, mostrar ao subir
          if (currentScrollY > lastScrollY) {
            // Rolando para baixo - esconder header
            setIsHeaderVisible(false);
            // Fechar menu mobile se estiver aberto
            if (isMenuOpen) {
              setIsMenuOpen(false);
            }
          } else {
            // Rolando para cima - mostrar header
            setIsHeaderVisible(true);
          }
        }
        
        setLastScrollY(currentScrollY);
      }, 10); // Debounce de 10ms para suavidade
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY, isMenuOpen]);

  const isActive = (path: string) => {
    return location === path;
  };

  const handleScrollClick = (sectionId: string) => {
    // Fechar menu mobile ao clicar em qualquer link
    setIsMenuOpen(false);
    
    if (location === "/") {
      // Já estamos na home, só fazer scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navegue para home e adicione parâmetro na URL para fazer scroll
      navigate(`/?scrollTo=${sectionId}`);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Main Header - Fixed */}
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] bg-black/90 backdrop-blur-sm border-b border-white/10 walking-light-border transition-transform duration-300 ease-out ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4 px-4">
          <Link href="/" className="flex items-center space-x-2 z-10">
            <img src={logoPath} alt="Phaison Logo" className="h-[24px]" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex flex-1 justify-center">
            <button
              onClick={() => handleScrollClick("hero")}
              className={`transition-colors duration-200 hover:text-primary ${
                location === "/"
                  ? "text-white"
                  : "text-white/70"
              }`}
            >
              Início
            </button>
            <Link
              href="/projects"
              className={`transition-colors duration-200 hover:text-primary ${
                isActive("/projects")
                  ? "text-white"
                  : "text-white/70"
              }`}
            >
              Projetos
            </Link>
            <button
              onClick={() => handleScrollClick("about")}
              className="transition-colors duration-200 text-white/70 hover:text-primary"
            >
              Sobre Mim
            </button>
            <button
              onClick={() => handleScrollClick("contact")}
              className="transition-colors duration-200 text-white/70 hover:text-primary"
            >
              Contato
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="p-0 md:hidden z-10"
            aria-label="Toggle menu"
            onClick={handleMenuToggle}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Menu - Fixed and positioned below header */}
      <div
        ref={menuRef}
        className={`fixed left-0 right-0 z-[9998] md:hidden bg-black/95 backdrop-blur-sm border-b border-white/10 mobile-menu-light-border transition-all duration-300 ease-out overflow-hidden ${
          isMenuOpen ? "top-[73px] max-h-96 opacity-100" : "top-[73px] max-h-0 opacity-0 border-b-0"
        } ${
          isHeaderVisible ? "" : "-translate-y-[73px]"
        }`}
      >
        <nav className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex flex-col space-y-6">
            <button
              onClick={() => handleScrollClick("hero")}
              className={`text-lg font-medium text-left transition-colors duration-200 hover:text-white ${
                location === "/"
                  ? "text-white"
                  : "text-white/70"
              }`}
            >
              Início
            </button>
            <Link
              href="/projects"
              className={`text-lg font-medium transition-colors duration-200 hover:text-white ${
                isActive("/projects")
                  ? "text-white"
                  : "text-white/70"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Projetos
            </Link>
            <button
              onClick={() => handleScrollClick("about")}
              className="text-lg font-medium text-left text-white/70 hover:text-white transition-colors duration-200"
            >
              Sobre Mim
            </button>
            <button
              onClick={() => handleScrollClick("contact")}
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
