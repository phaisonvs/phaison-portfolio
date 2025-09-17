import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface AppScreensCarouselProps {
  screens: {
    src: string;
    title?: string;
    description?: string;
  }[];
}

export function AppScreensCarousel({ screens }: AppScreensCarouselProps) {
  if (!screens || screens.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-white">Telas do Aplicativo</h3>
      
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {screens.map((screen, index) => (
              <CarouselItem 
                key={index} 
                className="pl-2 md:pl-4 basis-[280px] md:basis-[300px] flex-shrink-0"
              >
                <Card className="bg-gradient-to-b from-gray-900/50 to-gray-900/30 border border-gray-700/30 hover:border-primary/30 transition-all duration-300 group">
                  <CardContent className="p-4">
                    {/* Phone mockup container */}
                    <div className="relative mx-auto w-[200px] h-[400px] bg-gray-900 rounded-[30px] p-2 border border-gray-600 shadow-2xl group-hover:shadow-primary/20 transition-all duration-300">
                      {/* Screen bezel */}
                      <div className="relative w-full h-full bg-black rounded-[22px] overflow-hidden">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-10"></div>
                        
                        {/* Screen content */}
                        <div className="relative w-full h-full">
                          <img
                            src={screen.src}
                            alt={screen.title || `App screen ${index + 1}`}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          {/* Overlay gradient for better text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                      
                      {/* Home indicator */}
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                    
                    {/* Screen info */}
                    {(screen.title || screen.description) && (
                      <div className="mt-4 text-center">
                        {screen.title && (
                          <h4 className="text-sm font-medium text-white mb-1">
                            {screen.title}
                          </h4>
                        )}
                        {screen.description && (
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {screen.description}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700 -left-4" />
          <CarouselNext className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700 -right-4" />
        </Carousel>
      </div>
    </div>
  );
}