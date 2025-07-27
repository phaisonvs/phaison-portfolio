// Backup da home-page original para referência
import { useEffect, useRef, useState } from "react";
import { HomeView } from "@/views/HomeView";
import { ProjectController } from "@/controllers/ProjectController";
import { NavigationController } from "@/controllers/NavigationController";
import { type CarouselApi } from "@/components/ui/carousel";

export default function HomePage() {
  const { data: projects } = ProjectController.useProjectsQuery();

  // Carousel APIs
  const [bestApi, setBestApi] = useState<CarouselApi | null>(null);
  const [categoriesApi, setCategoriesApi] = useState<CarouselApi | null>(null);
  const [pluginsApi, setPluginsApi] = useState<CarouselApi | null>(null);
  const [templatesApi, setTemplatesApi] = useState<CarouselApi | null>(null);

  // Reference for animated elements
  const animatedElements = useRef<HTMLElement[]>([]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
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
    <HomeView
      projects={projects}
      bestApi={bestApi}
      setBestApi={setBestApi}
      categoriesApi={categoriesApi}
      setCategoriesApi={setCategoriesApi}
      pluginsApi={pluginsApi}
      setPluginsApi={setPluginsApi}
      templatesApi={templatesApi}
      setTemplatesApi={setTemplatesApi}
      animatedElements={animatedElements}
    />
  );
}