import { Filter, ListChecks } from "lucide-react";
import { useMemo, useState } from "react";
import { proofCategories, proofLedger } from "../data/content";
import { SectionHeading } from "./SectionHeading";

export function ProofLedger() {
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...proofCategories], []);
  const visible = category === "All" ? proofLedger : proofLedger.filter((item) => item.category === category);

  return (
    <section className="section proof-section" id="proof">
      <div className="container">
        <SectionHeading
          eyebrow="Proof ledger"
          title="Concrete claims behind the product page"
          body="The site includes a structured evidence ledger sourced from the Akorith README, docs, package metadata, and current screenshots."
        />
        <div className="proof-toolbar">
          <div className="filter-label">
            <Filter aria-hidden="true" size={18} />
            <span>Filter</span>
          </div>
          <div className="category-tabs" role="tablist" aria-label="Proof categories">
            {categories.map((item) => (
              <button
                key={item}
                className={item === category ? "active" : ""}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="proof-table" role="table" aria-label="Akorith product proof ledger">
          {visible.map((item) => (
            <article className="proof-row" key={item.id} role="row">
              <div>
                <ListChecks aria-hidden="true" size={18} />
                <span>{item.category}</span>
              </div>
              <strong>{item.label}</strong>
              <em>{item.value}</em>
              <p>{item.detail}</p>
              <small>{item.source}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
