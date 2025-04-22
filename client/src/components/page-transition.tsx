import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";

export function PageTransition() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location);
  const transitionTimeoutRef = useRef<number | null>(null);
  const safetyTimeoutRef = useRef<number | null>(null);
  
  // Limpar timeouts quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
      if (safetyTimeoutRef.current) window.clearTimeout(safetyTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    // Se a localização mudou, mostrar a tela de loading
    if (location !== prevLocation) {
      // Limpar qualquer timeout existente
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
      if (safetyTimeoutRef.current) window.clearTimeout(safetyTimeoutRef.current);
      
      setIsLoading(true);
      
      // Armazenar a nova localização
      setPrevLocation(location);
      
      // Atraso de 1.5 segundos para a transição de página
      transitionTimeoutRef.current = window.setTimeout(() => {
        setIsLoading(false);
        transitionTimeoutRef.current = null;
      }, 1500);
      
      // Timeout de segurança para garantir que o loading nunca fique preso (caso ocorra algum erro)
      safetyTimeoutRef.current = window.setTimeout(() => {
        setIsLoading(false);
        safetyTimeoutRef.current = null;
      }, 5000);
    }
  }, [location, prevLocation]);
  
  // Não renderizar nada se não estiver carregando
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