import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { ProjectWithTags } from "@shared/schema";
import { getInitials } from "@/lib/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ImageGallery } from "@/components/image-gallery";

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

      <main className="flex-grow container mx-auto px-4 py-12">
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
            
            {/* Seção de recursos/funcionalidades */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-8">Funcionalidades</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Recurso 1 */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-medium mb-3">Pagamentos online</h3>
                  <p className="text-gray-400 mb-4">
                    Aceite pagamentos digitais de clientes de forma simples e segura, com confirmações automáticas.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Cartões", "PIX", "Boleto"].map(method => (
                      <span key={method} className="inline-flex items-center px-3 py-1 bg-zinc-800 rounded-full text-xs">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Recurso 2 */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-medium mb-3">Pagamentos presenciais</h3>
                  <p className="text-gray-400 mb-4">
                    Configure seu terminal para aceitar pagamentos em qualquer lugar com segurança avançada.
                  </p>
                  <div className="mt-4">
                    <div className="bg-zinc-800 inline-block p-2 rounded-lg">
                      <div className="bg-black rounded-lg p-3 inline-block">
                        <div className="text-center text-2xl font-semibold">€500</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recurso 3 */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-medium mb-3">Receba pagamentos rápido</h3>
                  <p className="text-gray-400 mb-4">
                    Use links de pagamento para facilitar transações e receber valores de forma simples.
                  </p>
                  <div className="mt-4">
                    <div className="bg-white inline-block p-2 rounded-lg">
                      <div className="text-center text-2xl font-semibold text-black">€8</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Banner grande */}
              <div className="mt-8 bg-black rounded-xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">Tap to Pay no iPhone</h3>
                  <p className="text-gray-400 mb-4">
                    Aceite pagamentos contactless diretamente no seu iPhone, sem hardware adicional.
                  </p>
                  <button className="inline-flex items-center px-4 py-2 bg-white text-black rounded-full text-sm font-medium">
                    Saber mais
                  </button>
                </div>
                <div className="flex justify-end">
                  <img 
                    src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=450&q=80" 
                    alt="Pagamento com iPhone" 
                    className="h-48 w-auto object-cover"
                  />
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

              <div>
                <p className="text-sm text-gray-400 mb-2">Compartilhar</p>
                <div className="flex space-x-3">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
