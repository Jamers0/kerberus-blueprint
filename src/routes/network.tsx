import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { vlans, subdomains } from "@/lib/kerberus-data";

export const Route = createFileRoute("/network")({
  head: () => ({
    meta: [
      { title: "VLANs & IP — Kerberus v2.0" },
      {
        name: "description",
        content:
          "Plano de endereçamento IP, VLANs e subdomínios públicos via Cloudflare Tunnel.",
      },
      { property: "og:title", content: "VLANs & IP — Kerberus v2.0" },
      { property: "og:description", content: "Endereçamento e subdomínios." },
    ],
  }),
  component: NetworkPage,
});

function NetworkPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 03"
        title="VLANs & Endereçamento"
        description="Segmentação por VLAN como princípio base. Cada zona tem propósito, CIDR e política dedicados."
      />
      <PageBody>
        <section>
          <SectionTitle number="03.1" title="Plano de VLANs" hint="10.10.0.0/16 · /24 por zona" />
          <div className="grid md:grid-cols-2 gap-3">
            {vlans.map((v, i) => (
              <div
                key={v.id}
                className="tech-card tech-card-hover p-5 animate-fade-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] text-accent">VLAN {v.id}</span>
                  <span className="mono text-xs text-muted-foreground">{v.cidr}</span>
                </div>
                <div className="mt-1 font-semibold">{v.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{v.purpose}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle number="03.2" title="Subdomínios públicos" hint="Cloudflare Tunnel + NPM" />
          <div className="tech-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface-2 text-muted-foreground">
                <tr className="text-left mono text-[11px] uppercase tracking-wider">
                  <th className="px-4 py-3">Hostname</th>
                  <th className="px-4 py-3">Serviço</th>
                  <th className="px-4 py-3">Fase</th>
                </tr>
              </thead>
              <tbody>
                {subdomains.map((s) => (
                  <tr
                    key={s.host}
                    className="border-t border-border hover:bg-muted/60 transition-colors"
                  >
                    <td className="px-4 py-3 mono text-xs">{s.host}</td>
                    <td className="px-4 py-3">{s.target}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.phase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </PageBody>
    </AppShell>
  );
}
