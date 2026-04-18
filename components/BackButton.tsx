"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={() => router.back()}
      aria-label="Go back to previous page"
    >
      <span style={{ fontSize: "14px" }}>←</span> Go Back
    </button>
  );
}
