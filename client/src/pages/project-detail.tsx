import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { ProjectWithTags } from "@shared/schema";
import { getInitials } from "@/lib/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ImageGallery } from "@/components/projects/image-gallery";
import { PinterestGallery } from "@/components/projects/pinterest-gallery";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [isShareExpanded, setIsShareExpanded] = useState(false);
  const [showFloatingInfo, setShowFloatingInfo] = useState(false);

  const { data: project, isLoading, error } = useQuery<ProjectWithTags>({
    queryKey: [`/api/projects/${id}`],
    enabled: !!id,
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Handle scroll to show/hide floating info
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingInfo(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => navigate('/projects')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Projetos
          </Button>
          
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">Project not found</h3>
            <p className="text-gray-400 mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/projects')}>
              Browse Projects
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-3 pt-12 md:pt-12 pb-20 md:pb-12">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/projects')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Projetos
        </Button>

        {/* Mobile Layout: Project info below back button */}
        <div className="block lg:hidden mb-8">
          <h1 className="text-3xl font-semibold mb-4">{project.project.title}</h1>
          
          <div className="flex items-center mb-6">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src={project.user.avatarUrl || undefined}
                alt={project.user.name}
              />
              <AvatarFallback>
                {getInitials(project.user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{project.user.name}</p>
              <p className="text-sm text-gray-400">
                {new Date(project.project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery and details */}
          <div className="lg:col-span-8">
            {/* Desktop Layout: Project info above gallery */}
            <div className="hidden lg:block mb-8">
              <h1 className="text-3xl font-semibold mb-4">{project.project.title}</h1>
              
              <div className="flex items-center mb-6">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={project.user.avatarUrl || undefined}
                    alt={project.user.name}
                  />
                  <AvatarFallback>
                    {getInitials(project.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{project.user.name}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(project.project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              {/* Convertemos as imagens da galeria para o formato esperado pelo componente ImageGallery */}
              <ImageGallery 
                images={(project.project.galleryImages || []).map(image => ({
                  src: image,
                  alt: `${project.project.title} - Gallery image`
                }))}
                mainImage={project.project.imageUrl}
              />
            </div>

            {/* Project Description - Appears below gallery for both mobile and desktop */}
            <div className="mb-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 whitespace-pre-line">{project.project.description}</p>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Seção de recursos/funcionalidades */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-8">Características do Projeto</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Recursos com base na categoria do projeto */}
                {project.project.category === "Website" && (
                  <>
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                      <h3 className="text-xl font-medium mb-3">Design Responsivo</h3>
                      <p className="text-gray-400 mb-4">
                        Experiência perfeita em todos os dispositivos, de desktops a smartphones.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {["Mobile", "Tablet", "Desktop"].map(device => (
                          <span key={device} className="inline-flex items-center px-3 py-1 bg-zinc-800 rounded-full text-xs">
                            {device}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                      <h3 className="text-xl font-medium mb-3">Performance Otimizada</h3>
                      <p className="text-gray-400 mb-4">
                        Carregamento rápido e experiência fluida, com SEO aprimorado para melhor visibilidade.
                      </p>
                      <div className="mt-4">
                        <div className="bg-green-500/20 inline-block px-3 py-1 rounded-full">
                          <span className="text-green-500 text-sm font-medium">Performance Score: 96</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                      <h3 className="text-xl font-medium mb-3">Gestão de Conteúdo</h3>
                      <p className="text-gray-400 mb-4">
                        Painel administrativo intuitivo para gerenciar todos os aspectos do site.
                      </p>
                      <div className="mt-4">
                        <div className="bg-zinc-800 px-3 py-1 rounded-full inline-block">
                          <span className="text-white/80 text-sm">CMS Integrado</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {project.project.category === "Mobile App" && (
                  <>
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                      <h3 className="text-xl font-medium mb-3">Experiência Nativa</h3>
                      <p className="text-gray-400 mb-4">
                        Desenvolvido para iOS e Android utilizando as melhores práticas de cada plataforma.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {["iOS", "Android", "Cross-platform"].map(platform => (
                          <span key={platform} className="inline-flex items-center px-3 py-1 bg-zinc-800 rounded-full text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                      <h3 className="text-xl font-medium mb-3">Funcionamento Offline</h3>
                      <p className="text-gray-400 mb-4">
                        Acesso às funcionalidades principais mesmo sem conexão com internet.
                      </p>
                      <div className="mt-4">
                        <div className="bg-blue-500/20 inline-block px-3 py-1 rounded-full">
                          <span className="text-blue-500 text-sm font-medium">Sincronização Inteligente</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                      <h3 className="text-xl font-medium mb-3">Notificações Push</h3>
                      <p className="text-gray-400 mb-4">
                        Sistema de engajamento com notificações personalizadas baseadas no perfil do usuário.
                      </p>
                      <div className="mt-4">
                        <div className="bg-zinc-800 px-3 py-1 rounded-full inline-block">
                          <span className="text-white/80 text-sm">Engajamento +45%</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Recursos genéricos para outras categorias */}
                {(project.project.category !== "Website" && project.project.category !== "Mobile App") && (
                  <>
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                      <h3 className="text-xl font-medium mb-3">Design Intuitivo</h3>
                      <p className="text-gray-400 mb-4">
                        Interface pensada para facilitar a interação e proporcionar a melhor experiência de usuário.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {["UX", "UI", "Acessibilidade"].map(feature => (
                          <span key={feature} className="inline-flex items-center px-3 py-1 bg-zinc-800 rounded-full text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                      <h3 className="text-xl font-medium mb-3">Personalização</h3>
                      <p className="text-gray-400 mb-4">
                        Múltiplas opções de customização para atender às necessidades específicas de cada cliente.
                      </p>
                      <div className="mt-4">
                        <div className="bg-[#836DF1]/20 inline-block px-3 py-1 rounded-full">
                          <span className="text-[#836DF1] text-sm font-medium">100% Adaptável</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                      <h3 className="text-xl font-medium mb-3">Suporte Premium</h3>
                      <p className="text-gray-400 mb-4">
                        Equipe especializada disponível para garantir o sucesso do projeto em todas as etapas.
                      </p>
                      <div className="mt-4">
                        <div className="bg-zinc-800 px-3 py-1 rounded-full inline-block">
                          <span className="text-white/80 text-sm">24/7 Disponível</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Banner específico baseado na categoria */}
              <div className="mt-8 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 flex flex-col justify-center">
                    {project.project.category === "Website" && (
                      <>
                        <h3 className="text-xl font-medium mb-2">Integração com APIs</h3>
                        <p className="text-gray-400 mb-4">
                          Conecte seu site a sistemas externos facilmente através de APIs RESTful e GraphQL.
                        </p>
                      </>
                    )}
                    {project.project.category === "Mobile App" && (
                      <>
                        <h3 className="text-xl font-medium mb-2">Biometria e Segurança</h3>
                        <p className="text-gray-400 mb-4">
                          Autenticação avançada com reconhecimento facial e digital para maior segurança.
                        </p>
                      </>
                    )}
                    {(project.project.category !== "Website" && project.project.category !== "Mobile App") && (
                      <>
                        <h3 className="text-xl font-medium mb-2">Análise de Dados</h3>
                        <p className="text-gray-400 mb-4">
                          Visualizações interativas e relatórios detalhados para tomada de decisões inteligentes.
                        </p>
                      </>
                    )}

                  </div>
                  <div className="flex justify-center items-center p-6 bg-gradient-to-br from-zinc-900 to-black">
                    <img 
                      src={(project.project.galleryImages && project.project.galleryImages.length > 0) 
                        ? project.project.galleryImages[0] 
                        : project.project.imageUrl} 
                      alt={project.project.title} 
                      className="max-h-48 w-auto object-contain rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Mobile: Compact floating project info - only visible after scrolling 100px */}
            {showFloatingInfo && (
              <div className={`fixed bottom-4 left-4 right-4 z-50 lg:hidden transition-all duration-500 ease-in-out transform ${showFloatingInfo ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl walking-light-border-mobile"></div>
                  <div className="relative bg-zinc-900 rounded-xl p-4 shadow-2xl z-10">
                    <div className="flex items-center space-x-3">
                  {/* Project Info - no image */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{project.project.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Avatar className="h-5 w-5">
                        <AvatarImage
                          src={project.user.avatarUrl || undefined}
                          alt={project.user.name}
                        />
                        <AvatarFallback className="text-xs">
                          {getInitials(project.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{project.user.name}</span>
                      <span>•</span>
                      <span>{new Date(project.project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Share Button */}
                  <button 
                    onClick={() => setIsShareExpanded(!isShareExpanded)}
                    className={`text-gray-400 hover:text-white transition-all duration-300 p-2 ${isShareExpanded ? 'rotate-45' : 'rotate-0'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>

                {/* Expanded Social Media Icons with smooth transition */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isShareExpanded ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                  <div className={`pt-4 border-t border-zinc-700 transition-all duration-300 ${isShareExpanded ? 'transform translate-y-0' : 'transform -translate-y-4'}`}>
                    <p className="text-sm text-gray-400 mb-3 text-center">Compartilhar</p>
                    <div className="flex justify-center space-x-6">
                      <button className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop: Simplified sticky sidebar */}
            <div className="hidden lg:block bg-zinc-900 rounded-xl p-6 sticky top-24">
              {/* Card de Compartilhamento com Luzinha Circulante */}
              <div className="relative share-card-container">
                <div className="absolute inset-0 rounded-xl walking-light-border"></div>
                <div className="relative bg-zinc-900 p-4 rounded-xl z-10">
                  <p className="text-sm text-gray-400 mb-3">Compartilhar</p>
                  <div className="flex space-x-4">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.80-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shared CSS for walking light animation */}
        <style>{`
          .walking-light-border {
            border-radius: 0.75rem;
            position: relative;
            background: transparent;
          }
          
          .walking-light-border::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: 0.75rem;
            background: conic-gradient(from 0deg, #4ade80, #3b82f6, #8b5cf6, #4ade80);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask-composite: xor;
            padding: 2px;
            animation: walkingLight 4s linear infinite;
          }
          
          .walking-light-border-mobile {
            border-radius: 0.75rem;
            position: relative;
            background: transparent;
          }
          
          .walking-light-border-mobile::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: 0.75rem;
            background: conic-gradient(from 0deg, #4ade80, #3b82f6, #8b5cf6, #4ade80);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask-composite: xor;
            padding: 2px;
            animation: walkingLight 4s linear infinite;
          }
          
          @keyframes walkingLight {
            0% {
              background: conic-gradient(from 0deg, #4ade80, #3b82f6, #8b5cf6, #4ade80);
            }
            25% {
              background: conic-gradient(from 90deg, #4ade80, #3b82f6, #8b5cf6, #4ade80);
            }
            50% {
              background: conic-gradient(from 180deg, #4ade80, #3b82f6, #8b5cf6, #4ade80);
            }
            75% {
              background: conic-gradient(from 270deg, #4ade80, #3b82f6, #8b5cf6, #4ade80);
            }
            100% {
              background: conic-gradient(from 360deg, #4ade80, #3b82f6, #8b5cf6, #4ade80);
            }
          }
        `}</style>

      </main>

      <Footer />
    </div>
  );
}
