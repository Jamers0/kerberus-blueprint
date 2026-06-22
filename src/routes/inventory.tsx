import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { inventory } from "@/lib/kerberus-data";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventário — Kerberus v2.0" },
      { name: "description", content: "Inventário completo de hardware do Kerberus: CPU, RAM, SSD e função de cada nó." },
      { property: "og:title", content: "Inventário — Kerberus v2.0" },
      { property: "og:description", content: "Hardware nó a nó do projeto Kerberus." },
    ],
  }),
  component: InventoryPage,
});

function InventoryPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 01.1"
        title="Inventário de Hardware"
        description="Lista canónica de todos os equipamentos do projeto. Use esta tabela como referência ao comprar peças, planear upgrades ou abrir tickets de suporte."
      />
      <PageBody>
        <section>
          <SectionTitle number="01.1" title="Equipamentos" hint={`${inventory.length} nós físicos`} />
          <div className="tech-card overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead className="bg-surface-2 text-muted-foreground">
                <tr className="text-left mono text-[11px] uppercase tracking-wider">
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Equipamento</th>
                  <th className="px-4 py-3">CPU</th>
                  <th className="px-4 py-3">RAM</th>
                  <th className="px-4 py-3">Storage</th>
                  <th className="px-4 py-3">Função</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((it, i) => (
                  <tr
                    key={it.name}
                    className="border-t border-border hover:bg-muted/60 transition-colors animate-fade-up"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <td className="px-4 py-3 font-medium">{it.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{it.equipment}</td>
                    <td className="px-4 py-3 mono text-xs">{it.cpu}</td>
                    <td className="px-4 py-3 mono text-xs">{it.ram}</td>
                    <td className="px-4 py-3 mono text-xs">{it.ssd}</td>
                    <td className="px-4 py-3 text-muted-foreground">{it.role}</td>
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
