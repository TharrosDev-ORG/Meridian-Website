"use client";

import { useEffect, useState } from "react";

const MEMBER_COUNT_URL =
  "https://script.google.com/macros/s/AKfycbx12Z8U8xQUYUHYLZkgVBlzGvhvx2uqSd1WBJNBBQcP0vlbrGzxJFfqi8QWnQVHyiKS/exec";

export default function MemberCount() {
  const [count, setCount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(MEMBER_COUNT_URL)
      .then((r) => r.json())
      .then((d) => {
        if (d && typeof d.count === "number") {
          setCount(String(d.count));
        }
      })
      .catch(() => {
        console.warn("Member count unavailable");
        setCount("\u2014");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div
      className="member-count-box rv"
      data-d="1"
      id="memberCountBox"
      aria-live="polite"
    >
      <span className="member-count-num" id="memberCountNum">
        {isLoading ? <span className="member-count-shimmer" aria-hidden="true" /> : count}
      </span>
      <span className="member-count-lbl">Members Registered</span>
    </div>
  );
}
