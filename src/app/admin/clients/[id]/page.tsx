import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getClientById,
  getInvoicesForClient,
  getProjectsForClient,
} from "@/lib/admin/mock-data";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const client = getClientById(id);
  return { title: client ? client.company : "Client" };
}

export default async function AdminClientDetailPage({ params }: Props) {
  const { id } = await params;
  const client = getClientById(id);
  if (!client) {
    notFound();
  }
  const projects = getProjectsForClient(client.id);
  const invoices = getInvoicesForClient(client.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Client
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
            {client.company}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            {client.name} · {client.email}
          </p>
        </div>
        <Button type="button" variant="outline" disabled>
          Edit
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total billed</CardDescription>
                <CardTitle className="text-xl tabular-nums">
                  ${client.totalBilled.toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active projects</CardDescription>
                <CardTitle className="text-xl tabular-nums">
                  {client.activeProjects}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Status</CardDescription>
                <CardTitle className="text-xl">
                  <Badge
                    variant={
                      client.status === "ACTIVE" ? "success" : "secondary"
                    }
                  >
                    {client.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {client.tags.length === 0 ? (
                <p className="text-sm text-zinc-500">No tags (mock)</p>
              ) : (
                client.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projects">
          <Card>
            <CardContent className="divide-y divide-zinc-800 p-0">
              {projects.length === 0 ? (
                <p className="p-6 text-sm text-zinc-500">No projects (mock)</p>
              ) : (
                projects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/admin/projects/${p.id}`}
                    className="block px-6 py-4 text-sm text-zinc-200 hover:bg-zinc-800/50"
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-2 text-zinc-500">· {p.status}</span>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invoices">
          <Card>
            <CardContent className="divide-y divide-zinc-800 p-0">
              {invoices.length === 0 ? (
                <p className="p-6 text-sm text-zinc-500">No invoices (mock)</p>
              ) : (
                invoices.map((i) => (
                  <Link
                    key={i.id}
                    href={`/admin/invoices/${i.id}`}
                    className="block px-6 py-4 text-sm hover:bg-zinc-800/50"
                  >
                    <span className="font-medium text-zinc-100">
                      #{i.number}
                    </span>
                    <span className="ml-2 text-zinc-500">
                      ${i.amount.toLocaleString()} · {i.status}
                    </span>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notes</CardTitle>
              <CardDescription>Simple textarea mock</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                className="min-h-32 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                placeholder="Add a note…"
                disabled
              />
              <Button type="button" className="mt-3" disabled>
                Save note
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
