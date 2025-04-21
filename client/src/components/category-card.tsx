import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface CategoryCardProps {
  title: string;
  description: string;
  images: string[];
}

export function CategoryCard({ title, description, images }: CategoryCardProps) {
  return (
    <Link href="/projects">
      <Card className="bg-zinc-900 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:cursor-pointer">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-6">{description}</p>
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div key={index} className="bg-black aspect-square rounded-md overflow-hidden">
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
