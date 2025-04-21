import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CarouselApi } from "@/components/ui/carousel";

interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  api: CarouselApi | null;
  className?: string;
}

export function CarouselDots({ api, className, ...props }: CarouselDotsProps) {
  const [slideCount, setSlideCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    setSlideCount(api.scrollSnapList().length);
    setSelectedIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div 
      className={cn("flex justify-center gap-1 mt-4", className)} 
      {...props}
    >
      {slideCount > 0 &&
        Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              selectedIndex === index 
                ? "bg-primary w-4" 
                : "bg-gray-500 opacity-50 hover:opacity-75"
            )}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
    </div>
  );
}