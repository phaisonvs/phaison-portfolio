import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ProjectWithTags } from "@shared/schema";
import { Loader2, ArrowLeft, Home } from "lucide-react";

export default function ProjectsPage() {
  const { data: projects, isLoading } = useQuery<ProjectWithTags[]>({
    queryKey: ["/api/projects"],
  });
  
  const { data: allTags } = useQuery({
    queryKey: ["/api/tags"],
  });

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<ProjectWithTags[]>([]);

  useEffect(() => {
    if (projects) {
      if (selectedTag) {
        setFilteredProjects(
          projects.filter(project => 
            project.tags.some(tag => tag.name === selectedTag)
          )
        );
      } else {
        setFilteredProjects(projects);
      }
    }
  }, [projects, selectedTag]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <section>
          <div className="mb-10">
            <h1 className="text-4xl font-semibold mb-6">Projects</h1>
            <p className="text-gray-400 mb-8 max-w-2xl">
              Explore our collection of creative projects. Filter by category to find exactly what you're looking for.
            </p>
            
            {/* Tags filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              <Button 
                variant={selectedTag === null ? "default" : "outline"}
                onClick={() => setSelectedTag(null)}
                className="rounded-full"
                size="sm"
              >
                All
              </Button>
              
              {allTags && allTags.map((tag: { id: number, name: string }) => (
                <Button 
                  key={tag.id} 
                  variant={selectedTag === tag.name ? "default" : "outline"}
                  onClick={() => setSelectedTag(tag.name)}
                  className="rounded-full"
                  size="sm"
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-gray-400">
                {selectedTag 
                  ? `No projects with the tag "${selectedTag}" were found.` 
                  : "There are no projects to display yet."}
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
