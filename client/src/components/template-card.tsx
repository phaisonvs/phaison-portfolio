import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getInitials } from "@/lib/utils";

interface TemplateCardProps {
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  price: string;
}

export function TemplateCard({ title, description, image, author, price }: TemplateCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
      <AspectRatio ratio={16/10} className="bg-zinc-900">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </AspectRatio>
      <div className="p-4">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage
                src={author.avatar}
                alt={author.name}
              />
              <AvatarFallback className="bg-zinc-800 text-xs">
                {getInitials(author.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-400">{author.name}</span>
          </div>
          <span className="text-sm font-medium">{price}</span>
        </div>
      </div>
    </Card>
  );
}
