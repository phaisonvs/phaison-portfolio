import { useEffect, useRef } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProfessionalExperience } from "@/components/professional-experience";

export default function AboutPage() {
  // Animation on scroll
  const animatedElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      animatedElements.current.push(el as HTMLElement);
      observer.observe(el);
    });

    return () => {
      animatedElements.current.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="animate-on-scroll">
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
                  Olá, sou desenvolvedor apaixonado por criar experiências digitais incríveis
                </h1>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Com mais de 3 anos de experiência em desenvolvimento frontend e fullstack, 
                  especializo-me em criar interfaces elegantes e funcionais que conectam 
                  pessoas e tecnologia de forma natural.
                </p>
                <p className="text-base text-gray-500 mb-8 leading-relaxed">
                  Minha jornada começou com curiosidade sobre como as coisas funcionam na web, 
                  e hoje trabalho com empresas ao redor do mundo criando soluções que fazem 
                  a diferença no dia a dia das pessoas.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">React</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">TypeScript</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Vue.js</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Next.js</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">UI/UX Design</span>
                </div>
              </div>

              {/* Image/Avatar Section */}
              <div className="animate-on-scroll flex justify-center md:justify-end">
                <div className="relative">
                  <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="w-72 h-72 rounded-xl bg-zinc-900 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl">👋</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-3 gap-8 animate-on-scroll">
              <div className="text-center p-6 rounded-xl bg-zinc-900/50">
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <div className="text-gray-400">Anos de Experiência</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-zinc-900/50">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-400">Projetos Realizados</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-zinc-900/50">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-400">Dedicação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 animate-on-scroll">
              {/* Profile photo above title */}
              <div className="flex justify-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Experiência Profissional</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Minha trajetória profissional construindo produtos digitais em empresas de diferentes portes e segmentos.
              </p>
            </div>
            
            <div className="animate-on-scroll">
              <ProfessionalExperience 
                experiences={[
                  {
                    title: "Frontend Developer",
                    company: "Edgmonics Log",
                    period: "Novembro 2023 - Atual",
                    description: "Leveraged HTML5, CSS3, JavaScript (Vue.js), and TypeScript for tasks ranging from maintenance to new feature development and bug fixing. Integrated tools for Android compilation, with notable contributions including Google Maps API integration.",
                    skills: ["HTML5", "CSS3", "JavaScript", "Vue.js", "TypeScript", "Google Maps API"]
                  },
                  {
                    title: "Full Stack Developer",
                    company: "CreateApps LLC",
                    period: "Abril 2023 - Julho 2023",
                    description: "Achieved system optimization and scalability through meticulous maintenance and improvement, employing React hooks and TypeScript with Next.js. Also pioneered the development of new applications, implementing tools for reusable components, ensuring uniform and scalable interfaces.",
                    skills: ["React", "TypeScript", "Next.js", "UI/UX", "Responsive Design"]
                  },
                  {
                    title: "Frontend Developer",
                    company: "IvaLabs",
                    period: "Fevereiro 2022 - Junho 2023",
                    description: "Led UI/UX design initiatives for websites focused on feature delivery and engagement with high-performing websites and systems. Enhanced SEO visibility through a 30% increase in organic traffic while maintaining uncompromised speed through dynamic SEO strategies.",
                    skills: ["HTML", "CSS", "JavaScript", "SEO", "UI/UX", "Performance Optimization"]
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center animate-on-scroll">
              <div>
                <h2 className="text-3xl font-semibold mb-6">Minha Filosofia</h2>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Acredito que a tecnologia deve ser invisible - funcionar de forma tão natural 
                  que as pessoas nem percebam sua complexidade. Cada linha de código que escrevo 
                  tem o objetivo de criar experiências mais humanas e acessíveis.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Busco sempre equilibrar inovação técnica com usabilidade prática, 
                  criando produtos que não apenas impressionam, mas que realmente 
                  resolvem problemas reais das pessoas.
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-primary bg-zinc-900/30">
                  <h3 className="font-medium mb-2">Código Limpo</h3>
                  <p className="text-sm text-gray-400">Escrevo código pensando em quem vai mantê-lo amanhã</p>
                </div>
                <div className="p-4 border-l-4 border-primary bg-zinc-900/30">
                  <h3 className="font-medium mb-2">Design Centrado no Usuário</h3>
                  <p className="text-sm text-gray-400">Cada decisão é tomada pensando na experiência final</p>
                </div>
                <div className="p-4 border-l-4 border-primary bg-zinc-900/30">
                  <h3 className="font-medium mb-2">Aprendizado Contínuo</h3>
                  <p className="text-sm text-gray-400">Tecnologia evolui rápido, e eu evoluo junto</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}