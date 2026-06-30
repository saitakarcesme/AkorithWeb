import { CheckCircle2 } from "lucide-react";
import { features } from "../data/features";
import { providers } from "../data/providers";
import { SectionHeading } from "./SectionHeading";

export function FeatureBands() {
  return (
    <section className="section feature-section" id="features">
      <div className="container">
        <SectionHeading
          eyebrow="Product"
          title="Built for people who already live in coding agents"
          body="Akorith does not replace the tools you trust. It gives them one local command surface, project-aware memory, and operational visibility."
        />
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <p className="eyebrow">{feature.kicker}</p>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <ul>
                {feature.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 aria-hidden="true" size={18} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="provider-matrix" aria-label="Supported providers">
          {providers.map((provider) => (
            <article className="provider-row" key={provider.name}>
              <div>
                <strong>{provider.name}</strong>
                <span>{provider.lane}</span>
              </div>
              <p>{provider.role}</p>
              <small>{provider.auth}</small>
              <em>{provider.mode}</em>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
