import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { ArrowRight, Mic, Bot } from "lucide-react";

export const Route = createFileRoute("/flows")({
  head: () => ({
    meta: [
      { title: "Fluxos — Kerberus v2.0" },
      {
        name: "description",
        content: "Fluxo de voz (Alexa/Nest → Whisper → Ollama → Piper) e fluxo dos agentes Hermes/Mimo/OpenClaw.",
      },
      { property: "og:title", content: "Fluxos — Kerberus v2.0" },
      { property: "og:description", content: "Voz + agentes de IA." },
    ],
  }),
  component: FlowsPage,
});

const voiceSteps = [
  { label: "Alexa / Nest", sub: "Captura áudio (VLAN Voice)" },
  { label: "Voice Gateway", sub: "Normalização + roteamento" },
  { label: "Whisper", sub: "STT local" },
  { label: "Ollama", sub: "LLM local" },
  { label: "Piper", sub: "TTS local" },
  { label: "Dispositivo", sub: "Resposta de áudio" },
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
        description="Pipelines de voz e de agentes de IA, todos processados localmente quando possível."
      />
      <PageBody>
        <FlowSection
          number="04.1"
          title="Fluxo de voz"
          icon={<Mic className="h-4 w-4 text-accent" />}
          steps={voiceSteps}
        />
        <FlowSection
          number="04.2"
          title="Fluxo dos agentes"
          icon={<Bot className="h-4 w-4 text-accent" />}
          steps={agentSteps}
        />
      </PageBody>
    </AppShell>
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
