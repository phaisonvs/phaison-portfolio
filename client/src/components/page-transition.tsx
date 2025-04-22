import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export function PageTransition() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location);

  useEffect(() => {
    // Se a localização mudou, mostrar a tela de loading
    if (location !== prevLocation) {
      setIsLoading(true);
      
      // Armazenar a nova localização
      setPrevLocation(location);
      
      // Atraso de 2 segundos para mostrar a tela de loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [location, prevLocation]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-5">
          <div className="absolute inset-0 border-t-4 border-white rounded-full animate-spin"></div>
          <div className="absolute inset-3 border-2 border-zinc-700 rounded-full"></div>
        </div>
        <p className="text-xl font-medium text-white">Carregando...</p>
      </div>
    </div>
  );
}