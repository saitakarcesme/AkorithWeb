import { Apple, Download, GitBranch, MonitorDown, PackageOpen, Terminal } from "lucide-react";
import { downloads, setupSteps } from "../data/downloads";
import { useOsGuess, type OsGuess } from "../hooks/useOsGuess";
import { links } from "../utils/links";
import { ExternalLink } from "./ExternalLink";
import { SectionHeading } from "./SectionHeading";

const icons = {
  mac: Apple,
  windows: MonitorDown,
  source: PackageOpen
};

export function DownloadSection() {
  const [selected, setSelected] = useOsGuess();
  const active = downloads.find((download) => download.id === selected) ?? downloads[0];
  const ActiveIcon = icons[active.id as OsGuess];

  return (
    <section className="section download-section" id="download">
      <div className="container">
        <SectionHeading
          eyebrow="Download"
          title="Get Akorith from the channel that matches your machine"
          body="Installer artifacts are routed through GitHub Releases. The source ZIP is available today and includes the setup scripts used by the desktop app."
        />

        <div className="download-layout">
          <div className="download-picker" role="tablist" aria-label="Download options">
            {downloads.map((download) => {
              const Icon = icons[download.id as OsGuess];
              const isActive = download.id === selected;
              return (
                <button
                  key={download.id}
                  className={isActive ? "download-tab active" : "download-tab"}
                  onClick={() => setSelected(download.id as OsGuess)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                >
                  <Icon aria-hidden="true" size={20} />
                  <span>{download.title}</span>
                  <small>{download.subtitle}</small>
                </button>
              );
            })}
          </div>

          <div className="download-panel" role="tabpanel">
            <div className="download-panel-header">
              <ActiveIcon aria-hidden="true" size={34} />
              <div>
                <p className="eyebrow">{active.subtitle}</p>
                <h3>{active.title}</h3>
              </div>
            </div>
            <p>{active.body}</p>
            <ExternalLink className="button button-primary" href={active.href}>
              <Download aria-hidden="true" size={20} />
              <span>{active.cta}</span>
            </ExternalLink>
            <small>{active.meta}</small>
          </div>

          <div className="setup-panel">
            <div className="download-panel-header">
              <Terminal aria-hidden="true" size={32} />
              <div>
                <p className="eyebrow">Setup path</p>
                <h3>From source to first workspace</h3>
              </div>
            </div>
            <ol>
              {setupSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="inline-actions">
              <ExternalLink className="text-link" href={links.installDocs} withIcon>
                Install docs
              </ExternalLink>
              <ExternalLink className="text-link" href={links.releases} withIcon>
                Releases
              </ExternalLink>
              <ExternalLink className="text-link" href={links.productRepo} withIcon>
                <GitBranch aria-hidden="true" size={16} />
                Source
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
