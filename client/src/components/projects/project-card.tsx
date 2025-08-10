import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProjectWithTags } from "@shared/schema";
import { getInitials } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectWithTags;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.project.id}`}>
      <Card className="group relative overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300 hover:cursor-pointer hover:shadow-lg hover:shadow-primary/20 h-[420px]">
        <div className="overflow-hidden">
          <AspectRatio ratio={3/4} className="bg-zinc-900">
            <img
              src={project.project.imageUrl}
              alt={project.project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </AspectRatio>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-4 text-white leading-tight animate-slide-in-left">
            {project.project.title}
          </h3>
          
          <div className="flex items-center mb-3 animate-slide-in-left delay-100">
            <Avatar className="h-7 w-7 mr-3">
              <AvatarImage
                src={project.user.avatarUrl || undefined}
                alt={project.user.name}
              />
              <AvatarFallback className="text-xs">
                {getInitials(project.user.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-300">{project.user.name}</span>
          </div>

          <p className="text-sm text-gray-400 line-clamp-2 animate-slide-in-left delay-200">
            {project.project.description}
          </p>
          
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3 animate-slide-in-left delay-300">
              {project.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
