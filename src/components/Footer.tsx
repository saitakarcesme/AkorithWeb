import { GitBranch, ShieldCheck } from "lucide-react";
import { links } from "../utils/links";
import { ExternalLink } from "./ExternalLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <strong>Akorith</strong>
          <p>Local-first Agent OS for AI coding workflows.</p>
        </div>
        <div className="footer-links">
          <ExternalLink href={links.productRepo}>
            <GitBranch aria-hidden="true" size={16} />
            <span>Product repo</span>
          </ExternalLink>
          <ExternalLink href={links.webRepo}>
            <GitBranch aria-hidden="true" size={16} />
            <span>Website repo</span>
          </ExternalLink>
          <a href="#security">
            <ShieldCheck aria-hidden="true" size={16} />
            <span>Security posture</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
