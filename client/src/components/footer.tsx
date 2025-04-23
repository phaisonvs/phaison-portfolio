import { Link } from "wouter";
import logoPhaison from "@assets/logo-phaison.png";
import { FaTwitter, FaInstagram, FaLinkedin, FaDribbble, FaBehance } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-4 py-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo and Copyright */}
          <div className="flex items-center mb-6 md:mb-0">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <img src={logoPhaison} alt="Phaison Logo" className="h-8" />
            </Link>
            <span className="ml-3 font-medium text-white">Phaison</span>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6 md:mb-0">
            <Link href="/projects" className="text-gray-400 hover:text-white text-sm transition-colors">
              Projects
            </Link>
            <Link href="/templates" className="text-gray-400 hover:text-white text-sm transition-colors">
              Templates
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy
            </Link>
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin size={18} />
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaDribbble size={18} />
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaBehance size={18} />
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs pt-6 border-t border-white/5">
          © {new Date().getFullYear()} Phaison Design. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
