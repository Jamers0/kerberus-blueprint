import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { Lightbulb } from "lucide-react";

export const Route = createFileRoute("/advanced")({
  head: () => ({
    meta: [
      { title: "Observações Técnicas Avançadas — Kerberus v2.0" },
      {
        name: "description",
        content:
          "Observações técnicas avançadas: roteamento inter-VLAN, expansão GPU/câmaras, isolamento e DNS.",
      },
      { property: "og:title", content: "Observações Técnicas Avançadas — Kerberus v2.0" },
      {
        property: "og:description",
        content: "Notas arquiteturais avançadas do projeto.",
      },
    ],
  }),
  component: AdvancedPage,
});

const notes = [
  {
    title: "Roteamento inter-VLAN",
    body:
      "Pode permanecer no ZTE F8748 no estágio atual, com migração futura para um router virtual no Proxmox (ex.: VyOS ou OPNsense) quando a carga ou as políticas de filtragem o justificarem.",
  },
  {
    title: "Expansão prevista",
    body:
      "Arquitetura preparada para incorporar GPU (RTX 3060 12 GB), câmaras IP na VLAN 70 e maior separação por zonas sem reestruturação física do core.",
  },
  {
    title: "Isolamento por VLAN",
    body:
      "Manter o isolamento por VLAN como princípio base — sobretudo em IoT, Voice e Cameras — com regras de firewall explícitas para qualquer tráfego cruzado.",
  },
  {
    title: "DNS local + Cloudflare Zero Trust",
    body:
      "A camada de DNS local (Pi-hole) e o Cloudflare Zero Trust devem continuar como redundância dupla: resolução interna independente e acesso externo controlado por identidade.",
  },
  {
    title: "Storage e backup",
    body:
      "Estratégia 3-2-1: três cópias, dois suportes distintos, uma off-site (LaCie Cloudbox). Snapshots Proxmox para rollback rápido; dumps de PostgreSQL/Redis fora do datastore primário.",
  },
  {
    title: "Observabilidade",
    body:
      "Pi-hole e o nó Rede centralizam métricas de DNS e tráfego. Recomenda-se adicionar Prometheus + Grafana no Core e exportadores por nó (node_exporter, cAdvisor) para baseline e alertas.",
  },
];

function AdvancedPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 06"
        title="Observações Técnicas Avançadas"
        description="Notas arquiteturais que orientam decisões futuras sem comprometer o desenho atual."
      />
      <PageBody>
        <div className="grid md:grid-cols-2 gap-3">
          {notes.map((n, i) => (
            <article
              key={n.title}
              className="tech-card tech-card-hover p-5 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-2 text-accent">
                <Lightbulb className="h-4 w-4" />
                <span className="mono text-[11px] uppercase tracking-wider">Nota {i + 1}</span>
              </div>
              <h3 className="mt-2 font-semibold">{n.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{n.body}</p>
            </article>
          ))}
        </div>
      </PageBody>
    </AppShell>
  );
}
