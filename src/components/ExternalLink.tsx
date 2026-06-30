import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

type ExternalLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
  withIcon?: boolean;
}>;

export function ExternalLink({ href, className, children, withIcon = false }: ExternalLinkProps) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      {withIcon ? <ExternalLinkIcon aria-hidden="true" size={16} /> : null}
    </a>
  );
}
