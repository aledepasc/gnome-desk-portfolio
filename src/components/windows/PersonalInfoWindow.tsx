export const PersonalInfoWindow = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">ER</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Edoardo Rossi</h2>
          <p className="text-lg text-primary font-medium">Full Stack Developer</p>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">About Me</h3>
        <p className="text-muted-foreground leading-relaxed">
          Sviluppatore appassionato di .NET e React, con interesse per progetti open source e fotografia. 
          Mi piace creare soluzioni innovative e lavorare su tecnologie moderne per costruire esperienze 
          digitali coinvolgenti.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">3+</div>
          <div className="text-sm text-muted-foreground">Years Experience</div>
        </div>
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">10+</div>
          <div className="text-sm text-muted-foreground">Projects Completed</div>
        </div>
      </div>
    </div>
  );
};