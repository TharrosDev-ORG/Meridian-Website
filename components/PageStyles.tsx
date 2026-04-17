"use client";

import { useEffect } from "react";

interface ExtendedWindow extends Window {
  __observeReveal?: () => void;
}

export default function PageStyles({ css }: { css: string }) {
  useEffect(() => {
    let rafId: number;
    const win = window as unknown as ExtendedWindow;
    if (typeof window !== "undefined" && win.__observeReveal) {
      // Use requestAnimationFrame to ensure styles are applied before reveal
      rafId = requestAnimationFrame(() => {
        if (win.__observeReveal) win.__observeReveal();
      });
    }
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [css]);

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
