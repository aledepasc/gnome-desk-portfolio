const skillCategories = [
  {
    category: "Linguaggi di Programmazione",
    skills: [
      { name: "C#", level: "Esperto" },
      { name: "TypeScript", level: "Avanzato" },
      { name: "JavaScript", level: "Avanzato" },
      { name: "SQL", level: "Intermedio" },
      { name: "Python", level: "Intermedio" },
    ]
  },
  {
    category: "Framework & Librerie",
    skills: [
      { name: ".NET Core", level: "Esperto" },
      { name: "React", level: "Avanzato" },
      { name: "Angular", level: "Intermedio" },
      { name: "Entity Framework", level: "Avanzato" },
      { name: "Node.js", level: "Intermedio" },
    ]
  },
  {
    category: "Tools & Tecnologie",
    skills: [
      { name: "Git", level: "Avanzato" },
      { name: "Docker", level: "Intermedio" },
      { name: "REST API", level: "Esperto" },
      { name: "Azure", level: "Intermedio" },
      { name: "VS Code", level: "Esperto" },
    ]
  }
];

const getLevelBadgeStyle = (level: string) => {
  switch (level) {
    case "Esperto":
      return "bg-green-100 text-green-800 border-green-300";
    case "Avanzato":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "Intermedio":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
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
            
            <div className="grid gap-3">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getLevelBadgeStyle(skill.level)}`}>
                    {skill.level}
                  </span>
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