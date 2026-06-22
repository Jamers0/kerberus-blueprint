import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { proxmoxCluster } from "@/lib/kerberus-data";
import { Server, Boxes, Camera, Archive } from "lucide-react";

export const Route = createFileRoute("/proxmox")({
  head: () => ({
    meta: [
      { title: "Proxmox — Kerberus v2.0" },
      { name: "description", content: "Arquitetura do cluster Proxmox: nós, QDevice, VMs, containers, snapshots e backups." },
      { property: "og:title", content: "Proxmox — Kerberus v2.0" },
      { property: "og:description", content: "Cluster Proxmox do Kerberus." },
    ],
  }),
  component: ProxmoxPage,
});

function ProxmoxPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 03"
        title="Arquitetura Proxmox"
        description="Três nós + QDevice formam o quórum. Cada nó executa VMs e containers LXC com propósito claro, com snapshots e backups distribuídos."
      />
      <PageBody>
        <section>
          <SectionTitle number="03.1" title="Cluster" hint="3 nodes + 1 QDevice" />
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
            {proxmoxCluster.map((n, i) => (
              <article
                key={n.id}
                className="tech-card tech-card-hover p-5 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[10px] uppercase tracking-wider text-accent">
                    {n.role === "QDevice" ? "QDEVICE" : `NODE ${String.fromCharCode(64 + i + 1)}`}
                  </span>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-2 font-semibold">{n.host}</div>
                <div className="mono text-[11px] text-muted-foreground mt-0.5">{n.hardware}</div>

                {n.vms.length > 0 && (
                  <div className="mt-4">
                    <div className="mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      VMs
                    </div>
                    <ul className="space-y-1">
                      {n.vms.map((v) => (
                        <li key={v} className="mono text-xs text-foreground/80">· {v}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3">
                  <div className="mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Containers
                  </div>
                  <ul className="space-y-1">
                    {n.containers.map((c) => (
                      <li key={c} className="mono text-xs text-foreground/80">· {c}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-3">
          <InfoCard
            icon={<Boxes className="h-4 w-4 text-accent" />}
            title="HA e Migração"
            body="VMs críticas (Hermes, PostgreSQL) marcadas como HA migram automaticamente entre Core e IA em falha do nó."
          />
          <InfoCard
            icon={<Camera className="h-4 w-4 text-accent" />}
            title="Snapshots"
            body="Snapshots diários (24h) em cada nó. Retenção de 7 dias local + envio semanal para Kerberus Backup."
          />
          <InfoCard
            icon={<Archive className="h-4 w-4 text-accent" />}
            title="Backups 3-2-1"
            body="3 cópias, 2 mídias (SSD + LaCie), 1 off-site via Cloudflare R2 cifrado."
          />
        </section>
      </PageBody>
    </AppShell>
  );
}

function InfoCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="tech-card p-5">
      <div className="flex items-center gap-2">{icon}<span className="font-semibold text-sm">{title}</span></div>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
