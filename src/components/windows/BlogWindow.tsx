import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Il Futuro dello Sviluppo Web con React e TypeScript",
    excerpt: "Esploriamo le nuove tendenze e le migliori pratiche per lo sviluppo moderno di applicazioni web...",
    content: `
      <h2>Introduzione</h2>
      <p>Lo sviluppo web moderno sta evolvendo rapidamente, e React insieme a TypeScript rappresenta una delle combinazioni più potenti per creare applicazioni scalabili e mantenibili.</p>
      
      <h3>Vantaggi di TypeScript</h3>
      <ul>
        <li>Type safety che riduce gli errori in produzione</li>
        <li>Migliore IDE support con autocomplete avanzato</li>
        <li>Refactoring più sicuro e veloce</li>
      </ul>
      
      <h3>React Hooks Avanzati</h3>
      <p>I React Hooks hanno rivoluzionato il modo in cui scriviamo componenti. Hook come useCallback, useMemo e useReducer permettono di ottimizzare le performance delle nostre applicazioni.</p>
      
      <h3>Conclusioni</h3>
      <p>L'ecosistema React continua a crescere e migliorare, offrendo sempre nuovi strumenti per sviluppatori più produttivi ed efficienti.</p>
    `,
    author: "Marco Dev",
    date: "2024-01-15",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Architetture Microservizi con .NET Core",
    excerpt: "Come progettare e implementare una architettura a microservizi robusta utilizzando .NET Core e Docker...",
    content: `
      <h2>Perché i Microservizi?</h2>
      <p>L'architettura a microservizi offre numerosi vantaggi per applicazioni enterprise: scalabilità indipendente, deploy separati, e tecnologie diverse per servizi diversi.</p>
      
      <h3>Implementazione con .NET Core</h3>
      <p>.NET Core fornisce tutti gli strumenti necessari per implementare microservizi:</p>
      <ul>
        <li>ASP.NET Core per API REST</li>
        <li>Entity Framework Core per l'accesso ai dati</li>
        <li>Docker support nativo</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Domain-driven design</li>
        <li>API Gateway pattern</li>
        <li>Circuit breaker pattern</li>
        <li>Centralized logging</li>
      </ul>
      
      <h3>Challenges e Soluzioni</h3>
      <p>I microservizi introducono complessità nella comunicazione tra servizi, nel monitoring e nel debugging distribuito. Strumenti come Kubernetes e Istio aiutano a gestire questa complessità.</p>
    `,
    author: "Marco Dev",
    date: "2024-01-10",
    readTime: "8 min"
  },
  {
    id: 3,
    title: "DevOps con Azure: CI/CD Pipelines",
    excerpt: "Guida completa per implementare pipeline CI/CD efficienti utilizzando Azure DevOps e GitHub Actions...",
    content: `
      <h2>Il Mondo DevOps</h2>
      <p>DevOps non è solo un insieme di strumenti, ma una cultura che unisce sviluppo e operations per delivery più veloci e affidabili.</p>
      
      <h3>Azure DevOps vs GitHub Actions</h3>
      <p>Entrambe le piattaforme offrono potenti strumenti di CI/CD:</p>
      <ul>
        <li><strong>Azure DevOps:</strong> Integrazione completa con ecosistema Microsoft</li>
        <li><strong>GitHub Actions:</strong> Marketplace ricco e community attiva</li>
      </ul>
      
      <h3>Pipeline Best Practices</h3>
      <ul>
        <li>Build automatizzate ad ogni commit</li>
        <li>Test automatizzati a più livelli</li>
        <li>Deploy automatico in staging</li>
        <li>Rollback automatico in caso di errori</li>
      </ul>
      
      <h3>Monitoring e Observability</h3>
      <p>Application Insights e Azure Monitor forniscono visibilità completa sulle performance e la salute delle applicazioni in produzione.</p>
    `,
    author: "Marco Dev",
    date: "2024-01-05",
    readTime: "6 min"
  },
  {
    id: 4,
    title: "Database Design: SQL vs NoSQL",
    excerpt: "Quando scegliere database relazionali o NoSQL? Analisi comparativa con esempi pratici...",
    content: `
      <h2>La Scelta del Database</h2>
      <p>La scelta tra SQL e NoSQL dipende dalle esigenze specifiche del progetto: consistenza dei dati, scalabilità, complessità delle query.</p>
      
      <h3>Database SQL</h3>
      <p>Ideali per:</p>
      <ul>
        <li>Transazioni ACID complesse</li>
        <li>Relazioni complesse tra entità</li>
        <li>Query complesse con JOIN</li>
        <li>Consistenza forte dei dati</li>
      </ul>
      
      <h3>Database NoSQL</h3>
      <p>Migliori per:</p>
      <ul>
        <li>Scalabilità orizzontale</li>
        <li>Dati semi-strutturati o non strutturati</li>
        <li>Alte performance in lettura/scrittura</li>
        <li>Flexibility dello schema</li>
      </ul>
      
      <h3>Hybrid Approaches</h3>
      <p>Molte architetture moderne utilizzano entrambi gli approcci: SQL per dati critici e transazionali, NoSQL per cache, analytics e dati non strutturati.</p>
    `,
    author: "Marco Dev",
    date: "2023-12-28",
    readTime: "7 min"
  }
];

export const BlogWindow = () => {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  
  if (selectedPost) {
    return (
      <div className="p-4 sm:p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Torna ai post
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <article className="max-w-4xl mx-auto">
            <header className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {selectedPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {selectedPost.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(selectedPost.date).toLocaleDateString('it-IT')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {selectedPost.readTime}
                </div>
              </div>
            </header>
            
            <div 
              className="prose prose-sm sm:prose-base max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              style={{
                color: 'hsl(var(--foreground))'
              }}
            />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 h-full flex flex-col">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Blog</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Articoli su sviluppo web, tecnologie e best practices
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-4 sm:gap-6">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer border border-border"
              onClick={() => setSelectedPost(post)}
            >
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground pt-2 border-t border-border">
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString('it-IT')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};