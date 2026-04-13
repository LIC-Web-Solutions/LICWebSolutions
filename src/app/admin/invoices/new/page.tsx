import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "New invoice",
};

export default function AdminNewInvoicePage() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>New invoice</CardTitle>
        <CardDescription>
          Full create flow is not wired — use an existing mock invoice to demo
          the editor.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button type="button" asChild>
          <Link href="/admin/invoices/i2">Open sample invoice</Link>
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/invoices">Back to list</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
