export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--cream)",
      }}
      aria-label="Loading page"
      role="status"
    >
      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--ink-75)",
        }}
      >
        Loading&hellip;
      </p>
    </div>
  );
}
