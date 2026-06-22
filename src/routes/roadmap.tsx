import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { phases } from "@/lib/kerberus-data";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap & Investimento — Kerberus v2.0" },
      {
        name: "description",
        content: "Roadmap de crescimento Jul–Dez 2026 e estimativa de investimento por fase.",
      },
      { property: "og:title", content: "Roadmap & Investimento — Kerberus v2.0" },
      { property: "og:description", content: "Crescimento Jul–Dez 2026 e custos." },
    ],
  }),
  component: RoadmapPage,
});

const milestones = [
  { when: "Jul 2026", title: "Kerberus Core operacional", desc: "Proxmox, Docker, Cloudflare Tunnel, NPM, base de dados." },
  { when: "Ago 2026", title: "Kerberus Rede", desc: "Pi-hole, DNS local, monitorização e DHCP de redundância." },
  { when: "Set 2026", title: "Kerberus IA (CPU)", desc: "Ollama, OpenWebUI, Hermes, Mimo, OpenClaw em CPU." },
  { when: "Out 2026", title: "Kerberus Media", desc: "Emby + KMM + catálogos. Storage 1 TB inicial." },
  { when: "Nov 2026", title: "Kerberus Backup", desc: "Backup automatizado de Proxmox, Docker e bases de dados." },
  { when: "Dez 2026", title: "Kerberus Center + GPU", desc: "Estação de comando ativa e RTX 3060 12 GB instalada." },
];

function RoadmapPage() {
  const totalMin = phases.reduce((s, p) => s + p.priceMin, 0);
  const totalMax = phases.reduce((s, p) => s + p.priceMax, 0);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 05"
        title="Roadmap & Investimento"
        description="Plano de crescimento mensal de julho a dezembro de 2026 e estimativa total de custos."
      />
      <PageBody>
        <section>
          <SectionTitle number="05.1" title="Cronograma Jul–Dez 2026" />
          <ol className="relative border-l border-border ml-3 space-y-5">
            {milestones.map((m, i) => (
              <li
                key={m.when}
                className="pl-6 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
                <div className="mono text-[11px] text-accent">{m.when}</div>
                <div className="font-semibold">{m.title}</div>
                <div className="text-sm text-muted-foreground">{m.desc}</div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionTitle number="05.2" title="Estimativa de investimento" />
          <div className="tech-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface-2 text-muted-foreground">
                <tr className="text-left mono text-[11px] uppercase tracking-wider">
                  <th className="px-4 py-3">Fase</th>
                  <th className="px-4 py-3">Hardware</th>
                  <th className="px-4 py-3 text-right">Mín.</th>
                  <th className="px-4 py-3 text-right">Máx.</th>
                </tr>
              </thead>
              <tbody>
                {phases.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-border hover:bg-muted/60 transition-colors"
                  >
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.hardware}</td>
                    <td className="px-4 py-3 text-right mono">{p.priceMin}€</td>
                    <td className="px-4 py-3 text-right mono">{p.priceMax}€</td>
                  </tr>
                ))}
                <tr className="border-t border-border bg-surface-2">
                  <td className="px-4 py-3 font-semibold">Total estimado</td>
                  <td className="px-4 py-3 text-muted-foreground">Sem GPU</td>
                  <td className="px-4 py-3 text-right mono font-semibold">{totalMin}€</td>
                  <td className="px-4 py-3 text-right mono font-semibold">{totalMax}€</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 text-muted-foreground">+ GPU RTX 3060 12 GB</td>
                  <td className="px-4 py-3 text-muted-foreground">Opcional</td>
                  <td className="px-4 py-3 text-right mono">180€</td>
                  <td className="px-4 py-3 text-right mono">180€</td>
                </tr>
                <tr className="border-t border-border bg-surface-2">
                  <td className="px-4 py-3 font-semibold">Total com GPU</td>
                  <td className="px-4 py-3 text-muted-foreground">—</td>
                  <td className="px-4 py-3 text-right mono font-semibold">{totalMin + 180}€</td>
                  <td className="px-4 py-3 text-right mono font-semibold">{totalMax + 180}€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </PageBody>
    </AppShell>
  );
}
