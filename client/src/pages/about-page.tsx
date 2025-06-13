import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProfessionalExperience } from "@/components/professional-experience";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-[1200px] mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
              Sobre mim
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Conheça minha jornada profissional e as experiências que moldaram 
              minha expertise em desenvolvimento e design.
            </p>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="py-16 px-4">
          <div className="max-w-[1200px] mx-auto">
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
        </section>
      </main>

      <Footer />
    </div>
  );
}