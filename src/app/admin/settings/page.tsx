import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Settings",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Mock forms — integrations are non-functional stubs.
        </p>
      </div>
      <Tabs defaultValue="profile">
        <TabsList className="flex h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="agency">Agency</TabsTrigger>
          <TabsTrigger value="billing">Billing defaults</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid max-w-md gap-4">
              <div>
                <p className="text-xs text-zinc-500">Name</p>
                <Input className="mt-1" placeholder="Your name" disabled />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Email</p>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="you@lic.example"
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="agency">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Agency</CardTitle>
            </CardHeader>
            <CardContent className="grid max-w-md gap-4">
              <div>
                <p className="text-xs text-zinc-500">Agency name</p>
                <Input
                  className="mt-1"
                  defaultValue="LIC Web Solutions"
                  disabled
                />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Default currency</p>
                <Input className="mt-1" defaultValue="USD" disabled />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing defaults</CardTitle>
            </CardHeader>
            <CardContent className="grid max-w-md gap-4">
              <div>
                <p className="text-xs text-zinc-500">Payment terms</p>
                <Input className="mt-1" defaultValue="Net 15" disabled />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Tax rate %</p>
                <Input className="mt-1" defaultValue="8" disabled />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="integrations">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Stripe", "QuickBooks", "Google Calendar"].map((name) => (
              <Card key={name}>
                <CardHeader>
                  <CardTitle className="text-base">{name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <button
                    type="button"
                    className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 opacity-60"
                    disabled
                  >
                    Connect
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
