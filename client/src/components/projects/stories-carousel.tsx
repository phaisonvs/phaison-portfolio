import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface StoryCardProps {
  image: string;
  title: string;
  description: string;
}

interface StoriesCarouselProps {
  stories: StoryCardProps[];
}

export function StoriesCarousel({ stories }: StoriesCarouselProps) {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-medium mb-6 text-white">Destaques do Projeto</h3>
      
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {stories.map((story, index) => (
              <CarouselItem 
                key={index} 
                className="pl-2 md:pl-4 basis-[180px] sm:basis-[200px] md:basis-[220px]"
              >
                <Card className="border-0 bg-transparent h-full">
                  <CardContent className="p-0 h-full">
                    {/* Stories format - 9:16 aspect ratio like Instagram */}
                    <div className="relative aspect-[9/16] w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group cursor-pointer">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      </div>
                      
                      {/* Content overlay */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                            {story.title}
                          </h4>
                          <p className="text-xs text-gray-300 leading-tight line-clamp-3">
                            {story.description}
                          </p>
                        </div>
                        
                        {/* Story indicator bar at top */}
                        <div className="absolute top-4 left-4 right-4">
                          <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full w-1/3"></div>
                          </div>
                        </div>
                      </div>

                      {/* Hover effect indicator */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <svg 
                            className="w-6 h-6 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                            />
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <CarouselPrevious className="relative left-0 translate-y-0 bg-zinc-800 hover:bg-zinc-700 border-zinc-700 hover:border-zinc-600" />
            <CarouselNext className="relative right-0 translate-y-0 bg-zinc-800 hover:bg-zinc-700 border-zinc-700 hover:border-zinc-600" />
          </div>

          {/* Gradient fade effects */}
          <div className="absolute top-0 left-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-10"></div>
        </Carousel>
      </div>
    </div>
  );
}