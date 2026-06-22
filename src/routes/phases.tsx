import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader } from "@/components/AppShell";
import { phases } from "@/lib/kerberus-data";
import { Cpu, HardDrive, Tag } from "lucide-react";

export const Route = createFileRoute("/phases")({
  head: () => ({
    meta: [
      { title: "Fases — Kerberus v2.0" },
      {
        name: "description",
        content: "As 6 fases do projeto Kerberus v2.0: Core, Rede, IA, Media, Backup e Center.",
      },
      { property: "og:title", content: "Fases — Kerberus v2.0" },
      { property: "og:description", content: "Detalhamento das 6 fases do projeto." },
    ],
  }),
  component: PhasesPage,
});

const priorityStyle: Record<string, string> = {
  "MUITO ALTA": "text-destructive border-destructive/30 bg-destructive/5",
  ALTA: "text-warning border-warning/30 bg-warning/5",
  "MÉDIA": "text-info border-info/30 bg-info/5",
  BAIXA: "text-muted-foreground bg-muted",
};

function PhasesPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 01"
        title="Fases do Projeto"
        description="Cada fase corresponde a um nó físico com propósito claro, serviços associados e prioridade de implementação."
      />
      <PageBody>
        <div className="grid gap-4">
          {phases.map((p, i) => (
            <article
              key={p.id}
              id={p.id}
              className="tech-card tech-card-hover p-6 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
                {/* Left meta */}
                <div className="border-r-0 lg:border-r border-border lg:pr-6">
                  <div className="flex items-center justify-between">
                    <span className="mono text-[11px] text-accent">FASE {p.number}</span>
                    <span
                      className={`mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${priorityStyle[p.priority]}`}
                    >
                      {p.priority}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mt-2">{p.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{p.role}</p>

                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <dt className="mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          Hardware
                        </dt>
                        <dd>{p.hardware}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Cpu className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <dt className="mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          Specs
                        </dt>
                        <dd className="mono text-xs text-foreground/80">
                          {p.specs.join(" · ")}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <dt className="mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          Investimento
                        </dt>
                        <dd className="mono">
                          {p.priceMin === p.priceMax
                            ? `${p.priceMin}€`
                            : `${p.priceMin}€ – ${p.priceMax}€`}
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                {/* Right services */}
                <div>
                  <div className="mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                    Serviços
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="mono text-xs px-2 py-1 rounded-md border border-border bg-surface-2 hover:border-accent/50 hover:text-foreground transition"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {p.notes && (
                    <p className="mt-4 text-sm text-muted-foreground border-l-2 border-accent/40 pl-3">
                      {p.notes}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageBody>
    </AppShell>
  );
}
