import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { phases, vlans } from "@/lib/kerberus-data";
import {
  ArrowRight,
  Cpu,
  Network,
  Workflow,
  ShieldCheck,
  Layers,
  Globe2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kerberus v2.0 — Visão Geral" },
      {
        name: "description",
        content:
          "Visão geral do projeto Kerberus v2.0: 6 fases, infraestrutura técnica, VLANs, fluxos de IA, voz e roadmap 2026.",
      },
      { property: "og:title", content: "Kerberus v2.0 — Visão Geral" },
      {
        property: "og:description",
        content: "Documentação oficial do projeto Kerberus v2.0.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const totalMin = phases.reduce((s, p) => s + p.priceMin, 0);
  const totalMax = phases.reduce((s, p) => s + p.priceMax, 0);

  const highlights = [
    { icon: Layers, label: "Fases", value: `${phases.length}`, to: "/phases" },
    { icon: Network, label: "VLANs", value: `${vlans.length}`, to: "/network" },
    { icon: Workflow, label: "Fluxos", value: "Voz + Agentes", to: "/flows" },
    { icon: ShieldCheck, label: "Segurança", value: "Zero Trust", to: "/security" },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Projeto · kerberus.uk"
        title="Kerberus v2.0"
        description="Documentação técnica oficial. Infraestrutura modular em 6 fases, com isolamento por VLAN, Cloudflare Zero Trust, IA local e plano de crescimento até dezembro de 2026."
      />

      <PageBody>
        {/* Hero block with blueprint */}
        <section className="relative overflow-hidden rounded-xl border border-border bg-surface">
          <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden />
          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-8 p-8 lg:p-10">
            <div>
              <div className="chip mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Ativo · Roadmap Jul–Dez 2026
              </div>
              <h2 className="text-2xl font-semibold">
                Arquitetura homelab de classe profissional
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Seis nós dedicados, segmentação de rede por VLAN, túneis Cloudflare,
                IA local com Ollama e agentes, monitorização contínua e estratégia de
                backup multi-camada.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/phases"
                  className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
                >
                  Explorar fases <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/topology"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm hover:border-border-strong transition"
                >
                  <Network className="h-4 w-4" /> Ver topologia
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, label, value, to }, i) => (
                <Link
                  key={label}
                  to={to}
                  className="tech-card tech-card-hover p-4 animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Icon className="h-4 w-4 text-accent" />
                  <div className="mt-2 text-[11px] mono uppercase tracking-wider text-muted-foreground">
                    {label}
                  </div>
                  <div className="text-lg font-semibold">{value}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Phases preview */}
        <section>
          <SectionTitle number="01" title="Fases do projeto" hint="6 nós dedicados" />
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
            {phases.map((p, i) => (
              <Link
                key={p.id}
                to="/phases"
                hash={p.id}
                className="tech-card tech-card-hover p-5 animate-fade-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] text-accent">FASE {p.number}</span>
                  <PriorityChip priority={p.priority} />
                </div>
                <div className="mt-2 font-semibold">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.role}</div>
                <div className="mt-3 flex items-center gap-2 text-xs mono text-muted-foreground">
                  <Cpu className="h-3.5 w-3.5" /> {p.hardware}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Investment summary */}
        <section className="tech-card p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Investimento estimado
              </div>
              <div className="text-3xl font-semibold mt-1">
                {totalMin}€ <span className="text-muted-foreground text-xl">–</span> {totalMax}€
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Sem GPU dedicada (RTX 3060 12 GB ≈ 180€ adicional)
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs mono text-muted-foreground">
              <Globe2 className="h-3.5 w-3.5" /> Uplink 10 Gbps · ZTE F8748 · MikroTik CSS610
            </div>
          </div>
        </section>
      </PageBody>
    </AppShell>
  );
}

function PriorityChip({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    "MUITO ALTA": "text-destructive border-destructive/30 bg-destructive/5",
    ALTA: "text-warning border-warning/30 bg-warning/5",
    "MÉDIA": "text-info border-info/30 bg-info/5",
    BAIXA: "text-muted-foreground",
  };
  return (
    <span
      className={`mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-border ${map[priority] ?? ""}`}
    >
      {priority}
    </span>
  );
}
