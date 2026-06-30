import { useEffect, useState } from "react";

export type OsGuess = "mac" | "windows" | "source";

export function useOsGuess() {
  const [os, setOs] = useState<OsGuess>("source");

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();

    if (platform.includes("mac")) {
      setOs("mac");
    } else if (platform.includes("win") || userAgent.includes("windows")) {
      setOs("windows");
    }
  }, []);

  return [os, setOs] as const;
}
