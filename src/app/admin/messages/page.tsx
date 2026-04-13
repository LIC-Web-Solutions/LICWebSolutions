import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Messages",
};

export default function AdminMessagesPage() {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>
          Phase 2 — inbox and threads are not implemented. This route reserves
          the nav slot for a future client communications hub.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-zinc-500">
        When shipped, expect thread list, previews, and a chat-style detail view
        per the agency dashboard spec.
      </CardContent>
    </Card>
  );
}
