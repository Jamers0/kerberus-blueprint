import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Layers,
  Network,
  Workflow,
  Map,
  ShieldCheck,
  Lightbulb,
  Boxes,
  Cpu,
  Sparkles,
  Server,
  HardDrive,
  ListTree,
  Mic,
  PackageSearch,
} from "lucide-react";

const nav = [
  { to: "/", label: "Visão Geral", icon: LayoutDashboard, group: "Início" },
  { to: "/vision", label: "Visão Final", icon: Sparkles, group: "Início" },

  { to: "/phases", label: "Fases", icon: Layers, group: "Hardware" },
  { to: "/inventory", label: "Inventário", icon: PackageSearch, group: "Hardware" },

  { to: "/topology", label: "Topologia", icon: Network, group: "Rede" },
  { to: "/network", label: "VLANs & IP", icon: Boxes, group: "Rede" },

  { to: "/proxmox", label: "Proxmox", icon: Server, group: "Plataforma" },
  { to: "/storage", label: "Shared Storage", icon: HardDrive, group: "Plataforma" },
  { to: "/services", label: "Mapa de Serviços", icon: ListTree, group: "Plataforma" },

  { to: "/flows", label: "Fluxos", icon: Workflow, group: "IA" },
  { to: "/jarvis", label: "Jarvis Mode", icon: Mic, group: "IA" },

  { to: "/roadmap", label: "Roadmap & Investimento", icon: Map, group: "Projeto" },
  { to: "/advanced", label: "Observações Avançadas", icon: Lightbulb, group: "Projeto" },
  { to: "/security", label: "Segurança", icon: ShieldCheck, group: "Projeto" },
] as const;

const navGroups = Array.from(new Set(nav.map((n) => n.group)));

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-border bg-surface sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 rounded-md bg-primary text-primary-foreground grid place-items-center font-mono text-sm font-semibold">
              K
              <span className="absolute inset-0 rounded-md ring-1 ring-accent/40 group-hover:ring-accent transition" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">Kerberus v2.0</div>
              <div className="text-[11px] mono text-muted-foreground">kerberus.uk</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${active ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`}
                />
                <span>{label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border text-[11px] mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5" />
            <span>Documentação Técnica</span>
          </div>
          <div className="mt-1 opacity-70">v2.0 · Roadmap 2026</div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 border-b border-border bg-surface/90 backdrop-blur">
        <div className="flex items-center gap-3 px-4 h-14">
          <div className="h-7 w-7 rounded-md bg-primary text-primary-foreground grid place-items-center font-mono text-xs">
            K
          </div>
          <div className="text-sm font-semibold">Kerberus v2.0</div>
        </div>
        <div className="flex overflow-x-auto gap-1 px-3 pb-2 -mt-1">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs ${
                  active ? "bg-secondary text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 pt-28 lg:pt-0">
        <div key={pathname} className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        {eyebrow && (
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-accent mb-3">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight animate-fade-up">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-3xl text-muted-foreground animate-fade-up">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}

export function PageBody({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 space-y-10">
      {children}
    </div>
  );
}

export function SectionTitle({
  number,
  title,
  hint,
}: {
  number?: string;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-4">
      <h2 className="text-lg font-semibold flex items-baseline gap-3">
        {number && (
          <span className="mono text-xs text-accent">{number}</span>
        )}
        {title}
      </h2>
      {hint && <span className="mono text-[11px] text-muted-foreground">{hint}</span>}
    </div>
  );
}
