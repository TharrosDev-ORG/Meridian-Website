"use client";

import { useEffect } from "react";

interface ExtendedWindow extends Window {
  __observeReveal?: () => void;
}

export default function PageStyles({ css }: { css: string }) {
  useEffect(() => {

    // Give DOM time to update, then initialize global Scroll Reveal on the new .rv elements
    const win = window as unknown as ExtendedWindow;
    if (typeof window !== "undefined" && win.__observeReveal) {
      setTimeout(() => win.__observeReveal!(), 50);
    }
  }, [css]);

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
