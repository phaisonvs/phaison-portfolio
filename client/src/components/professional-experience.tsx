import { BriefcaseIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

interface ProfessionalExperienceProps {
  experiences: Experience[];
}

export function ProfessionalExperience({ experiences }: ProfessionalExperienceProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-900/20 rounded-lg p-3">
          <BriefcaseIcon className="h-6 w-6 text-blue-900" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold">Experiência</h2>
      </div>
      
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="relative pl-8 border-l-2 border-zinc-800 animate-on-scroll"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Blue dot on timeline */}
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-800" />
            
            <div className="mb-2">
              <h3 className="text-xl font-medium text-white">
                {exp.title} <span className="text-blue-800">@ {exp.company}</span>
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                {exp.period}
              </p>
            </div>
            
            <p className="text-gray-300 my-4">
              {exp.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {exp.skills.map((skill, skillIndex) => (
                <Badge 
                  key={skillIndex} 
                  variant="outline"
                  className="rounded-full bg-zinc-900 border-zinc-700 text-gray-300 px-3 py-1 text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}