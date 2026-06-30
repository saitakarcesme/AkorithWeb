import { ShieldCheck } from "lucide-react";
import { securityControls } from "../data/content";
import { SectionHeading } from "./SectionHeading";

export function SecuritySection() {
  return (
    <section className="section security-section" id="security">
      <div className="container">
        <SectionHeading
          eyebrow="Security and privacy"
          title="Cautious defaults for a desktop app that can touch real repos"
          body="The product positioning is intentionally specific: no provider API keys in the app, local storage by default, and a locked-down Electron surface."
        />
        <div className="security-grid">
          {securityControls.map((item) => (
            <article className="security-card" key={item.id}>
              <ShieldCheck aria-hidden="true" size={22} />
              <h3>{item.label}</h3>
              <p>{item.control}</p>
              <small>{item.impact}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
