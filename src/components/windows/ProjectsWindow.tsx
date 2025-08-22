import { ExternalLink, Github, Calendar, Code } from "lucide-react";

const projects = [
  {
    title: "E-commerce Platform",
    description: "Piattaforma e-commerce completa con gestione prodotti, carrello, pagamenti e dashboard admin.",
    technologies: ["React", "TypeScript", ".NET Core", "SQL Server", "Stripe API"],
    status: "Completed",
    year: "2023",
    github: "https://github.com/username/ecommerce-platform",
    demo: "https://ecommerce-demo.example.com",
    features: [
      "Autenticazione JWT",
      "Integrazione Stripe per pagamenti",
      "Dashboard amministrativa",
      "API RESTful scalabile"
    ]
  },
  {
    title: "CRM Management System",
    description: "Sistema CRM per la gestione clienti con dashboard analytics, pipeline vendite e reporting.",
    technologies: ["Angular", "C#", "Entity Framework", "Azure SQL", "Chart.js"],
    status: "In Progress",
    year: "2023",
    github: "https://github.com/username/crm-system",
    demo: null,
    features: [
      "Dashboard analytics avanzate",
      "Gestione pipeline vendite", 
      "Sistema di notifiche",
      "Export dati in Excel/PDF"
    ]
  },
  {
    title: "API Gateway Microservices",
    description: "Architettura microservizi con API Gateway, service discovery e monitoraggio distribuito.",
    technologies: ["Docker", "Kubernetes", ".NET Core", "Redis", "Ocelot"],
    status: "Completed",
    year: "2022",
    github: "https://github.com/username/microservices-gateway",
    demo: null,
    features: [
      "Load balancing automatico",
      "Circuit breaker pattern",
      "Logging centralizzato",
      "Health checks integrati"
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'In Progress':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const ProjectsWindow = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">My Projects</h2>
        <p className="text-muted-foreground">
          Una selezione dei progetti più significativi che ho sviluppato.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="border border-border rounded-lg p-6 space-y-4 hover:shadow-subtle transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  {project.year}
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-primary/10 text-primary text-sm font-medium rounded flex items-center gap-1"
                >
                  <Code size={12} />
                  {tech}
                </span>
              ))}
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">Key Features:</h4>
              <ul className="grid grid-cols-2 gap-1">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-2 border-t border-border">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
              >
                <Github size={16} />
                <span className="text-sm font-medium">Source Code</span>
              </a>
              
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                  <span className="text-sm font-medium">Live Demo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-6 border-t border-border">
        <p className="text-muted-foreground mb-4">
          Vuoi vedere altri progetti o collaborare su qualcosa di nuovo?
        </p>
        <a
          href="https://github.com/username"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
        >
          <Github size={18} />
          View All Projects on GitHub
        </a>
      </div>
    </div>
  );
};