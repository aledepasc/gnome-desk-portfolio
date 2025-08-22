import { Mail, Phone, Github, Linkedin, MapPin } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "edoardo.dev@example.com",
    link: "mailto:edoardo.dev@example.com",
  },
  {
    icon: Phone,
    label: "Telefono",
    value: "+39 333 1234567",
    link: "tel:+393331234567",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/username",
    link: "https://github.com/username",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/username",
    link: "https://linkedin.com/in/username",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Milano, Italia",
    link: null,
  },
];

export const ContactWindow = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Get In Touch</h2>
        <p className="text-muted-foreground">
          Sono sempre interessato a nuove opportunità e collaborazioni.
        </p>
      </div>

      <div className="space-y-4">
        {contactItems.map((item) => (
          <div key={item.label} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="p-3 bg-primary/10 rounded-lg">
              <item.icon size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
              {item.link ? (
                <a
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.value}
                </a>
              ) : (
                <div className="text-foreground font-medium">{item.value}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">Preferenze di contatto</h3>
        <p className="text-sm text-muted-foreground">
          Il modo migliore per contattarmi è tramite email. Rispondo solitamente entro 24 ore.
        </p>
      </div>
    </div>
  );
};