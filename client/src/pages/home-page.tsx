import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProjectCard } from "@/components/projects/project-card";
import { CategoryCard } from "@/components/common/category-card";
import { TemplateCard } from "@/components/common/template-card";

import { useQuery } from "@tanstack/react-query";
import { ProjectWithTags } from "@shared/schema";
import {
  Box,
  SlidersIcon,
  ImageIcon,
  LightbulbIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  Figma,
  Github,
  Code,
  Palette,
  Layers,
  Zap,
} from "lucide-react";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiAdobe,
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAdobephotoshop,
} from "react-icons/si";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel-dots";
import TestimonialsCarousel from "@/components/testimonials/testimonials-carousel";
import logoPath from "@assets/logo-phaison_1749772164016.png";

export default function HomePage() {
  const { data: projects } = useQuery<ProjectWithTags[]>({
    queryKey: ["/api/projects"],
  });

  // Carousel APIs
  const [bestApi, setBestApi] = useState<CarouselApi | null>(null);
  const [categoriesApi, setCategoriesApi] = useState<CarouselApi | null>(null);
  const [templatesApi, setTemplatesApi] = useState<CarouselApi | null>(null);

  // Scroll interaction for carousels
  const bestCarouselRef = useRef<HTMLDivElement>(null);

  // Animation on scroll
  const animatedElements = useRef<HTMLElement[]>([]);


  // Enhanced parallax effect with mobile touch support
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const phaisonBg = document.querySelector(".phaison-bg") as HTMLElement;
      const isMobile = window.innerWidth < 768;

      if (phaisonBg && !isMobile) {
        // Parallax scale effect - apenas no desktop
        const scaleValue = 1 + scrolled * 0.002;
        phaisonBg.style.transform = `scale(${scaleValue})`;
      } else if (phaisonBg && isMobile) {
        // No mobile, manter escala fixa
        phaisonBg.style.transform = `scale(1)`;
      }

      // Controle das elipses - para na seção "Pronto para o próximo projeto"
      const contactSection = document.getElementById("contact");
      const spotlightContainer = document.querySelector(".spotlight-container") as HTMLElement;
      const ellipsesContainer = document.querySelector(".cta-ellipses-container") as HTMLElement;
      
      if (contactSection && spotlightContainer && ellipsesContainer) {
        const contactTop = contactSection.offsetTop;
        const maxHeight = contactTop + "px";
        
        spotlightContainer.style.height = maxHeight;
        ellipsesContainer.style.height = maxHeight;
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Enhanced touch events for smooth mobile parallax
    let touchThrottle = false;
    
    const handleTouchMove = (e: TouchEvent) => {
      // More frequent updates during touch for smoother mobile experience
      if (!touchThrottle) {
        requestAnimationFrame(() => {
          updateParallax();
          touchThrottle = false;
        });
        touchThrottle = true;
      }
    };

    const handleTouchStart = () => {
      // Immediate parallax update on touch start
      updateParallax();
    };

    const handleTouchEnd = () => {
      // Final update when touch ends to ensure smooth transition
      requestAnimationFrame(updateParallax);
    };

    // Initial call
    updateParallax();

    // Add event listeners with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Check for scroll parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get("scrollTo");

    if (scrollTo) {
      // Wait for page to load completely before scrolling
      setTimeout(() => {
        const section = document.getElementById(scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
        // Clean up URL
        window.history.replaceState({}, "", "/");
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
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".animate-on-scroll, .animate-slide-left")
      .forEach((el) => {
        animatedElements.current.push(el as HTMLElement);
        observer.observe(el);
      });

    return () => {
      animatedElements.current.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Experience cards stacking effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    // Observe all experience cards
    const cards = document.querySelectorAll(".experience-card");
    cards.forEach((card) => {
      if (card instanceof Element) {
        observer.observe(card);
      }
    });

    return () => {
      cards.forEach((card) => {
        if (card instanceof Element) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  // Best projects carousel scroll interaction
  useEffect(() => {
    const carousel = bestCarouselRef.current;
    if (!carousel || !bestApi) return;

    const handleWheel = (e: WheelEvent) => {
      // Verifica se o mouse está especificamente sobre um card
      const target = e.target as Element;
      const closestCard = target.closest('[data-carousel-item], .project-card, .plugin-card');
      
      if (closestCard && carousel.contains(closestCard)) {
        e.preventDefault();
        e.stopPropagation();

        // Scroll to the right on wheel down, left on wheel up
        if (e.deltaY > 0) {
          bestApi.scrollNext();
        } else {
          bestApi.scrollPrev();
        }
      }
    };

    carousel.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, [bestApi]);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-matte text-white relative overflow-hidden">
      {/* Dynamic gradient spotlights */}
      <div className="spotlight-container">
        <div className="spotlight-element spotlight-top"></div>
        <div className="spotlight-element spotlight-bottom"></div>
        <div className="spotlight-element spotlight-middle"></div>
        <div className="spotlight-element spotlight-accent"></div>
      </div>

      {/* CTA-based animated ellipses */}
      <div className="cta-ellipses-container" aria-hidden="true">
        <div className="cta-ellipse cta-ellipse-left"></div>
        <div className="cta-ellipse cta-ellipse-right"></div>
      </div>

      <Header />

      <main className="flex-grow content-layer">
        {/* Hero section */}
        <section
          id="hero"
          className="py-16 md:py-0 px-4 md:h-screen flex flex-col items-center justify-start md:justify-center relative overflow-hidden"
        >
          {/* Phaison Background Image */}
          <div className="absolute inset-0 phaison-bg mobile-hero-breathing"></div>

          {/* Gradient blend overlay */}
          <div className="absolute inset-0 moon-gradient-blend"></div>
          


          <div className="max-w-[1200px] mx-auto text-center relative z-10 flex flex-col items-center justify-center md:h-full">
            <div className="space-y-6 md:space-y-8 max-w-[280px] md:max-w-full">
              <h1 className="leading-tight hero-fade-left grainient-heading">
                Oi, eu sou Phaison, Lead de UX/UI,
                <br />
                especialista em soluções digitais.
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto hero-slide-left grainient-text">
                Integro design estratégico e CRO para experiências
                <br className="hidden md:block" /> digitais testadas e de alta
                conversão.
              </p>
              <div className="flex justify-center gap-4 flex-wrap hero-rise-up">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/projects">Veja meus projetos</Link>
                </Button>
              </div>
              
              
              {/* Scroll indicator - only visible on tablet/desktop */}
              <div className="hidden md:flex justify-center mt-16">
                <div className="animate-bounce">
                  <button
                    onClick={() => {
                      const nextSection = document.querySelector('section:nth-of-type(2)');
                      if (nextSection) {
                        nextSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-300 cursor-pointer"
                    aria-label="Scroll para baixo"
                  >
                    <span className="text-sm opacity-75 group-hover:opacity-100 transition-opacity">
                      Explore
                    </span>
                    <div className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center group-hover:border-primary transition-colors">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          
        </section>

        {/* Project Highlights */}
        <section className="py-20 relative z-20">
          <div className="px-4 md:px-4">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex justify-between items-center mb-16">
                <h2 className="text-xl md:text-2xl font-medium animate-slide-left tracking-tight">
                  Projetos em Destaque
                </h2>
                <Link
                  href="/projects"
                  className="text-white hover:text-primary transition-all duration-200 flex items-center gap-2 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="animate-on-scroll relative">
            <Carousel
              ref={bestCarouselRef}
              setApi={setBestApi}
              opts={{
                align: "center",
                loop: true,
                containScroll: "trimSnaps",
                skipSnaps: false,
                breakpoints: {
                  "(max-width: 768px)": {
                    align: "center",
                    dragFree: false,
                  },
                },
              }}
              className="w-full"
            >
              <div className="relative overflow-hidden">
                <CarouselContent className="md:-ml-1 flex gap-2 pl-4 md:pl-0" data-carousel-content>
                    {projects && projects.length > 0
                      ? projects.slice(0, 6).map((project) => (
                          <CarouselItem
                            key={project.project.id}
                            className="pl-1 basis-[calc(80%-1rem)] sm:basis-[calc(50%-0.5rem)] md:basis-[calc(50%-0.5rem)] lg:basis-[calc(22.22%-0.5rem)]"
                            data-carousel-item
                          >
                            <ProjectCard project={project} />
                          </CarouselItem>
                        ))
                      : // Placeholder cards when no projects exist
                        Array.from({ length: 6 }).map((_, index) => (
                          <CarouselItem
                            key={index}
                            className="pl-1 basis-[calc(80%-1rem)] sm:basis-[calc(50%-0.5rem)] md:basis-[calc(50%-0.5rem)] lg:basis-[calc(22.22%-0.5rem)]"
                            data-carousel-item
                          >
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
                                tags: [{ id: 1, name: "Website" }],
                              }}
                            />
                          </CarouselItem>
                        ))}
                  </CarouselContent>

                  {/* Gradient fade effects for mobile and desktop */}
                  <div className="absolute top-0 left-0 bottom-0 w-16 md:w-20 bg-gradient-to-r from-black via-black/30 to-transparent pointer-events-none z-10"></div>
                  <div className="absolute top-0 right-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-black via-black/30 to-transparent pointer-events-none z-10"></div>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <CarouselPrevious className="bg-black/40 hover:bg-black/60 border-none" />
                  <CarouselNext className="bg-black/40 hover:bg-black/60 border-none" />
                </div>
              </Carousel>
              <CarouselDots api={bestApi} className="mt-4" />
            </div>
          
        </section>

        {/* Testimonials Section */}
        <section className="py-16 relative z-20">
          <div className="px-4 md:px-4">
            <div className="max-w-[1200px] mx-auto">
              <div className="animate-on-scroll">
                <TestimonialsCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        {/*<section className="py-12 px-4">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 animate-on-scroll">
              Categorias
            </h2>

            <div className="animate-on-scroll relative">
              <Carousel
                setApi={setCategoriesApi}
                opts={{
                  align: "start",
                  loop: true,
                  containScroll: "trimSnaps",
                  skipSnaps: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  <CarouselItem className="pl-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3" data-carousel-item>
                    <CategoryCard
                      title="Websites"
                      description="Belos sites para criadores, artistas e empresas"
                      images={[
                        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                      ]}
                    />
                  </CarouselItem>

                  <CarouselItem className="pl-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3" data-carousel-item>
                    <CategoryCard
                      title="Aplicativos Móveis"
                      description="Experiências interativas com animações suaves"
                      images={[
                        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                      ]}
                    />
                  </CarouselItem>

                  <CarouselItem className="pl-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3" data-carousel-item>
                    <CategoryCard
                      title="Design 3D"
                      description="Experiências 3D imersivas e visualizações"
                      images={[
                        "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1638913972776-873fc7af3fdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                      ]}
                    />
                  </CarouselItem>

                  <CarouselItem className="pl-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3" data-carousel-item>
                    <CategoryCard
                      title="UI/UX Design"
                      description="Interfaces elegantes e intuitivas"
                      images={[
                        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                        "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
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
        */}

        {/* Softwares e Habilidades - New Clean Layout */}
        <section className="py-20 relative z-20">
          <div className="px-4 md:px-4">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Title - Left Side */}
                <div className="lg:col-span-4">
                  <h2 className="text-xl md:text-2xl font-medium text-left animate-slide-left tracking-tight">
                    Softwares e Habilidades
                  </h2>
                </div>

                {/* Skills Grid - Right Side */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Figma */}
                    <div className="flex flex-col items-center p-4 bg-zinc-900/40 rounded-xl border border-zinc-700/30 animate-on-scroll" style={{ transitionDelay: '0.1s' }} data-testid="skill-figma">
                      <div className="w-12 h-12 rounded-lg bg-[#836DF1] flex items-center justify-center mb-3">
                        <FaFigma className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">Figma</span>
                    </div>

                    {/* GitHub */}
                    <div className="flex flex-col items-center p-4 bg-zinc-900/40 rounded-xl border border-zinc-700/30 animate-on-scroll" style={{ transitionDelay: '0.2s' }} data-testid="skill-github">
                      <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center mb-3">
                        <FaGithub className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">GitHub</span>
                    </div>

                    {/* HTML */}
                    <div className="flex flex-col items-center p-4 bg-zinc-900/40 rounded-xl border border-zinc-700/30 animate-on-scroll" style={{ transitionDelay: '0.3s' }} data-testid="skill-html">
                      <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center mb-3">
                        <FaHtml5 className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">HTML</span>
                    </div>

                    {/* CSS */}
                    <div className="flex flex-col items-center p-4 bg-zinc-900/40 rounded-xl border border-zinc-700/30 animate-on-scroll" style={{ transitionDelay: '0.4s' }} data-testid="skill-css">
                      <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center mb-3">
                        <FaCss3Alt className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">CSS</span>
                    </div>

                    {/* JavaScript */}
                    <div className="flex flex-col items-center p-4 bg-zinc-900/40 rounded-xl border border-zinc-700/30 animate-on-scroll" style={{ transitionDelay: '0.5s' }} data-testid="skill-javascript">
                      <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center mb-3">
                        <FaJs className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">JavaScript</span>
                    </div>

                    {/* Photoshop */}
                    <div className="flex flex-col items-center p-4 bg-zinc-900/40 rounded-xl border border-zinc-700/30 animate-on-scroll" style={{ transitionDelay: '0.6s' }} data-testid="skill-photoshop">
                      <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center mb-3">
                        <SiAdobephotoshop className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">Photoshop</span>
                    </div>

                    {/* Illustrator */}
                    <div className="flex flex-col items-center p-4 bg-zinc-900/40 rounded-xl border border-zinc-700/30 animate-on-scroll" style={{ transitionDelay: '0.7s' }} data-testid="skill-illustrator">
                      <div className="w-12 h-12 rounded-lg bg-orange-600 flex items-center justify-center mb-3">
                        <SiAdobeillustrator className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">Illustrator</span>
                    </div>

                    {/* After Effects */}
                    <div className="flex flex-col items-center p-4 bg-zinc-900/40 rounded-xl border border-zinc-700/30 animate-on-scroll" style={{ transitionDelay: '0.8s' }} data-testid="skill-after-effects">
                      <div className="w-12 h-12 rounded-lg bg-[#836DF1] flex items-center justify-center mb-3">
                        <SiAdobeaftereffects className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">After Effects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Templates */}
        {/*<section className="py-12 px-4">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 animate-on-scroll">
              Top Templates
            </h2>

            <div className="animate-on-scroll relative">
              <Carousel
                setApi={setTemplatesApi}
                opts={{
                  align: "start",
                  loop: true,
                  containScroll: "trimSnaps",
                  skipSnaps: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  <CarouselItem className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4" data-carousel-item>
                    <TemplateCard
                      title="Portfolio Pro"
                      description="Template moderno para portfólio"
                      image="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "Design Studio",
                        avatar:
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80",
                      }}
                      price="R$399"
                    />
                  </CarouselItem>

                  <CarouselItem className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4" data-carousel-item>
                    <TemplateCard
                      title="Ecommerce Black"
                      description="Experiência premium de compras"
                      image="https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "ShopMakers",
                        avatar:
                          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80",
                      }}
                      price="R$499"
                    />
                  </CarouselItem>

                  <CarouselItem className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4" data-carousel-item>
                    <TemplateCard
                      title="Agency Minimal"
                      description="Site clean para agências"
                      image="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "Creative Co.",
                        avatar:
                          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80",
                      }}
                      price="R$349"
                    />
                  </CarouselItem>

                  <CarouselItem className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4" data-carousel-item>
                    <TemplateCard
                      title="Mobile App Pro"
                      description="Landing page para aplicativos"
                      image="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "AppLabs",
                        avatar:
                          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80",
                      }}
                      price="R$449"
                    />
                  </CarouselItem>

                  <CarouselItem className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4" data-carousel-item>
                    <TemplateCard
                      title="Startup X"
                      description="Template moderno para startups"
                      image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "Tech Founders",
                        avatar:
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80",
                      }}
                      price="R$399"
                    />
                  </CarouselItem>

                  <CarouselItem className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4" data-carousel-item>
                    <TemplateCard
                      title="Creative Portfolio"
                      description="Para artistas e designers"
                      image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      author={{
                        name: "Art Studio",
                        avatar:
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80",
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
        */}

        {/* About Section - New Asymmetric Design */}
        <section id="about" className="py-24 md:py-32 px-4 relative z-20">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              {/* Left Side - Content */}
              <div className="animate-on-scroll">
                <h2 className="text-lg font-medium text-white tracking-tight mb-6">
                  Sobre Mim
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Lead UX/UI Designer apaixonado por criar experiências digitais que conectam pessoas e tecnologia de forma natural e intuitiva.
                </p>
              </div>

              {/* Right Side - Asymmetric Photo Grid */}
              <div className="animate-on-scroll">
                <div className="grid grid-cols-6 grid-rows-4 gap-3 h-96">
                  {/* Large Photo - spans 4 columns, 3 rows */}
                  <div className="col-span-4 row-span-3 relative">
                    <div className="photo-container-blur h-full">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Profile Main"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  
                  {/* Small Photo 1 - top right */}
                  <div className="col-span-2 row-span-1 relative">
                    <div className="photo-container-blur h-full">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                        alt="Profile Detail 1"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  
                  {/* Small Photo 2 - middle right */}
                  <div className="col-span-2 row-span-2 relative">
                    <div className="photo-container-blur h-full">
                      <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                        alt="Profile Detail 2"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  
                  {/* Wide Photo - bottom, spans 4 columns */}
                  <div className="col-span-4 row-span-1 relative">
                    <div className="photo-container-blur h-full">
                      <img
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Workspace"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  
                  {/* Small square - bottom right */}
                  <div className="col-span-2 row-span-1 relative">
                    <div className="photo-container-blur h-full">
                      <img
                        src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                        alt="Profile Detail 3"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section className="py-24 md:py-32 px-4 relative z-20">
          <div className="max-w-[1200px] mx-auto animate-on-scroll">
            <h2 className="text-lg font-medium mb-8 text-white animate-on-scroll tracking-tight">Experiência & Formação</h2>
            
            <div className="space-y-6">
              {/* Experience Item 1 */}
              <div className="experience-card relative p-6 bg-zinc-900/30 rounded-xl border border-zinc-700/30 hover:border-primary/20 transition-all duration-300 dynamic-glow">
                <div className="absolute left-6 top-6 w-2 h-2 bg-primary rounded-full"></div>
                <div className="pl-6 space-y-3">
                  <h4 className="text-lg font-medium animate-on-scroll">
                    <span className="text-white">Lead UX/UI Designer</span>
                    <span className="text-primary"> @ Design Agency </span>
                    <span className="text-gray-400 text-sm">• 2022 - Presente</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-4 animate-on-scroll">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Figma</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Design Systems</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">User Research</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Team Leadership</span>
                  </div>
                </div>
              </div>

              {/* Experience Item 2 */}
              <div className="experience-card relative p-6 bg-zinc-900/30 rounded-xl border border-zinc-700/30 hover:border-primary/20 transition-all duration-300 dynamic-glow">
                <div className="absolute left-6 top-6 w-2 h-2 bg-primary rounded-full"></div>
                <div className="pl-6 space-y-3">
                  <h4 className="text-lg font-medium animate-on-scroll">
                    <span className="text-white">UX Designer</span>
                    <span className="text-primary"> @ Tech Startup </span>
                    <span className="text-gray-400 text-sm">• 2020 - 2022</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-4 animate-on-scroll">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">React</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">TypeScript</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Prototyping</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">UI/UX</span>
                  </div>
                </div>
              </div>

              {/* Education Item */}
              <div className="experience-card relative p-6 bg-zinc-900/30 rounded-xl border border-zinc-700/30 hover:border-primary/20 transition-all duration-300 dynamic-glow">
                <div className="absolute left-6 top-6 w-2 h-2 bg-primary rounded-full"></div>
                <div className="pl-6 space-y-3">
                  <h4 className="text-lg font-medium animate-on-scroll">
                    <span className="text-white">Bacharelado em Design</span>
                    <span className="text-primary"> @ Universidade Federal </span>
                    <span className="text-gray-400 text-sm">• 2017 - 2021</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-4 animate-on-scroll">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Design Thinking</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">User Research</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Visual Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          id="contact"
          className="py-20 px-4 relative overflow-hidden z-20"
        >
          {/* Bottom gradient section with #2E2689 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2689]/20 via-transparent to-transparent opacity-60"></div>
          <div className="absolute inset-0 cta-gradient z-0"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10"></div>

          <div className="relative z-20 max-w-[1200px] mx-auto text-center">
            <div className="mb-10 inline-block animate-on-scroll">
              <div className="h-24 w-24 rounded-full bg-primary/20 purple-glow flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-primary/20">
                <div className="relative">
                  <img 
                    src={logoPath} 
                    alt="Phaison Logo" 
                    className="h-12 w-auto filter brightness-0 invert"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-medium mb-6 animate-on-scroll">
              Vamos conversar?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-10 animate-on-scroll">
              Está interessado no meu trabalho? Gostaria de trocar ideias sobre design?
              Entre em contato e vamos bater um papo.
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
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  asChild
                >
                  <a href="https://wa.me/5531992031320?text=Oi%2C%20Phaison!%20Venho%20do%20seu%20site%20portf%C3%B3lio%2C%20est%C3%A1%20dispon%C3%ADvel%20para%20uma%20conversa%3F" target="_blank" rel="noopener noreferrer" data-testid="button-whatsapp-contact" aria-label="Iniciar conversa no WhatsApp">
                    <FaWhatsapp className="mr-2 h-4 w-4" />
                    Conversar com Phaison
                  </a>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/projects">Ver projetos</Link>
                </Button>
              </div>

              {/* Back to Top Button */}
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-primary/20 hover:bg-primary/30 text-white border border-primary/20 hover:border-primary/40 backdrop-blur-sm rounded-full p-4 transition-all duration-500 hover:scale-105 purple-glow animate-pulse"
                  style={{
                    animationDuration: '3s',
                    animationIterationCount: 'infinite'
                  }}
                  aria-label="Voltar ao topo"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 transform group-hover:-translate-y-1 transition-transform duration-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}
