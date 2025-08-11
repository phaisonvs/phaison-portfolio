import { useEffect } from "react";
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

  const { data: project, isLoading, error } = useQuery<ProjectWithTags>({
    queryKey: [`/api/projects/${id}`],
    enabled: !!id,
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
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

      <main className="flex-grow container mx-auto px-4 py-12 pt-20 md:pt-12">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/projects')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Projetos
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery and details */}
          <div className="lg:col-span-8">
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

            <Separator className="my-6" />

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 whitespace-pre-line">{project.project.description}</p>
            </div>
            
            <Separator className="my-8" />
            
            {/* Métricas e Resultados */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-8">Resultados e Métricas</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="text-3xl font-bold text-green-400 mb-2">96%</div>
                  <div className="text-sm text-gray-400">Performance Score</div>
                </div>
                <div className="text-center p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="text-3xl font-bold text-blue-400 mb-2">45%</div>
                  <div className="text-sm text-gray-400">Aumento no Engajamento</div>
                </div>
                <div className="text-center p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="text-3xl font-bold text-purple-400 mb-2">2.3s</div>
                  <div className="text-sm text-gray-400">Tempo de Carregamento</div>
                </div>
                <div className="text-center p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">98%</div>
                  <div className="text-sm text-gray-400">Satisfação do Cliente</div>
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Processo de Desenvolvimento */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-8">Processo de Desenvolvimento</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Descoberta e Pesquisa</h3>
                      <p className="text-gray-400 text-sm">Análise aprofundada dos requisitos, público-alvo e concorrência para definir a estratégia do projeto.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Design e Prototipagem</h3>
                      <p className="text-gray-400 text-sm">Criação de wireframes, protótipos interativos e design system completo no Figma.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Desenvolvimento</h3>
                      <p className="text-gray-400 text-sm">Implementação técnica seguindo as melhores práticas de código e metodologia ágil.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-semibold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Testes e Otimização</h3>
                      <p className="text-gray-400 text-sm">Testes de usabilidade, performance e correções baseadas no feedback dos usuários.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-semibold">5</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Lançamento</h3>
                      <p className="text-gray-400 text-sm">Deploy em produção com monitoramento contínuo e suporte pós-lançamento.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-semibold">6</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Manutenção</h3>
                      <p className="text-gray-400 text-sm">Atualizações regulares, melhorias baseadas em dados e suporte técnico contínuo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Desafios e Soluções */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-8">Desafios e Soluções</h2>
              
              <div className="space-y-6 mb-12">
                <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-red-400">🚫 Desafio Principal</h3>
                      <p className="text-gray-300 mb-4">
                        Integração complexa com múltiplos sistemas legados e necessidade de manter alta performance durante picos de acesso.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-green-400">✅ Solução Implementada</h3>
                      <p className="text-gray-300">
                        Arquitetura de microserviços com cache distribuído e CDN global, resultando em 40% de melhoria na velocidade de resposta.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-red-400">🚫 Desafio Técnico</h3>
                      <p className="text-gray-300 mb-4">
                        Compatibilidade com navegadores mais antigos e dispositivos com baixa conectividade.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-green-400">✅ Solução Aplicada</h3>
                      <p className="text-gray-300">
                        Progressive Web App (PWA) com fallbacks inteligentes e otimização de imagens adaptativa por contexto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Tecnologias Utilizadas */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-8">Stack Tecnológico</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind CSS", "Framer Motion"].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold mb-4 text-green-400">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express", "PostgreSQL", "Redis"].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">Ferramentas</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Figma", "Docker", "AWS", "GitHub Actions"].map(tool => (
                      <span key={tool} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
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
                        <div className="bg-purple-500/20 inline-block px-3 py-1 rounded-full">
                          <span className="text-purple-500 text-sm font-medium">100% Adaptável</span>
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
            
            {/* Feedback do Cliente */}
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-8">Feedback do Cliente</h2>
              
              <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-8 border border-zinc-700">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl font-bold">JD</span>
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-lg text-gray-200 italic mb-4">
                      "O resultado superou nossas expectativas. A equipe demonstrou profundo entendimento do nosso negócio e entregou uma solução que realmente faz a diferença no dia a dia dos nossos usuários."
                    </blockquote>
                    <div>
                      <p className="font-semibold text-white">João Silva</p>
                      <p className="text-sm text-gray-400">Diretor de Tecnologia • Empresa Demo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Próximos Passos */}
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-8">Próximos Passos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold mb-3">Fase 2 - Expansão</h3>
                  <p className="text-gray-400 mb-4">
                    Implementação de funcionalidades avançadas baseadas no feedback dos usuários e dados de analytics.
                  </p>
                  <div className="text-sm text-gray-500">
                    Previsto: Q2 2025
                  </div>
                </div>
                
                <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-semibold mb-3">Otimizações Contínuas</h3>
                  <p className="text-gray-400 mb-4">
                    Monitoramento de performance e implementação de melhorias baseadas em dados reais de uso.
                  </p>
                  <div className="text-sm text-gray-500">
                    Em andamento
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-zinc-900 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Detalhes do Projeto</h3>
              
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Categoria</p>
                <p>{project.project.category}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                  {project.tags.length === 0 && (
                    <p className="text-gray-500">No tags</p>
                  )}
                </div>
              </div>

              {/* Card de Compartilhamento com Animação Neon */}
              <div className="relative share-card-container">
                <div className="absolute inset-0 rounded-xl neon-border"></div>
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
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
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

              <style>{`
                .neon-border {
                  border-radius: 0.75rem;
                  background: linear-gradient(90deg, #4ade80, #3b82f6);
                  padding: 0.3rem;
                  opacity: 0.7;
                  filter: blur(6px);
                  animation: neonPulse 2s infinite alternate;
                }
                
                @keyframes neonPulse {
                  0% {
                    opacity: 0.5;
                    background: linear-gradient(90deg, #4ade80, #3b82f6);
                  }
                  100% {
                    opacity: 0.8;
                    background: linear-gradient(90deg, #3b82f6, #4ade80);
                  }
                }
              `}</style>
            </div>
          </div>
        </div>


      </main>

      <Footer />
    </div>
  );
}
