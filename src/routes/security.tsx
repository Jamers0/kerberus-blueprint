import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageBody, PageHeader, SectionTitle } from "@/components/AppShell";
import { ShieldCheck, Lock, Network, KeyRound, Eye, Globe } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Recomendações de Segurança — Kerberus v2.0" },
      {
        name: "description",
        content:
          "Recomendações de segurança: Cloudflare Access, MFA, isolamento de zonas, firewall por menor privilégio e auditoria.",
      },
      { property: "og:title", content: "Recomendações de Segurança — Kerberus v2.0" },
      {
        property: "og:description",
        content: "Práticas recomendadas de segurança para o projeto.",
      },
    ],
  }),
  component: SecurityPage,
});

const recommendations = [
  {
    icon: ShieldCheck,
    title: "Cloudflare Access",
    body:
      "Manter Cloudflare Access para todos os painéis críticos (Proxmox, NPM, Dashboard, Pi-hole). Exigir identidade verificada antes do túnel resolver para o serviço.",
  },
  {
    icon: KeyRound,
    title: "MFA obrigatório",
    body:
      "Ativar MFA em todos os serviços que o suportem nativamente. Para os que não suportam, proteger via Cloudflare Access + OTP/WebAuthn.",
  },
  {
    icon: Network,
    title: "Administração restrita à VLAN Management",
    body:
      "Painéis de administração só devem aceitar tráfego da VLAN 10 (Management). Bloquear acesso direto a partir de Users, IoT, Voice ou Cameras.",
  },
  {
    icon: Lock,
    title: "Firewall por menor privilégio",
    body:
      "Política default-deny entre VLANs. Abrir apenas portas e destinos estritamente necessários, sempre nomeados e documentados.",
  },
  {
    icon: Eye,
    title: "Isolamento de IoT e câmaras",
    body:
      "IoT (VLAN 50) e Cameras (VLAN 70) ficam sem rota para a rede interna. Comunicação apenas com o gateway local e serviços específicos via firewall.",
  },
  {
    icon: KeyRound,
    title: "Gestão de credenciais",
    body:
      "Rever logs, alertas e expiração de credenciais regularmente. Rotação periódica de tokens, chaves SSH e segredos do Cloudflare/Tailscale.",
  },
  {
    icon: Globe,
    title: "Proteção dos serviços expostos",
    body:
      "Para serviços públicos: rate limiting, bloqueio geográfico (allow-list por região) e WAF do Cloudflare. Logs centralizados para análise.",
  },
  {
    icon: ShieldCheck,
    title: "Backup imutável",
    body:
      "Garantir que pelo menos uma cópia de backup é imutável ou offline (air-gapped) para resistência a ransomware.",
  },
];

function SecurityPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Capítulo 07"
        title="Recomendações de Segurança"
        description="Segurança nunca é demais. Já usamos Cloudflare Access — estas recomendações complementam essa base com defesa em camadas."
      />
      <PageBody>
        <SectionTitle title="Princípios" hint="Defesa em profundidade" />
        <div className="grid md:grid-cols-2 gap-3">
          {recommendations.map(({ icon: Icon, title, body }, i) => (
            <article
              key={title}
              className="tech-card tech-card-hover p-5 animate-fade-up"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-md bg-accent/10 text-accent grid place-items-center shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="tech-card p-6">
          <SectionTitle title="Checklist rápido" />
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
              "MFA ativo em todos os painéis",
              "Default-deny entre VLANs",
              "Cloudflare Access em painéis críticos",
              "Rate limiting + geo-block em serviços públicos",
              "Backup off-site verificado mensalmente",
              "Rotação trimestral de chaves SSH/API",
              "Logs centralizados e alertas configurados",
              "Atualizações de Proxmox e containers semanais",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 p-3 rounded-md border border-border bg-surface"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </PageBody>
    </AppShell>
  );
}
