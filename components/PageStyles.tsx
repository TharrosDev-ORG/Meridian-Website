"use client";

import { useEffect } from "react";

interface ExtendedWindow extends Window {
  __observeReveal?: () => void;
}

export default function PageStyles({ css }: { css: string }) {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const win = window as unknown as ExtendedWindow;
    if (typeof window !== "undefined" && win.__observeReveal) {
      timer = setTimeout(() => win.__observeReveal!(), 50);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [css]);

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
