import { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "CEO, TechStart",
    message: "Ele é rápido sem sacrificar qualidade e atenção aos detalhes.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
  },
  {
    id: 2,
    name: "Ana Costa",
    role: "Diretora de Marketing",
    message: "Design excepcional que elevou nossa marca a outro nível. Profissional dedicado e criativo.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
  },
  {
    id: 3,
    name: "Roberto Mendes",
    role: "Founder, InnovaCorp",
    message: "Transformou nossa visão em realidade digital. Interface intuitiva e resultados impressionantes.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
  },
  {
    id: 4,
    name: "Maria Santos",
    role: "Product Manager",
    message: "Colaboração fluida e entrega pontual. Sempre supera expectativas com soluções elegantes.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
  },
  {
    id: 5,
    name: "João Oliveira",
    role: "CTO, DigitalFlow",
    message: "Expertise técnica combinada com visão de negócio. Parceiro confiável para projetos complexos.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Função para avançar para o próximo depoimento
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Auto-play - avança a cada 5 segundos
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextTestimonial]);

  // Handle hover
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setCurrentIndex(index);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsPaused(false);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="testimonials-carousel w-full max-w-4xl mx-auto px-4">
      {/* Container principal */}
      <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50">
        
        {/* Mensagem central */}
        <div className="text-center mb-8 min-h-[140px] md:min-h-[120px] flex flex-col justify-center">
          <div className="relative overflow-hidden">
            <blockquote 
              className="text-base md:text-lg lg:text-xl text-white font-medium leading-relaxed transition-all duration-700 ease-in-out opacity-100 transform translate-y-0"
              key={`message-${current.id}`}
              data-testid="testimonial-message"
            >
              "{current.message}"
            </blockquote>
          </div>
          <div className="mt-4 transition-all duration-700 ease-in-out opacity-100 transform translate-y-0" key={`author-${current.id}`}>
            <p className="text-primary font-semibold text-sm md:text-base" data-testid="testimonial-author">{current.name}</p>
            <p className="text-xs md:text-sm text-gray-400" data-testid="testimonial-role">{current.role}</p>
          </div>
        </div>

        {/* Avatar carousel */}
        <div className="flex justify-center items-center">
          <div className="relative flex items-center justify-center gap-2 md:gap-4">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentIndex;
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={testimonial.id}
                  className="relative transition-all duration-300 ease-in-out cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  data-testid={`testimonial-avatar-${index}`}
                >
                  <div
                    className={`
                      relative rounded-full overflow-hidden transition-all duration-500 ease-in-out transform
                      ${isActive || isHovered 
                        ? 'w-12 h-12 md:w-16 md:h-16 ring-2 ring-primary ring-offset-2 ring-offset-gray-900/50 scale-110' 
                        : 'w-10 h-10 md:w-12 md:h-12 hover:scale-105'
                      }
                    `}
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className={`
                        w-full h-full object-cover transition-all duration-500 ease-in-out
                        ${isActive || isHovered 
                          ? 'filter-none brightness-110' 
                          : 'filter grayscale brightness-75 hover:grayscale-0 hover:brightness-100'
                        }
                      `}
                    />
                    
                    {/* Indicador de ativo */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 flex justify-center">
          <div className="flex gap-1">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`
                  h-1 rounded-full transition-all duration-300 ease-in-out
                  ${index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-gray-600'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}