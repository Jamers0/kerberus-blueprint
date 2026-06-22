import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { jarvisFlow } from "@/lib/kerberus-data";
import { Mic, Sparkles, Volume2 } from "lucide-react";

export const Route = createFileRoute("/jarvis")({
  head: () => ({
    meta: [
      { title: "Jarvis Mode — Kerberus v2.0" },
      { name: "description", content: "Fluxo de voz residencial do Kerberus: Alexa → Hermes → Mimo → Ollama → resposta. Totalmente local." },
      { property: "og:title", content: "Jarvis Mode — Kerberus v2.0" },
      { property: "og:description", content: "Pipeline de voz local do Kerberus." },
    ],
  }),
  component: JarvisPage,
});

function JarvisPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 09"
        title="Jarvis Mode"
        description="Pipeline de voz residencial 100% local. Sem cloud, sem terceiros — apenas a casa a responder a si própria."
      />
      <PageBody>
        <section className="relative overflow-hidden rounded-xl border border-border bg-surface">
          <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden />
          <div className="relative grid lg:grid-cols-3 gap-6 p-8">
            <Pill icon={<Mic className="h-4 w-4 text-accent" />} title="Entrada" body="Alexa · Nest · Mic Local · VLAN Voice (10.10.50.0/24)" />
            <Pill icon={<Sparkles className="h-4 w-4 text-accent" />} title="Processamento" body="Whisper · Hermes · Mimo · Ollama — tudo on-prem" />
            <Pill icon={<Volume2 className="h-4 w-4 text-accent" />} title="Saída" body="Piper TTS · resposta no dispositivo original em <2s" />
          </div>
        </section>

        <section>
          <SectionTitle number="09.1" title="Pipeline ponta-a-ponta" />
          <ol className="relative border-l border-accent/40 ml-3 space-y-4">
            {jarvisFlow.map((s, i) => (
              <li
                key={s.step}
                className="pl-6 animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-background pulse-dot" />
                <div className="mono text-[11px] text-accent">PASSO {String(i + 1).padStart(2, "0")} · {s.step}</div>
                <div className="font-semibold mt-0.5">{s.actor}</div>
                <div className="text-sm text-muted-foreground">{s.note}</div>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid md:grid-cols-3 gap-3">
          <Stat label="Latência alvo" value="< 2 s" sub="captura → resposta" />
          <Stat label="Privacidade" value="100% local" sub="zero cloud audio" />
          <Stat label="Dispositivos" value="Alexa · Nest · Mic" sub="VLAN 60 (Voice)" />
        </section>
      </PageBody>
    </AppShell>
  );
}

function Pill({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="tech-card p-5">
      <div className="flex items-center gap-2">{icon}<span className="font-semibold text-sm">{title}</span></div>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="tech-card p-5">
      <div className="mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
}
