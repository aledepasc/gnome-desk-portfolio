import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const skillCategories = {
  frontend: {
    title: "Frontend Development",
    icon: "🎨",
    skills: [
      { name: "React", level: "Esperto" },
      { name: "TypeScript", level: "Esperto" },
      { name: "JavaScript", level: "Esperto" },
      { name: "HTML5 & CSS3", level: "Esperto" },
      { name: "Angular", level: "Avanzato" },
      { name: "Tailwind CSS", level: "Avanzato" },
      { name: "Sass/SCSS", level: "Avanzato" },
      { name: "Redux", level: "Avanzato" },
      { name: "Vue.js", level: "Intermedio" },
    ]
  },
  backend: {
    title: "Backend Development", 
    icon: "⚙️",
    skills: [
      { name: "C# (.NET Core)", level: "Esperto" },
      { name: "REST APIs", level: "Esperto" },
      { name: "Entity Framework", level: "Esperto" },
      { name: "Node.js", level: "Avanzato" },
      { name: "ASP.NET Core", level: "Avanzato" },
      { name: "Microservices", level: "Avanzato" },
      { name: "GraphQL", level: "Intermedio" },
      { name: "Python", level: "Intermedio" },
    ]
  },
  database: {
    title: "Database & Storage",
    icon: "🗄️", 
    skills: [
      { name: "SQL Server", level: "Esperto" },
      { name: "SQL", level: "Esperto" },
      { name: "PostgreSQL", level: "Avanzato" },
      { name: "MySQL", level: "Avanzato" },
      { name: "MongoDB", level: "Intermedio" },
      { name: "Redis", level: "Intermedio" },
    ]
  },
  devops: {
    title: "DevOps & Cloud",
    icon: "☁️",
    skills: [
      { name: "Microsoft Azure", level: "Avanzato" },
      { name: "Docker", level: "Avanzato" },
      { name: "GitHub Actions", level: "Avanzato" },
      { name: "Azure DevOps", level: "Avanzato" },
      { name: "Kubernetes", level: "Intermedio" },
      { name: "AWS", level: "Intermedio" },
    ]
  },
  tools: {
    title: "Tools & Development",
    icon: "🛠️",
    skills: [
      { name: "Git", level: "Esperto" },
      { name: "Visual Studio", level: "Esperto" },
      { name: "VS Code", level: "Esperto" },
      { name: "Postman", level: "Avanzato" },
      { name: "Jira", level: "Avanzato" },
      { name: "Jest", level: "Intermedio" },
    ]
  }
};

const getLevelBadgeVariant = (level: string) => {
  switch (level) {
    case "Esperto":
      return "default";
    case "Avanzato":
      return "secondary";
    case "Intermedio":
      return "outline";
    default:
      return "outline";
  }
};

export const SkillsWindow = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof skillCategories>("frontend");
  
  const categoryKeys = Object.keys(skillCategories) as Array<keyof typeof skillCategories>;

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Technical Skills</h2>
        <p className="text-muted-foreground">
          Competenze tecniche organizzate per categoria professionale
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 p-4 bg-muted/20 rounded-lg">
        {categoryKeys.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className="flex items-center gap-2"
          >
            <span>{skillCategories[category].icon}</span>
            {skillCategories[category].title}
          </Button>
        ))}
      </div>

      {/* Active Category Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{skillCategories[activeCategory].icon}</span>
            <h3 className="text-xl font-semibold text-foreground">
              {skillCategories[activeCategory].title}
            </h3>
          </div>
          
          <div className="grid gap-3">
            {skillCategories[activeCategory].skills.map((skill) => (
              <div key={skill.name} className="flex justify-between items-center p-4 bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <span className="font-medium text-foreground">{skill.name}</span>
                <Badge variant={getLevelBadgeVariant(skill.level)}>
                  {skill.level}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Categoria attiva: {skillCategories[activeCategory].title}</span>
          <span>{skillCategories[activeCategory].skills.length} competenze</span>
        </div>
      </div>
    </div>
  );
};