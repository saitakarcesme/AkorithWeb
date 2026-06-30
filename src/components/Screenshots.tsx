import { Images } from "lucide-react";
import { useState } from "react";
import { screenshots } from "../data/screenshots";
import { SectionHeading } from "./SectionHeading";

export function Screenshots() {
  const [activeId, setActiveId] = useState(screenshots[0].id);
  const active = screenshots.find((screenshot) => screenshot.id === activeId) ?? screenshots[0];

  return (
    <section className="section screenshot-section" id="screenshots">
      <div className="container">
        <SectionHeading
          eyebrow="Screenshots"
          title="Real Akorith surfaces, captured from the desktop app"
          body="The gallery uses the current project screenshots from the Akorith repository so the product page shows the actual application, not mockups."
        />

        <div className="screenshot-shell">
          <div className="screenshot-tabs" role="tablist" aria-label="Akorith screenshots">
            {screenshots.map((screenshot) => (
              <button
                key={screenshot.id}
                className={screenshot.id === activeId ? "active" : ""}
                onClick={() => setActiveId(screenshot.id)}
                type="button"
                role="tab"
                aria-selected={screenshot.id === activeId}
              >
                {screenshot.label}
              </button>
            ))}
          </div>
          <figure className="screenshot-frame">
            <img src={active.image} alt={active.title} />
            <figcaption>
              <Images aria-hidden="true" size={18} />
              <span>{active.title}</span>
              <p>{active.description}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
