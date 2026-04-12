"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function PortalHeader() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/15 px-6 py-4">
      <Link
        href="/"
        className="text-sm font-medium opacity-90 transition-opacity hover:opacity-100"
      >
        ← LIC Web Solutions
      </Link>
      <UserButton />
    </header>
  );
}
