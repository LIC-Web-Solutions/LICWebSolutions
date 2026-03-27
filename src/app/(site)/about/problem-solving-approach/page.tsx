import type { Metadata } from "next";

import { ProblemSolvingApproachPage } from "@/components/site/AboutPages";

export const metadata: Metadata = {
  title: "Problem Solving Approach",
  description:
    "How LIC Web Solutions moves from alignment to launch with a clear, repeatable framework.",
};

export default function Page() {
  return <ProblemSolvingApproachPage />;
}
