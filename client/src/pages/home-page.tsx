import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { CategoryCard } from "@/components/category-card";
import { PluginCard } from "@/components/plugin-card";
import { TemplateCard } from "@/components/template-card";
import { useQuery } from "@tanstack/react-query";
import { ProjectWithTags } from "@shared/schema";
import { Box, SlidersIcon, ImageIcon, LightbulbIcon } from "lucide-react";

export default function HomePage() {
  const { data: projects } = useQuery<ProjectWithTags[]>({
    queryKey: ["/api/projects"],
  });

  // Animation on scroll
  const animatedElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
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
        {/* Hero section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6 animate-on-scroll">
              Modern portfolio design<br />for creative professionals
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-on-scroll">
              Showcase your work with a premium, minimalist design that puts your projects
              first while creating an engaging experience
            </p>
            <div className="flex justify-center gap-4 flex-wrap animate-on-scroll">
              <Button asChild size="lg">
                <Link href="/projects">
                  View Projects
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/auth">
                  Contact Me
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Project Highlights */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold animate-on-scroll">Best</h2>
              <Link href="/projects" className="text-primary hover:underline transition-all duration-200">
                View all projects
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects && projects.length > 0 ? (
                projects.slice(0, 4).map((project) => (
                  <div key={project.project.id} className="animate-on-scroll">
                    <ProjectCard project={project} />
                  </div>
                ))
              ) : (
                // Placeholder cards when no projects exist
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="animate-on-scroll">
                    <ProjectCard
                      project={{
                        project: {
                          id: index,
                          title: "Sample Project",
                          description: "A beautiful sample project",
                          imageUrl: `https://source.unsplash.com/random/600x800?sig=${index}`,
                          userId: 1,
                          category: "Sample",
                          publishedStatus: "published",
                          createdAt: new Date().toISOString(),
                        },
                        user: {
                          id: 1,
                          name: "John Designer",
                          avatarUrl: null,
                        },
                        tags: []
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 animate-on-scroll">Categories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="animate-on-scroll">
                <CategoryCard
                  title="Websites"
                  description="Beautiful websites for creators, artists and businesses"
                  images={[
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                  ]}
                />
              </div>
              
              <div className="animate-on-scroll">
                <CategoryCard
                  title="Mobile Apps"
                  description="Interactive mobile experiences with smooth animations"
                  images={[
                    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                  ]}
                />
              </div>
              
              <div className="animate-on-scroll">
                <CategoryCard
                  title="3D Design"
                  description="Immersive 3D experiences and visualizations"
                  images={[
                    "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1638913972776-873fc7af3fdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Top Plugins */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 animate-on-scroll">Top Plugins</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="animate-on-scroll">
                <PluginCard
                  title="3D Rotator"
                  description="Add stunning 3D rotations to any element"
                  icon={Box}
                  iconBgColor="bg-blue-500"
                />
              </div>
              
              <div className="animate-on-scroll">
                <PluginCard
                  title="Smart Controls"
                  description="Interactive controls with advanced animations"
                  icon={SlidersIcon}
                  iconBgColor="bg-orange-500"
                />
              </div>
              
              <div className="animate-on-scroll">
                <PluginCard
                  title="Image Effects"
                  description="Professional image filters and effects"
                  icon={ImageIcon}
                  iconBgColor="bg-green-500"
                />
              </div>
              
              <div className="animate-on-scroll">
                <PluginCard
                  title="Smart Motion"
                  description="Create lifelike animations with ease"
                  icon={LightbulbIcon}
                  iconBgColor="bg-yellow-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Top Templates */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 animate-on-scroll">Top Templates</h2>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="animate-on-scroll">
                <TemplateCard
                  title="Portfolio Pro"
                  description="Modern portfolio template"
                  image="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  author={{
                    name: "Design Studio",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                  }}
                  price="$79"
                />
              </div>
              
              <div className="animate-on-scroll">
                <TemplateCard
                  title="Ecommerce Black"
                  description="Premium shopping experience"
                  image="https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  author={{
                    name: "ShopMakers",
                    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                  }}
                  price="$99"
                />
              </div>
              
              <div className="animate-on-scroll">
                <TemplateCard
                  title="Agency Minimal"
                  description="Clean agency website"
                  image="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  author={{
                    name: "Creative Co.",
                    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                  }}
                  price="$69"
                />
              </div>
              
              <div className="animate-on-scroll">
                <TemplateCard
                  title="Mobile App Pro"
                  description="App landing page template"
                  image="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  author={{
                    name: "AppLabs",
                    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                  }}
                  price="$89"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 cta-gradient z-0"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10"></div>
          
          <div className="relative z-20 container mx-auto max-w-4xl text-center">
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
              Become a creator today
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-10 animate-on-scroll">
              Join thousands of designers and developers who create and share amazing projects. 
              Get started with your portfolio now.
            </p>
            <div className="flex justify-center gap-4 flex-wrap animate-on-scroll">
              <Button asChild size="lg">
                <Link href="/auth">
                  Get Started Now
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/projects">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
