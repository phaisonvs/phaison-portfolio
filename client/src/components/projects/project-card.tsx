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
      <Card className="group relative overflow-hidden rounded-xl bg-zinc-900 hover:cursor-pointer">
        <div className="overflow-hidden">
          <AspectRatio ratio={3/4} className="bg-zinc-900">
            <img
              src={project.project.imageUrl}
              alt={project.project.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2"
            />
          </AspectRatio>
        </div>
        <div className="p-4 flex items-center justify-center">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage
                src={project.user.avatarUrl || undefined}
                alt={project.user.name}
              />
              <AvatarFallback className="text-xs">
                {getInitials(project.user.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-200">{project.user.name}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
