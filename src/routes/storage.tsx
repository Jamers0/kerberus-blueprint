import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { sharedStorage } from "@/lib/kerberus-data";
import { Folder, FolderRoot } from "lucide-react";

export const Route = createFileRoute("/storage")({
  head: () => ({
    meta: [
      { title: "Shared Storage — Kerberus v2.0" },
      { name: "description", content: "Memória partilhada do Kerberus em /kerberus: media, memory, projects, github, backups, logs, documents, models." },
      { property: "og:title", content: "Shared Storage — Kerberus v2.0" },
      { property: "og:description", content: "Layout único de storage partilhado." },
    ],
  }),
  component: StoragePage,
});

function StoragePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 06"
        title="Shared Storage"
        description="Volume partilhado montado em todos os nós relevantes. Garante que IA, Media e Backup partilham um único namespace coerente."
      />
      <PageBody>
        <section>
          <SectionTitle number="06.1" title="Layout /kerberus" hint="NFS · montado em todos os nós" />
          <div className="tech-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <FolderRoot className="h-4 w-4 text-accent" />
              <span className="mono text-sm">{sharedStorage.root}</span>
            </div>
            <ul className="space-y-2">
              {sharedStorage.children.map((c, i) => (
                <li
                  key={c.path}
                  className="grid grid-cols-[auto_minmax(160px,220px)_1fr] items-center gap-3 rounded-md border border-border bg-surface px-3 py-2.5 animate-fade-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <Folder className="h-4 w-4 text-muted-foreground" />
                  <span className="mono text-sm">{sharedStorage.root}{c.path}</span>
                  <span className="text-sm text-muted-foreground">{c.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="tech-card p-6">
          <SectionTitle number="06.2" title="Estratégia de montagem" />
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>· NFS exportado pelo <b className="text-foreground">Kerberus Media</b> (storage primário, SSD + HDD).</li>
            <li>· Montagem automática via <code className="mono text-xs">systemd.automount</code> nos nós Core, IA e Center.</li>
            <li>· Permissões por subpasta: <code className="mono text-xs">/models</code> e <code className="mono text-xs">/memory</code> restritas ao grupo <code className="mono text-xs">kerberus-ai</code>.</li>
            <li>· Snapshot semanal de <code className="mono text-xs">/memory</code> e <code className="mono text-xs">/projects</code> para o Kerberus Backup.</li>
          </ul>
        </section>
      </PageBody>
    </AppShell>
  );
}
