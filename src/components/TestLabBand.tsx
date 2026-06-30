import { FlaskConical, Gauge, ScrollText } from "lucide-react";
import { releaseChecks } from "../data/content";
import { SectionHeading } from "./SectionHeading";

export function TestLabBand() {
  return (
    <section className="section testlab-section">
      <div className="container">
        <SectionHeading
          eyebrow="Validation"
          title="Test Lab and release checks are part of the product story"
          body="Akorith is aimed at real development workflows, so the site foregrounds test generation, sandbox execution, PDF reporting, and release-readiness checks."
        />
        <div className="testlab-layout">
          <div className="testlab-feature">
            <FlaskConical aria-hidden="true" size={32} />
            <h3>Model Test Lab</h3>
            <p>
              Generate tests from bounded repo context, run them in a sandbox, repair failing output
              once, and export scored PDF reports from the desktop app.
            </p>
          </div>
          <div className="release-checks">
            {releaseChecks.map((check) => (
              <article className="release-check" key={check.id}>
                <Gauge aria-hidden="true" size={18} />
                <strong>{check.area}</strong>
                <span>{check.status}</span>
                <p>{check.detail}</p>
              </article>
            ))}
          </div>
          <div className="testlab-note">
            <ScrollText aria-hidden="true" size={28} />
            <p>
              Release messaging stays honest: unsigned builds may warn users until signing and
              notarization are configured.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
