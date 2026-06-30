import { Activity, Bot, DatabaseZap, TerminalSquare } from "lucide-react";

const commands = [
  { icon: TerminalSquare, label: "Project terminals", value: "Codex / OpenCode / Claude" },
  { icon: Bot, label: "Provider routes", value: "CLI-first orchestration" },
  { icon: DatabaseZap, label: "Memory", value: "Per-chat local context" },
  { icon: Activity, label: "Observation", value: "Dashboard + agent activity" }
];

export function CommandStrip() {
  return (
    <section className="command-strip" aria-label="Product operating model">
      {commands.map((item) => {
        const Icon = item.icon;
        return (
          <div className="command-cell" key={item.label}>
            <Icon aria-hidden="true" size={20} />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        );
      })}
    </section>
  );
}
