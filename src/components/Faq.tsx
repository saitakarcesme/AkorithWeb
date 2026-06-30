import { faqItems } from "../data/content";
import { SectionHeading } from "./SectionHeading";

export function Faq() {
  return (
    <section className="section faq-section">
      <div className="container">
        <SectionHeading
          eyebrow="FAQ"
          title="Plain answers for first-time users"
          body="The copy stays direct about downloads, credentials, local data, and release limitations."
        />
        <div className="faq-list">
          {faqItems.map((item) => (
            <details key={item.id}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
