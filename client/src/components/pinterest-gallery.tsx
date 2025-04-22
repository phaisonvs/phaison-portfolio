import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface PinterestGalleryProps {
  images: GalleryImage[];
}

export function PinterestGallery({ images }: PinterestGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Galeria do Projeto</h2>
      
      {/* Pinterest-style masonry grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
          <div 
            key={index}
            className="break-inside-avoid mb-4 overflow-hidden rounded-lg cursor-pointer relative group"
            onClick={() => openLightbox(index)}
          >
            <div className="relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {(image.title || image.description) && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.title && (
                    <h3 className="text-white text-sm font-medium mb-1">{image.title}</h3>
                  )}
                  {image.description && (
                    <p className="text-white/80 text-xs line-clamp-2">{image.description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox for large image display */}
      <Dialog 
        open={selectedImage !== null} 
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent 
          className="max-w-[90vw] max-h-[90vh] p-0 bg-black/95 border-zinc-800"
        >
          {selectedImage !== null && (
            <div className="relative w-full h-full flex flex-col">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/75 rounded-full text-white/75 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              {/* Image */}
              <div className="flex-grow flex items-center justify-center p-4">
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              
              {/* Caption area */}
              {(images[selectedImage].title || images[selectedImage].description) && (
                <div className="border-t border-zinc-800 p-4">
                  {images[selectedImage].title && (
                    <h3 className="text-white text-lg font-medium mb-1">{images[selectedImage].title}</h3>
                  )}
                  {images[selectedImage].description && (
                    <p className="text-gray-300">{images[selectedImage].description}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}