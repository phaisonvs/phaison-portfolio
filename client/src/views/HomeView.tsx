import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { CategoryCard } from "@/components/category-card";
import { PluginCard } from "@/components/plugin-card";
import { TemplateCard } from "@/components/template-card";
import { ProfessionalExperience } from "@/components/professional-experience";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Box, SlidersIcon, ImageIcon, LightbulbIcon } from "lucide-react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious, 
  type CarouselApi 
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { ProjectWithTags } from "@shared/schema";

interface HomeViewProps {
  projects: ProjectWithTags[] | undefined;
  bestApi: CarouselApi | null;
  setBestApi: (api: CarouselApi | null) => void;
  categoriesApi: CarouselApi | null;
  setCategoriesApi: (api: CarouselApi | null) => void;
  pluginsApi: CarouselApi | null;
  setPluginsApi: (api: CarouselApi | null) => void;
  templatesApi: CarouselApi | null;
  setTemplatesApi: (api: CarouselApi | null) => void;
  animatedElements: React.MutableRefObject<HTMLElement[]>;
}

export function HomeView({
  projects,
  bestApi,
  setBestApi,
  categoriesApi,
  setCategoriesApi,
  pluginsApi,
  setPluginsApi,
  templatesApi,
  setTemplatesApi,
}: HomeViewProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-grow">
        {/* Project Highlights */}
        <section className="py-12 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold animate-on-scroll">Destaques</h2>
              <Link href="/projects" className="text-primary hover:underline transition-all duration-200">
                Ver todos os projetos
              </Link>
            </div>

            <div className="animate-on-scroll relative">
              <Carousel
                setApi={setBestApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {projects && projects.length > 0 ? (
                    projects.slice(0, 6).map((project) => (
                      <CarouselItem key={project.project.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <ProjectCard project={project} />
                      </CarouselItem>
                    ))
                  ) : (
                    // Placeholder cards when no projects exist
                    Array.from({ length: 6 }).map((_, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <ProjectCard
                          project={{
                            project: {
                              id: index,
                              title: "Projeto Exemplo",
                              description: "Um belo projeto de exemplo",
                              imageUrl: `https://source.unsplash.com/random/600x800?design,${index}`,
                              galleryImages: [],
                              sectionDisplay: "general",
                              userId: 1,
                              category: "Exemplo",
                              publishedStatus: "published",
                              createdAt: new Date().toISOString(),
                            },
                            user: {
                              id: 1,
                              name: "João Designer",
                              avatarUrl: null,
                            },
                            tags: [{ id: 1, name: "Website" }]
                          }}
                        />
                      </CarouselItem>
                    ))
                  )}
                </CarouselContent>
                <div className="flex justify-center items-center mt-4">
                  <CarouselPrevious className="bg-black/40 hover:bg-black/60 border-none" />
                  <CarouselNext className="bg-black/40 hover:bg-black/60 border-none" />
                </div>
              </Carousel>
              <CarouselDots api={bestApi} className="mt-4" />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 animate-on-scroll">Categorias</h2>

            <div className="animate-on-scroll relative">
              <Carousel
                setApi={setCategoriesApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                    <CategoryCard
                      title="Websites"
                      description="Belos sites para criadores, artistas e empresas"
                      images={[
                        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                      ]}
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                    <CategoryCard
                      title="Aplicativos Móveis"
                      description="Experiências interativas com animações suaves"
                      images={[
                        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                      ]}
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                    <CategoryCard
                      title="Design 3D"
                      description="Experiências 3D imersivas e visualizações"
                      images={[
                        "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1638913972776-873fc7af3fdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                      ]}
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                    <CategoryCard
                      title="UI/UX Design"
                      description="Interfaces elegantes e intuitivas"
                      images={[
                        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                      ]}
                    />
                  </CarouselItem>
                </CarouselContent>
                <div className="flex justify-center items-center mt-4">
                  <CarouselPrevious className="bg-black/40 hover:bg-black/60 border-none" />
                  <CarouselNext className="bg-black/40 hover:bg-black/60 border-none" />
                </div>
              </Carousel>
              <CarouselDots api={categoriesApi} className="mt-4" />
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="py-16 md:py-24 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="animate-on-scroll">
                <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
                  Olá, sou desenvolvedor apaixonado por criar experiências digitais incríveis
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Com mais de 3 anos de experiência em desenvolvimento frontend e fullstack, 
                  especializo-me em criar interfaces elegantes e funcionais que conectam 
                  pessoas e tecnologia de forma natural.
                </p>
                <p className="text-base text-gray-500 mb-8 leading-relaxed">
                  Minha jornada começou com curiosidade sobre como as coisas funcionam na web, 
                  e hoje trabalho com empresas ao redor do mundo criando soluções que fazem 
                  a diferença no dia a dia das pessoas.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">React</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">TypeScript</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Node.js</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Vue.js</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">UI/UX</span>
                </div>
              </div>
              
              {/* Visual Content */}
              <div className="space-y-6 animate-on-scroll">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80"
                    alt="Perfil profissional"
                    className="relative rounded-2xl w-full h-80 object-cover shadow-2xl"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-zinc-900/50 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                    <div className="text-2xl font-bold text-primary mb-1">3+</div>
                    <div className="text-xs text-gray-400">Anos Exp.</div>
                  </div>
                  <div className="p-4 bg-zinc-900/50 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                    <div className="text-2xl font-bold text-primary mb-1">50+</div>
                    <div className="text-xs text-gray-400">Projetos</div>
                  </div>
                  <div className="p-4 bg-zinc-900/50 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                    <div className="text-2xl font-bold text-primary mb-1">100%</div>
                    <div className="text-xs text-gray-400">Dedicação</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats section after the main content */}
            <div className="grid md:grid-cols-3 gap-8 animate-on-scroll mt-16">
              <div className="text-center p-6 rounded-xl bg-zinc-900/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <div className="text-gray-400">Anos de Experiência</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-zinc-900/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-400">Projetos Realizados</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-zinc-900/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-400">Dedicação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section id="contact" className="py-16 md:py-24 px-4 bg-zinc-900/20">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="animate-on-scroll">
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
                Vamos construir algo incrível juntos?
              </h2>
              <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                Se você tem um projeto em mente ou quer conversar sobre oportunidades, 
                estou sempre aberto para novos desafios e colaborações.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-black font-medium">
                  <a href="mailto:contato@exemplo.com">
                    Enviar Email
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
              
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-800 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-full group"
                >
                  <FaInstagram className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-800 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-full group"
                >
                  <FaLinkedin className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-800 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-full group"
                >
                  <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}