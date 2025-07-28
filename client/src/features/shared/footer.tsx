import { Link } from "wouter";
import logoPhaison from "@assets/logo-phaison_1749772164016.png";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-4 py-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo and Copyright */}
          <div className="flex items-center mb-6 md:mb-0">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <img src={logoPhaison} alt="Phaison Logo" className="h-[24px]" />
            </Link>
            <span className="ml-3 font-medium text-white">Phaison</span>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6 md:mb-0">
            <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
              Início
            </Link>
            <Link href="/projects" className="text-gray-400 hover:text-white text-sm transition-colors">
              Projetos
            </Link>
            <button 
              onClick={() => {
                if (window.location.pathname === '/') {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/?scrollTo=about';
                }
              }}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Sobre mim
            </button>
            <button 
              onClick={() => {
                if (window.location.pathname === '/') {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/?scrollTo=contact';
                }
              }}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Contato
            </button>
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaGithub size={18} />
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs pt-6 border-t border-white/5">
          <span>© {new Date().getFullYear()} Phaison Design. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
