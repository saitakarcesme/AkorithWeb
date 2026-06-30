import { ArrowRight, Download, GitBranch, LockKeyhole } from "lucide-react";
import { heroMetrics } from "../data/metrics";
import { withBase } from "../utils/assets";
import { links } from "../utils/links";
import { ExternalLink } from "./ExternalLink";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <img src={withBase("images/screenshots/agent-activity.png")} alt="" />
      </div>
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-inner">
        <p className="eyebrow">Local-first Agent OS for AI coding workflows</p>
        <h1 id="hero-title">Akorith</h1>
        <p className="hero-copy">
          Orchestrate Claude, Codex, OpenCode, and Ollama from one desktop workspace that keeps
          provider credentials out of the app and keeps project context under your control.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#download">
            <Download aria-hidden="true" size={20} />
            <span>Download Akorith</span>
          </a>
          <ExternalLink className="button button-secondary" href={links.productRepo}>
            <GitBranch aria-hidden="true" size={20} />
            <span>View source</span>
          </ExternalLink>
        </div>
        <div className="hero-assurance">
          <LockKeyhole aria-hidden="true" size={18} />
          <span>Uses official CLI logins. Stores local app state in SQLite, not provider secrets.</span>
        </div>
      </div>
      <div className="hero-metrics" aria-label="Akorith highlights">
        {heroMetrics.map((metric) => (
          <div className="metric-tile" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.detail}</small>
          </div>
        ))}
        <a className="metric-link" href="#features">
          <span>Explore the system</span>
          <ArrowRight aria-hidden="true" size={18} />
        </a>
      </div>
    </section>
  );
}
