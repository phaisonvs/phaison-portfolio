import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { CategoryCard } from "@/components/category-card";
import { PluginCard } from "@/components/plugin-card";
import { TemplateCard } from "@/components/template-card";
import { ProfessionalExperience } from "@/components/professional-experience";

import { useQuery } from "@tanstack/react-query";
import { ProjectWithTags } from "@shared/schema";
import { Box, SlidersIcon, ImageIcon, LightbulbIcon, ChevronLeft, ChevronRight, Download } from "lucide-react";
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

export default function HomePage() {
  const { data: projects } = useQuery<ProjectWithTags[]>({
    queryKey: ["/api/projects"],
  });

  // Carousel APIs
  const [bestApi, setBestApi] = useState<CarouselApi | null>(null);
  const [categoriesApi, setCategoriesApi] = useState<CarouselApi | null>(null);
  const [pluginsApi, setPluginsApi] = useState<CarouselApi | null>(null);
  const [templatesApi, setTemplatesApi] = useState<CarouselApi | null>(null);

  // Animation on scroll
  const animatedElements = useRef<HTMLElement[]>([]);

  // Check for scroll parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scrollTo');
    
    if (scrollTo === 'contact') {
      // Wait for page to load completely before scrolling
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        // Clean up URL
        window.history.replaceState({}, '', '/');
      }, 500);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Se o elemento está entrando na viewport, adicione a classe visible
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
          // Se o elemento está saindo da viewport, remova a classe visible para resetar a animação
          else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      animatedElements.current.push(el as HTMLElement);
      observer.observe(el);
    });

    return () => {
      animatedElements.current.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-grow">


        {/* Project Highlights */}
        <section className="py-12 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold animate-on-scroll">Best</h2>
              <Link href="/projects" className="text-primary hover:underline transition-all duration-200">
                View all projects
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
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 animate-on-scroll">Categories</h2>

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

        {/* Top Plugins */}
        <section className="py-12 px-4">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 animate-on-scroll">Top Plugins</h2>

            <div className="animate-on-scroll relative">
              <Carousel
                setApi={setPluginsApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <PluginCard
                      title="Rotacionador 3D"
                      description="Adicione rotações 3D impressionantes"
                      icon={Box}
                      iconBgColor="bg-blue-500"
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <PluginCard
                      title="Controles Inteligentes"
                      description="Controles interativos com animações"
                      icon={SlidersIcon}
                      iconBgColor="bg-orange-500"
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <PluginCard
                      title="Efeitos de Imagem"
                      description="Filtros e efeitos de imagem profissionais"
                      icon={ImageIcon}
                      iconBgColor="bg-green-500"
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <PluginCard
                      title="Movimento Inteligente"
                      description="Crie animações realistas facilmente"
                      icon={LightbulbIcon}
                      iconBgColor="bg-yellow-500"
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <PluginCard
                      title="Parallax Avançado"
                      description="Efeitos parallax com profundidade incrível"
                      icon={Box}
                      iconBgColor="bg-purple-500"
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <PluginCard
                      title="Suavizador de Vídeo"
                      description="Integração de vídeo perfeita e responsiva"
                      icon={SlidersIcon}
                      iconBgColor="bg-pink-500"
                    />
                  </CarouselItem>
                </CarouselContent>
                <div className="flex justify-center items-center mt-4">
                  <CarouselPrevious className="bg-black/40 hover:bg-black/60 border-none" />
                  <CarouselNext className="bg-black/40 hover:bg-black/60 border-none" />
                </div>
              </Carousel>
              <CarouselDots api={pluginsApi} className="mt-4" />
            </div>
          </div>
        </section>

        {/* Top Templates */}
        <section className="py-12 px-4">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 animate-on-scroll">Top Templates</h2>
          
            <div className="animate-on-scroll relative">
              <Carousel
                setApi={setTemplatesApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <TemplateCard
                      title="Portfolio Pro"
                      description="Template moderno para portfólio"
                      image="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "Design Studio",
                        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                      }}
                      price="R$399"
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <TemplateCard
                      title="Ecommerce Black"
                      description="Experiência premium de compras"
                      image="https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "ShopMakers",
                        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                      }}
                      price="R$499"
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <TemplateCard
                      title="Agency Minimal"
                      description="Site clean para agências"
                      image="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "Creative Co.",
                        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                      }}
                      price="R$349"
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <TemplateCard
                      title="Mobile App Pro"
                      description="Landing page para aplicativos"
                      image="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "AppLabs",
                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                      }}
                      price="R$449"
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <TemplateCard
                      title="Startup X"
                      description="Template moderno para startups"
                      image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "Tech Founders",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                      }}
                      price="R$399"
                    />
                  </CarouselItem>
                  
                  <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <TemplateCard
                      title="Creative Portfolio"
                      description="Para artistas e designers"
                      image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "Art Studio",
                        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                      }}
                      price="R$349"
                    />
                  </CarouselItem>
                </CarouselContent>
                <div className="flex justify-center items-center mt-4">
                  <CarouselPrevious className="bg-black/40 hover:bg-black/60 border-none" />
                  <CarouselNext className="bg-black/40 hover:bg-black/60 border-none" />
                </div>
              </Carousel>
              <CarouselDots api={templatesApi} className="mt-4" />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section id="contact" className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 cta-gradient z-0"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10"></div>
          
          <div className="relative z-20 max-w-[1200px] mx-auto text-center">
            <div className="mb-10 inline-block animate-on-scroll">
              <div className="h-20 w-20 rounded-full bg-primary/20 blue-glow flex items-center justify-center mx-auto mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 animate-on-scroll">
              Pronto para o próximo projeto?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-10 animate-on-scroll">
              Vamos conversar sobre suas ideias e criar algo incrível juntos. 
              Entre em contato e vamos dar vida ao seu projeto.
            </p>
            <div className="space-y-8 animate-on-scroll">
              {/* Social Links */}
              <div className="flex justify-center space-x-8">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <FaInstagram size={24} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <FaLinkedin size={24} />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <FaGithub size={24} />
                </a>
              </div>
              
              {/* Buttons */}
              <div className="flex justify-center gap-4 flex-wrap">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <a href="/curriculum.pdf" download="Curriculum-Phaison.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar currículo
                  </a>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/projects">
                    Ver projetos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-16 md:py-24 px-4">
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
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Vue.js</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Next.js</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">UI/UX Design</span>
                </div>
              </div>

              {/* Image/Avatar Section */}
              <div className="animate-on-scroll flex justify-center md:justify-end">
                <div className="relative">
                  <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="w-72 h-72 rounded-xl bg-zinc-900 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl">👋</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-3 gap-8 animate-on-scroll">
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

        {/* Experience Section */}
        <section className="py-16 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 animate-on-scroll">
              {/* Profile photo above title */}
              <div className="flex justify-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Experiência Profissional</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Minha trajetória profissional construindo produtos digitais em empresas de diferentes portes e segmentos.
              </p>
            </div>
            
            <div className="animate-on-scroll">
              <ProfessionalExperience 
                experiences={[
                  {
                    title: "Frontend Developer",
                    company: "Edgmonics Log",
                    period: "Novembro 2023 - Atual",
                    description: "Leveraged HTML5, CSS3, JavaScript (Vue.js), and TypeScript for tasks ranging from maintenance to new feature development and bug fixing. Integrated tools for Android compilation, with notable contributions including Google Maps API integration.",
                    skills: ["HTML5", "CSS3", "JavaScript", "Vue.js", "TypeScript", "Google Maps API"]
                  },
                  {
                    title: "Full Stack Developer",
                    company: "CreateApps LLC",
                    period: "Abril 2023 - Julho 2023",
                    description: "Achieved system optimization and scalability through meticulous maintenance and improvement, employing React hooks and TypeScript with Next.js. Also pioneered the development of new applications, implementing tools for reusable components, ensuring uniform and scalable interfaces.",
                    skills: ["React", "TypeScript", "Next.js", "UI/UX", "Responsive Design"]
                  },
                  {
                    title: "Frontend Developer",
                    company: "IvaLabs",
                    period: "Fevereiro 2022 - Junho 2023",
                    description: "Led UI/UX design initiatives for websites focused on feature delivery and engagement with high-performing websites and systems. Enhanced SEO visibility through a 30% increase in organic traffic while maintaining uncompromised speed through dynamic SEO strategies.",
                    skills: ["HTML", "CSS", "JavaScript", "SEO", "UI/UX", "Performance Optimization"]
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center animate-on-scroll">
              <div>
                <h2 className="text-3xl font-semibold mb-6">Minha Filosofia</h2>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Acredito que a tecnologia deve ser invisible - funcionar de forma tão natural 
                  que as pessoas nem percebam sua complexidade. Cada linha de código que escrevo 
                  tem o objetivo de criar experiências mais humanas e acessíveis.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Busco sempre equilibrar inovação técnica com usabilidade prática, 
                  criando produtos que não apenas impressionam, mas que realmente 
                  resolvem problemas reais das pessoas.
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-primary bg-zinc-900/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-r-lg">
                  <h3 className="font-medium mb-2">Código Limpo</h3>
                  <p className="text-sm text-gray-400">Escrevo código pensando em quem vai mantê-lo amanhã</p>
                </div>
                <div className="p-4 border-l-4 border-primary bg-zinc-900/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-r-lg">
                  <h3 className="font-medium mb-2">Design Centrado no Usuário</h3>
                  <p className="text-sm text-gray-400">Cada decisão é tomada pensando na experiência final</p>
                </div>
                <div className="p-4 border-l-4 border-primary bg-zinc-900/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-r-lg">
                  <h3 className="font-medium mb-2">Aprendizado Contínuo</h3>
                  <p className="text-sm text-gray-400">Tecnologia evolui rápido, e eu evoluo junto</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
