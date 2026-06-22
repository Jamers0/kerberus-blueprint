import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { serviceMap } from "@/lib/kerberus-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Mapa de Serviços — Kerberus v2.0" },
      { name: "description", content: "Mapa completo de serviços do Kerberus: onde cada um roda e qual a sua função." },
      { property: "og:title", content: "Mapa de Serviços — Kerberus v2.0" },
      { property: "og:description", content: "Serviço → servidor → função." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      serviceMap.filter((s) =>
        `${s.service} ${s.server} ${s.type}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 07"
        title="Mapa de Serviços"
        description="Quem roda onde. Use o filtro para encontrar rapidamente em que nó um serviço está alocado."
      />
      <PageBody>
        <section>
          <SectionTitle number="07.1" title="Distribuição" hint={`${filtered.length}/${serviceMap.length}`} />
          <div className="tech-card p-4 mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filtrar por serviço, servidor ou tipo…"
              className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>

          <div className="tech-card overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead className="bg-surface-2 text-muted-foreground">
                <tr className="text-left mono text-[11px] uppercase tracking-wider">
                  <th className="px-4 py-3">Serviço</th>
                  <th className="px-4 py-3">Servidor</th>
                  <th className="px-4 py-3">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr
                    key={s.service}
                    className="border-t border-border hover:bg-muted/60 transition-colors animate-fade-up"
                    style={{ animationDelay: `${i * 20}ms` }}
                  >
                    <td className="px-4 py-3 font-medium">{s.service}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.server}</td>
                    <td className="px-4 py-3">
                      <span className="mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md border border-border bg-surface-2 text-muted-foreground">
                        {s.type}
                      </span>
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
