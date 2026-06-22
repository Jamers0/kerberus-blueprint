import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { ArrowRight, Mic, Bot, Network } from "lucide-react";
import { hermesInputs, hermesTools, hermesOutputs } from "@/lib/kerberus-data";

export const Route = createFileRoute("/flows")({
  head: () => ({
    meta: [
      { title: "Fluxos — Kerberus v2.0" },
      {
        name: "description",
        content: "Fluxos de voz, agentes e do Hermes — coração de orquestração do Kerberus.",
      },
      { property: "og:title", content: "Fluxos — Kerberus v2.0" },
      { property: "og:description", content: "Voz, agentes e Hermes." },
    ],
  }),
  component: FlowsPage,
});

const voiceSteps = [
  { label: "Alexa / Nest", sub: "Captura (VLAN Voice)" },
  { label: "Voice Gateway", sub: "Normalização" },
  { label: "Whisper", sub: "STT local" },
  { label: "Ollama", sub: "LLM local" },
  { label: "Piper", sub: "TTS local" },
  { label: "Dispositivo", sub: "Resposta áudio" },
];

const agentSteps = [
  { label: "Utilizador / Trigger", sub: "Chat, cron, webhook" },
  { label: "Hermes", sub: "Orquestrador" },
  { label: "Mimo", sub: "Memória & contexto" },
  { label: "OpenClaw", sub: "Execução de ferramentas" },
  { label: "Serviços", sub: "PostgreSQL · Redis · APIs" },
];

function FlowsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 04"
        title="Fluxos"
        description="Pipelines de voz, agentes e Hermes. Tudo processado localmente quando possível."
      />
      <PageBody>
        <FlowSection number="04.1" title="Fluxo de voz" icon={<Mic className="h-4 w-4 text-accent" />} steps={voiceSteps} />
        <FlowSection number="04.2" title="Fluxo dos agentes" icon={<Bot className="h-4 w-4 text-accent" />} steps={agentSteps} />

        {/* Hermes flow */}
        <section>
          <SectionTitle number="04.3" title="Fluxo do Hermes" hint="Coração do projeto" />
          <div className="tech-card p-6">
            <div className="flex items-center gap-2 mb-5 text-sm text-muted-foreground">
              <Network className="h-4 w-4 text-accent" />
              <span>Orquestração ponta-a-ponta</span>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4">
              <Column title="Entradas" items={hermesInputs} />
              <Arrow />
              <div className="space-y-3">
                <div className="rounded-md bg-primary text-primary-foreground px-4 py-3 text-center">
                  <div className="mono text-[10px] uppercase tracking-wider opacity-80">Núcleo</div>
                  <div className="font-semibold">Hermes</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {hermesTools.map((t) => (
                    <div key={t.name} className="rounded-md border border-border bg-surface p-2 text-center">
                      <div className="font-semibold text-xs">{t.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Arrow />
              <Column title="Saídas" items={hermesOutputs} />
            </div>
          </div>
        </section>
      </PageBody>
    </AppShell>
  );
}

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{title}</div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li
            key={it}
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm animate-fade-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <ArrowRight className="h-5 w-5 text-accent" />
    </div>
  );
}

function FlowSection({
  number,
  title,
  icon,
  steps,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  steps: { label: string; sub: string }[];
}) {
  return (
    <section>
      <SectionTitle number={number} title={title} />
      <div className="tech-card p-6">
        <div className="flex items-center gap-2 mb-5 text-sm text-muted-foreground">
          {icon}
          <span>Pipeline ponta-a-ponta</span>
        </div>
        <ol className="flex flex-wrap items-stretch gap-3">
          {steps.map((s, i) => (
            <li
              key={s.label}
              className="flex items-center gap-3 animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="rounded-md border border-border bg-surface px-4 py-3 min-w-[140px]">
                <div className="mono text-[10px] text-accent">PASSO {i + 1}</div>
                <div className="font-medium text-sm mt-0.5">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
