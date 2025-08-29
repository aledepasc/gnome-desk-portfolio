import { useState, useEffect, useRef } from "react";

const resumeContent = `Edoardo Rossi - Full Stack Developer

Personal Info:
- Email: edoardo.dev@example.com
- LinkedIn: linkedin.com/in/username
- GitHub: github.com/username

Experience:
2023-Present: Freelance - Full Stack Developer
2021-2023: Azienda XYZ - Software Developer  
2020: Web Agency - Stage

Education:
- Laurea in Informatica - Università Statale Milano
- Certificazioni Microsoft Azure

Projects:
- E-commerce Platform (React + .NET Core)
- CRM Management System (Angular + C#)
- API Gateway Microservices (Docker + Kubernetes)

For detailed technical skills, use: skills [category]
Available categories: frontend, backend, database, devops, tools

Contact me for collaboration opportunities!`;

const technicalSkills = {
  frontend: `Frontend Development:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Languages & Frameworks:
  ▶ JavaScript (ES6+)     │ Advanced proficiency
  ▶ TypeScript           │ Advanced proficiency  
  ▶ React.js             │ Expert level
  ▶ Angular              │ Advanced proficiency
  ▶ Vue.js               │ Intermediate level
  ▶ HTML5 & CSS3         │ Expert level

Styling & UI:
  ▶ Tailwind CSS         │ Advanced proficiency
  ▶ Sass/SCSS           │ Advanced proficiency
  ▶ Bootstrap            │ Advanced proficiency
  ▶ Material UI          │ Intermediate level
  ▶ Styled Components    │ Advanced proficiency

State Management:
  ▶ Redux/Redux Toolkit  │ Advanced proficiency
  ▶ Zustand             │ Intermediate level
  ▶ Context API          │ Advanced proficiency`,

  backend: `Backend Development:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Languages & Frameworks:
  ▶ C# (.NET Core)       │ Expert level
  ▶ Node.js              │ Advanced proficiency
  ▶ Python               │ Intermediate level
  ▶ Java                 │ Intermediate level

API Development:
  ▶ REST APIs            │ Expert level
  ▶ GraphQL              │ Intermediate level
  ▶ WebSockets           │ Advanced proficiency
  ▶ Microservices        │ Advanced proficiency

Authentication & Security:
  ▶ JWT                  │ Advanced proficiency
  ▶ OAuth 2.0            │ Advanced proficiency
  ▶ Identity Server      │ Intermediate level`,

  database: `Database Technologies:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Relational Databases:
  ▶ SQL Server           │ Expert level
  ▶ PostgreSQL           │ Advanced proficiency
  ▶ MySQL               │ Advanced proficiency
  ▶ SQLite              │ Advanced proficiency

NoSQL Databases:
  ▶ MongoDB             │ Intermediate level
  ▶ Redis               │ Intermediate level

ORM & Query Tools:
  ▶ Entity Framework    │ Expert level
  ▶ Prisma              │ Intermediate level
  ▶ LINQ                │ Expert level`,

  devops: `DevOps & Cloud:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Containerization:
  ▶ Docker              │ Advanced proficiency
  ▶ Kubernetes          │ Intermediate level
  ▶ Docker Compose      │ Advanced proficiency

Cloud Platforms:
  ▶ Microsoft Azure     │ Advanced proficiency
  ▶ AWS                 │ Intermediate level
  ▶ Vercel              │ Advanced proficiency

CI/CD & Automation:
  ▶ GitHub Actions      │ Advanced proficiency
  ▶ Azure DevOps        │ Advanced proficiency
  ▶ Jenkins             │ Intermediate level`,

  tools: `Development Tools:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Version Control:
  ▶ Git                 │ Expert level
  ▶ GitHub              │ Expert level
  ▶ GitLab              │ Advanced proficiency

Development Environment:
  ▶ Visual Studio       │ Expert level
  ▶ VS Code             │ Expert level
  ▶ JetBrains IDEs      │ Intermediate level

Project Management:
  ▶ Jira                │ Advanced proficiency
  ▶ Trello              │ Advanced proficiency
  ▶ Azure Boards        │ Advanced proficiency

Testing:
  ▶ Jest                │ Advanced proficiency
  ▶ MSTest              │ Advanced proficiency
  ▶ Cypress             │ Intermediate level`
};

const movieQuotes = {
  "may the force be with you": `
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣶⣿⣿⣿⣿⣿⣿⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀
    ⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀
    ⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠟⠋⠉⠉⠉⠉⠙⠻⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀
    ⠀⠀⠀⠀⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⠀⠀⠀⠀
    ⠀⠀⠀⠀⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⠀⠀⠀⠀
    ⠀⠀⠀⠀⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠀⠀⠀⠀
    ⠀⠀⠀⠀⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⠀⠀⠀⠀
    ⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀
    ⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣷⣤⣀⣀⣀⣀⣤⣾⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⢿⣿⣿⣿⣿⣿⡿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀

    "May the Force be with you." - Star Wars`,
  
  "i'll be back": `
    ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣿⣿⣿⣿⣿⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀
    ⠀⠀⠀⢰⣿⣿⣿⣿⣿⡿⠿⠛⠛⠛⠛⠿⢿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀
    ⠀⠀⠀⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⠀⠀⠀
    ⠀⠀⢸⣿⣿⣿⣿⠁⢀⣀⣤⣤⣤⣤⣀⡀⠀⠀⠈⣿⣿⣿⣿⣿⡇⠀⠀
    ⠀⠀⣿⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⢸⣿⣿⣿⣿⣿⠀⠀
    ⠀⢸⣿⣿⣿⣿⡇⠀⠈⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⢸⣿⣿⣿⣿⣿⡇⠀
    ⠀⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⠀
    ⢸⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⡇
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣤⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    
    "I'll be back." - Terminator`,
    
  "houston we have a problem": `
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠟⠋⠉⠉⠋⠻⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣄⠀⠀⠀⠀⣠⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣷⣶⣶⣾⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣀⣤⣶⣶⣶⣤⣄⠀⠀⠀⠀⣠⣤⣶⣶⣶⣤⣀⠀⠀⠀⠀⠀
    ⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀
    ⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀
    ⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀
    ⠀⠀⠀⠀⠈⠙⠻⠿⠿⠟⠋⠀⠀⠀⠀⠙⠻⠿⠿⠟⠋⠁⠀⠀⠀⠀⠀

    "Houston, we have a problem." - Apollo 13`,

  "show me the money": `
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀
    ⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀
    ⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
    ⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
    ⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
    ⠀⠀⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀
    ⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⢿⣿⣿⣿⣿⡿⠿⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀
    
    "Show me the money!" - Jerry Maguire`
};

const commands = {
  help: `Available commands:
  cat resume.txt       - Display resume
  skills [category]    - Show technical skills by category
                        Categories: frontend, backend, database, devops, tools
  ls                   - List files
  pwd                  - Show current directory
  whoami               - Show current user
  clear                - Clear terminal
  neofetch             - System information
  quotes               - Show available movie quotes
  help                 - Show this help
  
  Try typing famous movie quotes for easter eggs!`,
  
  skills: `Technical Skills Categories:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Usage: skills [category]

Available categories:
  frontend  - Frontend Development (React, Angular, TypeScript...)
  backend   - Backend Development (C#, Node.js, APIs...)
  database  - Database Technologies (SQL Server, MongoDB...)
  devops    - DevOps & Cloud (Docker, Azure, CI/CD...)
  tools     - Development Tools (Git, VS Code, Testing...)

Example: skills frontend`,
  
  quotes: `Available movie quotes (try typing them):
  - "may the force be with you"
  - "i'll be back"  
  - "houston we have a problem"
  - "show me the money"`,
  
  ls: `resume.txt  projects/  skills/  contact.txt`,
  pwd: `/home/edoardo`,
  whoami: `edoardo`,
  neofetch: `                 .-/+oossssoo+/-.
              \`:+ssssssssssssssssss+:\`
            -+ssssssssssssssssssyyssss+-
          .ossssssssssssssssssdMMMNysssso.
         /ssssssssssshdmmNNmmyNMMMMhssssss/
        +ssssssssshmydMMMMMMMNddddyssssssss+
       /ssssssssshNMMMyhhyyyyhmNMMMNhsssssss/
      .ssssssssssdMMMNhsssssssssshNMMMdssssss.
      +sssshhhyNMMNyssssssssssssssyNMMMysssss+
      ossyNMMMNyMMhsssssssssssssssshmmmhssssso
      ossyNMMMNyMMhsssssssssssssssshmmmhssssso
      +sssshhhyNMMNyssssssssssssssyNMMMysssss+
      .ssssssssssdMMMNhsssssssssshNMMMdssssss.
       /ssssssssshNMMMyhhyyyyhdNMMMNhsssssss/
        +ssssssssshmydMMMMMMMNddddyssssssss+
         /ssssssssssshdmNNNNmyNMMMMhssssss/

edoardo@portfolio
-----------------
OS: GNOME Portfolio Linux
Kernel: 6.2.0
Uptime: Always coding
Shell: bash 5.0
Resolution: Full Stack Developer
Terminal: GNOME Terminal`
};

export const TerminalWindow = () => {
  const [history, setHistory] = useState<Array<{type: 'input' | 'output', content: string}>>([
    { type: 'output', content: 'Welcome to Edoardo\'s Portfolio Terminal\nType "help" for available commands or "cat resume.txt" to view resume.\n' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    const [mainCmd, ...args] = cmd.split(' ');
    setHistory(prev => [...prev, { type: 'input', content: `edoardo@portfolio:~$ ${command}` }]);
    
    let output = '';
    
    // Check for movie quotes first
    if (movieQuotes[cmd as keyof typeof movieQuotes]) {
      output = movieQuotes[cmd as keyof typeof movieQuotes];
    } else if (cmd === 'cat resume.txt') {
      output = resumeContent;
    } else if (cmd === 'clear') {
      setHistory([]);
      setCurrentInput('');
      return;
    } else if (mainCmd === 'skills') {
      if (args.length === 0) {
        output = commands.skills;
      } else {
        const category = args[0];
        if (technicalSkills[category as keyof typeof technicalSkills]) {
          output = technicalSkills[category as keyof typeof technicalSkills];
        } else {
          output = `Skills category "${category}" not found.\nAvailable categories: frontend, backend, database, devops, tools\n\nType "skills" for more information.`;
        }
      }
    } else if (commands[cmd as keyof typeof commands]) {
      output = commands[cmd as keyof typeof commands];
    } else if (cmd === '') {
      // Empty command, just show new prompt
      setCurrentInput('');
      return;
    } else {
      output = `bash: ${cmd}: command not found\nType "help" for available commands or try typing a movie quote!`;
    }
    
    setHistory(prev => [...prev, { type: 'output', content: output }]);
    setCurrentInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="h-full bg-gray-900 text-green-400 font-mono text-sm p-4 cursor-text overflow-hidden flex flex-col"
      onClick={handleTerminalClick}
    >
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto space-y-1 terminal-scroll"
      >
        {history.map((entry, index) => (
          <div key={index} className={entry.type === 'input' ? 'text-green-300' : 'text-gray-300'}>
            <pre className="whitespace-pre-wrap break-words">{entry.content}</pre>
          </div>
        ))}
      </div>
      
      <div className="flex items-center text-green-300 mt-2">
        <span>edoardo@portfolio:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent outline-none text-green-400 ml-1"
          autoFocus
        />
        <span className="animate-pulse">█</span>
      </div>
    </div>
  );
};