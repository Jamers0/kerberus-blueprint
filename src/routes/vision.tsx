import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Visão Final — Kerberus v2.0" },
      { name: "description", content: "O propósito do projeto Kerberus: infraestrutura pessoal distribuída, soberana e em evolução contínua." },
      { property: "og:title", content: "Visão Final — Kerberus v2.0" },
      { property: "og:description", content: "Propósito e ambição do projeto." },
    ],
  }),
  component: VisionPage,
});

const pillars = [
  "Hospedar serviços próprios",
  "Gerir mídia",
  "Executar IA local",
  "Operar agentes autónomos",
  "Integrar voz residencial",
  "Automatizar tarefas",
  "Servir como laboratório de estudos",
  "Evoluir continuamente sem dependência de cloud",
];

function VisionPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Manifesto"
        title="Visão Final do Projeto"
        description="A razão de existir do Kerberus. Não é uma lista de PCs — é uma plataforma pessoal com propósito."
      />
      <PageBody>
        <section className="relative overflow-hidden rounded-xl border border-border bg-surface">
          <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden />
          <div className="relative p-8 lg:p-12">
            <div className="chip mb-4">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Objetivo
            </div>
            <h2 className="text-2xl lg:text-3xl font-semibold max-w-3xl">
              Criar uma infraestrutura pessoal distribuída, soberana e inteligente —
              capaz de evoluir sem depender de fornecedores externos.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Toda decisão técnica do Kerberus parte deste princípio: modularidade,
              localidade de dados e crescimento contínuo.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number="00" title="Pilares" hint={`${pillars.length} compromissos`} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pillars.map((p, i) => (
              <div
                key={p}
                className="tech-card tech-card-hover p-5 animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="mono text-[10px] uppercase tracking-wider text-accent">
                  Pilar {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-medium">{p}</div>
              </div>
            ))}
          </div>
        </section>
      </PageBody>
    </AppShell>
  );
}
