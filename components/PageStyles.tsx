// Server component: emits an inline <style> tag from a per-page CSS string.
// No "use client" — page-scoped CSS ships in the SSR HTML and is parsed
// before hydration, eliminating a client-side hydration boundary on every
// route that uses page-local styles. The reveal observer in Providers.tsx
// already picks up SSR'd .rv elements on mount, so no JS hook is needed.
export default function PageStyles({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
