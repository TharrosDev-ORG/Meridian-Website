"use client";

import dynamic from "next/dynamic";

// Dynamically loaded with ssr:false — these components are below the fold or
// render null on server, so skipping SSR reduces initial HTML + JS payload.
export const MemberCounter = dynamic(() => import("@/components/MemberCounter"), { ssr: false });
export const Marquee = dynamic(() => import("@/components/Marquee"), { ssr: false });
export const IndexInteractive = dynamic(() => import("./IndexInteractive"), { ssr: false });
