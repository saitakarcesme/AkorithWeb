import { Download, GitBranch, ShieldCheck } from "lucide-react";
import { navItems } from "../data/navigation";
import { useActiveSection } from "../hooks/useActiveSection";
import { withBase } from "../utils/assets";
import { links } from "../utils/links";
import { ExternalLink } from "./ExternalLink";

const sectionIds = navItems.map((item) => item.href.slice(1));

export function Header() {
  const active = useActiveSection(sectionIds);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Akorith home">
        <img src={withBase("images/brand/akorith-icon.svg")} alt="" />
        <span>Akorith</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => {
          const id = item.href.slice(1);
          return (
            <a key={item.href} href={item.href} aria-current={active === id ? "page" : undefined}>
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="header-actions">
        <ExternalLink className="icon-link" href={links.productRepo}>
          <GitBranch aria-hidden="true" size={18} />
          <span>GitHub</span>
        </ExternalLink>
        <a className="button button-primary header-download" href="#download">
          <Download aria-hidden="true" size={18} />
          <span>Download</span>
        </a>
        <a className="trust-pill" href="#security">
          <ShieldCheck aria-hidden="true" size={16} />
          <span>No API keys stored</span>
        </a>
      </div>
    </header>
  );
}
