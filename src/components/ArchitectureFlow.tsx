import { Cpu, Database, Lock, Router, Server, TerminalSquare } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const flow = [
  { icon: TerminalSquare, title: "Official CLIs", body: "Claude, Codex, OpenCode, and Ollama keep their own auth." },
  { icon: Router, title: "Akorith bridge", body: "Prompts move through one controlled stdin path." },
  { icon: Server, title: "Project PTYs", body: "Agent sessions run inside the selected workspace." },
  { icon: Database, title: "Local state", body: "Chat memory, usage, and settings are stored locally." },
  { icon: Cpu, title: "Runtime view", body: "GPU, usage, plugins, and loops stay observable." },
  { icon: Lock, title: "User control", body: "Risky permission prompts pause for a human decision." }
];

export function ArchitectureFlow() {
  return (
    <section className="section architecture-section">
      <div className="container">
        <SectionHeading
          eyebrow="Architecture"
          title="A local command surface, not a credential vault"
          body="Akorith coordinates the tools already installed on your machine and keeps the sensitive pieces at the CLI and operating-system level."
        />
        <div className="architecture-flow">
          {flow.map((step, index) => {
            const Icon = step.icon;
            return (
              <article className="flow-step" key={step.title}>
                <span className="flow-index">{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" size={24} />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
