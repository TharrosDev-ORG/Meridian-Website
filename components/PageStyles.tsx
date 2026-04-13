"use client";

import { useEffect } from "react";

export default function PageStyles({ css }: { css: string }) {
  useEffect(() => {

    // Give DOM time to update, then initialize global Scroll Reveal on the new .rv elements
    if (typeof window !== "undefined" && (window as any).__observeReveal) {
      setTimeout(() => (window as any).__observeReveal(), 50);
    }
  }, [css]);

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
