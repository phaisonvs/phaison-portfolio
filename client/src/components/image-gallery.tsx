import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
  mainImage?: string;
}

export function ImageGallery({ images, mainImage }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Se houver uma imagem principal, adicioná-la como primeira imagem se não estiver já na lista
  const allImages = mainImage 
    ? [{ src: mainImage, alt: "Main image" }, ...images.filter(img => img.src !== mainImage)]
    : images;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % allImages.length);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + allImages.length) % allImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  };

  return (
    <div className="space-y-4">
      {/* Main image displayed prominently */}
      <div 
        className="rounded-xl overflow-hidden cursor-pointer relative group"
        onClick={() => openLightbox(0)}
      >
        <img
          src={allImages[0]?.src}
          alt={allImages[0]?.alt}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white bg-opacity-0 group-hover:bg-opacity-80 p-3 rounded-full transition-all duration-300 scale-0 group-hover:scale-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid of smaller thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {allImages.slice(1).map((image, index) => (
            <div 
              key={index} 
              className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group"
              onClick={() => openLightbox(index + 1)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox for large image display */}
      <Dialog 
        open={selectedImage !== null} 
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent 
          className="max-w-[90vw] max-h-[90vh] p-0 bg-black/95 border-zinc-800" 
          onKeyDown={handleKeyDown}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/75 rounded-full text-white/75 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Image */}
            {selectedImage !== null && (
              <div className="w-full h-full flex items-center justify-center p-4">
                <img
                  src={allImages[selectedImage].src}
                  alt={allImages[selectedImage].alt}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
            )}
            
            {/* Navigation buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 p-2 bg-black/50 hover:bg-black/75 rounded-full text-white/75 hover:text-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 p-2 bg-black/50 hover:bg-black/75 rounded-full text-white/75 hover:text-white transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm py-1 px-3 rounded-full">
                  {selectedImage !== null ? selectedImage + 1 : 0} / {allImages.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}