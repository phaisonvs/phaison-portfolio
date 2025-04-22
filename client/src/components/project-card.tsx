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
      <Card className="group relative overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300 hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
        <div className="overflow-hidden">
          <AspectRatio ratio={3/4} className="bg-zinc-900">
            <img
              src={project.project.imageUrl}
              alt={project.project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </AspectRatio>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <Avatar className="h-6 w-6 mr-2">
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
        </div>
      </Card>
    </Link>
  );
}
