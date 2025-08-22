import { Calendar, MapPin, Building } from "lucide-react";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Freelance",
    location: "Milano, Italia",
    period: "2023 – Presente",
    type: "Freelance",
    description: [
      "Sviluppo Web API in .NET Core per diverse aziende clienti",
      "Creazione di interfacce React moderne e responsive",
      "Implementazione di architetture microservizi",
      "Gestione database relazionali e NoSQL"
    ],
    technologies: ["C#", ".NET Core", "React", "TypeScript", "SQL Server", "Docker"]
  },
  {
    title: "Software Developer",
    company: "Azienda XYZ",
    location: "Milano, Italia", 
    period: "2021 – 2023",
    type: "Full-time",
    description: [
      "Manutenzione e sviluppo di applicazioni gestionali enterprise",
      "Migrazione di sistemi legacy a tecnologie moderne",
      "Collaborazione con team multidisciplinari in ambiente Agile",
      "Ottimizzazione delle performance delle applicazioni esistenti"
    ],
    technologies: ["C#", ".NET Framework", "Angular", "SQL Server", "Entity Framework"]
  },
  {
    title: "Stage Developer",
    company: "Web Agency",
    location: "Milano, Italia",
    period: "2020",
    type: "Stage",
    description: [
      "Supporto allo sviluppo di siti web e applicazioni interne",
      "Apprendimento delle best practices di sviluppo",
      "Partecipazione a progetti di modernizzazione tecnologica",
      "Assistenza nella documentazione tecnica"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"]
  }
];

export const ExperienceWindow = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Work Experience</h2>
        <p className="text-muted-foreground">
          Il mio percorso professionale e le esperienze lavorative.
        </p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            {/* Timeline line */}
            {index < experiences.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-full bg-border"></div>
            )}
            
            <div className="flex gap-6">
              {/* Timeline dot */}
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Building size={20} className="text-primary-foreground" />
              </div>
              
              {/* Content */}
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                      {exp.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <ul className="space-y-1 text-muted-foreground">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};