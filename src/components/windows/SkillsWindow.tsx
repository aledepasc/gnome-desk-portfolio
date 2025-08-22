import { Progress } from "@/components/ui/progress";

const skillCategories = [
  {
    category: "Linguaggi di Programmazione",
    skills: [
      { name: "C#", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "SQL", level: 75 },
    ]
  },
  {
    category: "Framework & Librerie",
    skills: [
      { name: ".NET Core", level: 90 },
      { name: "React", level: 85 },
      { name: "Angular", level: 70 },
      { name: "Entity Framework", level: 80 },
    ]
  },
  {
    category: "Tools & Tecnologie",
    skills: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 70 },
      { name: "REST API", level: 90 },
      { name: "Azure", level: 65 },
    ]
  }
];

const getSkillColor = (level: number) => {
  if (level >= 80) return "text-green-600";
  if (level >= 60) return "text-yellow-600";
  return "text-orange-600";
};

export const SkillsWindow = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Technical Skills</h2>
        <p className="text-muted-foreground">
          Le mie competenze tecniche e il livello di esperienza.
        </p>
      </div>

      <div className="space-y-8">
        {skillCategories.map((category) => (
          <div key={category.category} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
              {category.category}
            </h3>
            
            <div className="grid gap-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className={`text-sm font-semibold ${getSkillColor(skill.level)}`}>
                      {skill.level}%
                    </span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <h4 className="font-semibold text-foreground mb-2">Altre competenze</h4>
        <div className="flex flex-wrap gap-2">
          {["Agile/Scrum", "TDD", "CI/CD", "Microservices", "GraphQL", "MongoDB"].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};