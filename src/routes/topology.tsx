import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { cableMap } from "@/lib/kerberus-data";

export const Route = createFileRoute("/topology")({
  head: () => ({
    meta: [
      { title: "Topologia — Kerberus v2.0" },
      {
        name: "description",
        content:
          "Topologia de rede do Kerberus v2.0 organizada por camadas: WAN, distribuição, núcleo e VLANs.",
      },
      { property: "og:title", content: "Topologia — Kerberus v2.0" },
      {
        property: "og:description",
        content: "Diagrama por camadas + mapa de cabos porta a porta.",
      },
    ],
  }),
  component: TopologyPage,
});

/* Layout grid for clarity — fixed coordinates so nothing overlaps */
const NODE_W = 160;
const NODE_H = 56;

const layers = [
  { y: 40, label: "WAN", nodes: [{ x: 420, label: "Uplink 10 Gbps", sub: "Fibra · 10 Gbps" }] },
  { y: 150, label: "ROUTER", nodes: [{ x: 420, label: "ZTE F8748", sub: "Router · Gateway L3" }] },
  {
    y: 260,
    label: "SWITCH",
    nodes: [{ x: 420, label: "MikroTik CSS610", sub: "Switch L2 · SFP+ / 1 G" }],
  },
];

const coreNodes = [
  { id: "core", x: 40, y: 420, label: "Kerberus Core", tag: "VLAN 30" },
  { id: "rede", x: 220, y: 420, label: "Kerberus Rede", tag: "VLAN 30" },
  { id: "ia", x: 400, y: 420, label: "Kerberus IA", tag: "VLAN 30" },
  { id: "media", x: 580, y: 420, label: "Kerberus Media", tag: "VLAN 30" },
  { id: "backup", x: 760, y: 420, label: "Kerberus Backup", tag: "VLAN 30" },
  { id: "center", x: 940, y: 420, label: "Kerberus Center", tag: "VLAN 20" },
];

const VIEW_W = 1140;
const VIEW_H = 560;

function TopologyPage() {
  // switch center
  const switchCx = 420 + NODE_W / 2;
  const switchBottomY = 260 + NODE_H;
  const busY = 360;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 02"
        title="Topologia de Rede"
        description="Diagrama por camadas (estilo Cisco), com WAN, router, switch e núcleo de servidores separados em VLANs."
      />
      <PageBody>
        <section className="tech-card p-4 lg:p-6 overflow-x-auto">
          <SectionTitle title="Diagrama lógico" hint="Camadas alinhadas · sem sobreposição" />

          <div className="min-w-[900px]">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="w-full h-auto"
              role="img"
              aria-label="Topologia de rede Kerberus v2.0"
            >
              {/* Subtle grid */}
              <defs>
                <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path
                    d="M 28 0 L 0 0 0 28"
                    fill="none"
                    stroke="oklch(0.92 0.008 240)"
                    strokeWidth="1"
                  />
                </pattern>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(0.62 0.13 220)" />
                </marker>
              </defs>
              <rect width={VIEW_W} height={VIEW_H} fill="url(#grid)" opacity="0.5" />

              {/* Layer labels (left) */}
              {layers.map((l) => (
                <text
                  key={l.label}
                  x={16}
                  y={l.y + NODE_H / 2 + 4}
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                  fill="oklch(0.48 0.02 250)"
                  letterSpacing="2"
                >
                  {l.label}
                </text>
              ))}
              <text
                x={16}
                y={busY - 8}
                fontFamily="JetBrains Mono, monospace"
                fontSize="10"
                fill="oklch(0.48 0.02 250)"
                letterSpacing="2"
              >
                VLAN BUS
              </text>
              <text
                x={16}
                y={420 + NODE_H / 2 + 4}
                fontFamily="JetBrains Mono, monospace"
                fontSize="10"
                fill="oklch(0.48 0.02 250)"
                letterSpacing="2"
              >
                NODES
              </text>

              {/* Vertical trunk lines between layers */}
              <line
                x1={switchCx}
                y1={40 + NODE_H}
                x2={switchCx}
                y2={150}
                stroke="oklch(0.62 0.13 220)"
                strokeWidth="2"
                className="animate-dash"
              />
              <line
                x1={switchCx}
                y1={150 + NODE_H}
                x2={switchCx}
                y2={260}
                stroke="oklch(0.62 0.13 220)"
                strokeWidth="2"
              />
              {/* Switch to bus */}
              <line
                x1={switchCx}
                y1={switchBottomY}
                x2={switchCx}
                y2={busY}
                stroke="oklch(0.62 0.13 220)"
                strokeWidth="2"
              />
              {/* Horizontal bus */}
              <line
                x1={coreNodes[0].x + NODE_W / 2}
                y1={busY}
                x2={coreNodes[coreNodes.length - 1].x + NODE_W / 2}
                y2={busY}
                stroke="oklch(0.36 0.09 250)"
                strokeWidth="2"
              />

              {/* Drop lines from bus to each node */}
              {coreNodes.map((n) => (
                <line
                  key={n.id}
                  x1={n.x + NODE_W / 2}
                  y1={busY}
                  x2={n.x + NODE_W / 2}
                  y2={n.y}
                  stroke="oklch(0.82 0.015 240)"
                  strokeWidth="1.5"
                />
              ))}

              {/* Render top layer nodes */}
              {layers.map((l) =>
                l.nodes.map((n) => (
                  <Node
                    key={l.label + n.label}
                    x={n.x}
                    y={l.y}
                    label={n.label}
                    sub={n.sub}
                    accent
                  />
                ))
              )}

              {/* Core nodes */}
              {coreNodes.map((n, i) => (
                <g key={n.id} style={{ animation: `fade-up 0.5s ${i * 70}ms both` }}>
                  <Node x={n.x} y={n.y} label={n.label} sub={n.tag} />
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <Legend color="oklch(0.62 0.13 220)" label="Trunk principal (10 Gbps)" />
            <Legend color="oklch(0.36 0.09 250)" label="VLAN Bus" />
            <Legend color="oklch(0.82 0.015 240)" label="Drop por porta" />
          </div>
        </section>

        {/* Cable map */}
        <section>
          <SectionTitle number="02.1" title="Mapa de cabos (porta a porta)" />
          <div className="tech-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface-2 text-muted-foreground">
                <tr className="text-left mono text-[11px] uppercase tracking-wider">
                  <th className="px-4 py-3">Origem</th>
                  <th className="px-4 py-3">Porta</th>
                  <th className="px-4 py-3">Destino</th>
                  <th className="px-4 py-3">Porta</th>
                </tr>
              </thead>
              <tbody>
                {cableMap.map((c, i) => (
                  <tr
                    key={i}
                    className="border-t border-border hover:bg-muted/60 transition-colors"
                  >
                    <td className="px-4 py-3">{c.from}</td>
                    <td className="px-4 py-3 mono text-xs text-muted-foreground">
                      {c.fromPort}
                    </td>
                    <td className="px-4 py-3">{c.to}</td>
                    <td className="px-4 py-3 mono text-xs text-muted-foreground">
                      {c.toPort}
                    </td>
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

function Node({
  x,
  y,
  label,
  sub,
  accent,
}: {
  x: number;
  y: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={NODE_W}
        height={NODE_H}
        rx="6"
        fill={accent ? "oklch(0.36 0.09 250)" : "white"}
        stroke={accent ? "oklch(0.36 0.09 250)" : "oklch(0.82 0.015 240)"}
        strokeWidth="1"
      />
      <text
        x={x + NODE_W / 2}
        y={y + 24}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="13"
        fontWeight="600"
        fill={accent ? "white" : "oklch(0.22 0.03 250)"}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + NODE_W / 2}
          y={y + 42}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill={accent ? "oklch(0.9 0.02 240)" : "oklch(0.48 0.02 250)"}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-block w-4 h-0.5" style={{ background: color }} />
      {label}
    </span>
  );
}
