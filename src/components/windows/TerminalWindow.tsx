import { useState, useEffect, useRef } from "react";

const resumeContent = `Edoardo Rossi - Full Stack Developer

Personal Info:
- Email: edoardo.dev@example.com
- LinkedIn: linkedin.com/in/username
- GitHub: github.com/username

Skills:
- C#, TypeScript, JavaScript, SQL
- .NET, Angular, React
- Git, REST API, Entity Framework, Docker

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

Contact me for collaboration opportunities!`;

const commands = {
  help: `Available commands:
  cat resume.txt    - Display resume
  ls               - List files
  pwd              - Show current directory
  whoami           - Show current user
  clear            - Clear terminal
  neofetch         - System information
  help             - Show this help`,
  
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
    setHistory(prev => [...prev, { type: 'input', content: `edoardo@portfolio:~$ ${command}` }]);
    
    let output = '';
    
    if (cmd === 'cat resume.txt') {
      output = resumeContent;
    } else if (cmd === 'clear') {
      setHistory([]);
      setCurrentInput('');
      return;
    } else if (commands[cmd as keyof typeof commands]) {
      output = commands[cmd as keyof typeof commands];
    } else if (cmd === '') {
      // Empty command, just show new prompt
      setCurrentInput('');
      return;
    } else {
      output = `bash: ${cmd}: command not found\nType "help" for available commands.`;
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