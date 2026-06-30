import { ArrowRight } from "lucide-react";
import { roadmap } from "../data/roadmap";
import { links } from "../utils/links";
import { ExternalLink } from "./ExternalLink";
import { SectionHeading } from "./SectionHeading";

export function Roadmap() {
  return (
    <section className="section roadmap-section">
      <div className="container">
        <SectionHeading
          eyebrow="Roadmap"
          title="A public launch path that does not overpromise"
          body="The site presents what users can do today and where the release pipeline is heading next."
        />
        <div className="roadmap-grid">
          {roadmap.map((item) => (
            <article className="roadmap-item" key={item.phase}>
              <span>{item.phase}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <ExternalLink className="button button-secondary roadmap-link" href={links.packagingDocs}>
          <span>Read packaging notes</span>
          <ArrowRight aria-hidden="true" size={18} />
        </ExternalLink>
      </div>
    </section>
  );
}
