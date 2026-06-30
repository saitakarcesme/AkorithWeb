export type ProofItem = {
  id: string;
  category: string;
  label: string;
  value: string;
  detail: string;
  source: string;
};

export type SecurityControl = {
  id: string;
  label: string;
  control: string;
  impact: string;
};

export type ReleaseCheck = {
  id: string;
  area: string;
  status: string;
  detail: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

function sortedValues<T extends { id: string }>(modules: Record<string, T>) {
  return Object.values(modules).sort((a, b) => a.id.localeCompare(b.id));
}

const proofModules = import.meta.glob("../content/proof-ledger/*.json", {
  eager: true,
  import: "default"
}) as Record<string, ProofItem>;

const securityModules = import.meta.glob("../content/security-controls/*.json", {
  eager: true,
  import: "default"
}) as Record<string, SecurityControl>;

const releaseModules = import.meta.glob("../content/release-checks/*.json", {
  eager: true,
  import: "default"
}) as Record<string, ReleaseCheck>;

const faqModules = import.meta.glob("../content/faq/*.json", {
  eager: true,
  import: "default"
}) as Record<string, FaqItem>;

export const proofLedger = sortedValues(proofModules);
export const securityControls = sortedValues(securityModules);
export const releaseChecks = sortedValues(releaseModules);
export const faqItems = sortedValues(faqModules);

export const proofCategories = Array.from(new Set(proofLedger.map((item) => item.category)));
