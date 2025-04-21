import { Card, CardContent } from "@/components/ui/card";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

interface PluginCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
}

export function PluginCard({ title, description, icon: Icon, iconBgColor }: PluginCardProps) {
  return (
    <Card className="bg-zinc-900 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <div className={`h-10 w-10 rounded-xl ${iconBgColor} flex items-center justify-center mr-3`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <p className="text-sm text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}
