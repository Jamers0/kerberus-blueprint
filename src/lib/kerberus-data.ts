export type Phase = {
  id: string;
  number: number;
  name: string;
  role: string;
  hardware: string;
  specs: string[];
  services: string[];
  priceMin: number;
  priceMax: number;
  priority: "MUITO ALTA" | "ALTA" | "MÉDIA" | "BAIXA";
  notes?: string;
};

export const phases: Phase[] = [
  {
    id: "core",
    number: 1,
    name: "Kerberus Core",
    role: "Servidor principal do projeto",
    hardware: "HP ProDesk Mini",
    specs: ["Intel i5-9500T", "16 GB DDR4", "SSD NVMe 512 GB"],
    services: [
      "Proxmox",
      "Docker",
      "Cloudflare Tunnel",
      "Tailscale",
      "Nginx Proxy Manager",
      "PostgreSQL",
      "Redis",
      "Dashboard",
      "Hermes",
      "KMM",
    ],
    priceMin: 130,
    priceMax: 180,
    priority: "MUITO ALTA",
  },
  {
    id: "rede",
    number: 2,
    name: "Kerberus Rede",
    role: "Infraestrutura de rede",
    hardware: "HP ProLiant MicroServer N36",
    specs: ["AMD Turion N36", "5 GB RAM", "SSD 30 GB"],
    services: ["Pi-hole", "DNS Local", "DHCP Backup", "Monitorização", "QDevice Proxmox"],
    priceMin: 50,
    priceMax: 80,
    priority: "ALTA",
  },
  {
    id: "ia",
    number: 3,
    name: "Kerberus IA",
    role: "LLMs, agentes e automação",
    hardware: "Dell OptiPlex 5050 SFF",
    specs: ["Intel i5-7500", "16 GB DDR4", "SSD 256 GB"],
    services: [
      "Ollama",
      "OpenWebUI",
      "Mimo",
      "OpenClaw",
      "Voice Gateway",
      "Piper",
      "Whisper",
    ],
    priceMin: 120,
    priceMax: 180,
    priority: "ALTA",
    notes: "GPU futura: NVIDIA RTX 3060 12 GB (~180€), instalação posterior.",
  },
  {
    id: "media",
    number: 4,
    name: "Kerberus Media",
    role: "Biblioteca de mídia",
    hardware: "Dell OptiPlex 3050",
    specs: ["Intel i5-6500", "8 GB DDR4", "SSD NVMe 256 GB"],
    services: ["Emby", "qBittorrent", "Catálogo de Filmes", "Catálogo de Séries"],
    priceMin: 80,
    priceMax: 120,
    priority: "MÉDIA",
    notes: "Storage inicial: HDD 1 TB existente. Expansão futura: 4 TB e 8 TB.",
  },
  {
    id: "backup",
    number: 5,
    name: "Kerberus Backup",
    role: "Proteção da infraestrutura",
    hardware: "LaCie Cloudbox",
    specs: ["2 TB ou 4 TB"],
    services: [
      "Backup Proxmox",
      "Backup Docker",
      "Backup Git",
      "Backup Bases de Dados",
      "Backup Configurações",
    ],
    priceMin: 30,
    priceMax: 60,
    priority: "MÉDIA",
  },
  {
    id: "center",
    number: 6,
    name: "Kerberus Center",
    role: "Central de operação e monitorização",
    hardware: "iMac 21.5″ Late 2012",
    specs: ["Intel Core i7", "16 GB RAM", "SSD 128 GB", "HDD 1 TB", "NVIDIA GT650M"],
    services: [
      "Dashboard",
      "Navegação",
      "SSH",
      "VS Code",
      "Monitorização",
      "Gestão do Proxmox",
      "Gestão do Cloudflare",
    ],
    priceMin: 149,
    priceMax: 149,
    priority: "BAIXA",
    notes: "Estação de comando — não executa serviços críticos.",
  },
];

export const vlans = [
  { id: 10, name: "Management", cidr: "10.10.0.0/24", purpose: "Gestão de switches, hosts e hipervisores" },
  { id: 20, name: "Users", cidr: "10.10.10.0/24", purpose: "Estações de trabalho e dispositivos pessoais" },
  { id: 30, name: "Servidores", cidr: "10.10.20.0/24", purpose: "VMs e containers de produção" },
  { id: 40, name: "Cluster", cidr: "10.10.30.0/24", purpose: "Tráfego interno entre nós Proxmox" },
  { id: 50, name: "IoT", cidr: "10.10.40.0/24", purpose: "Dispositivos IoT (Nest, Alexa, sensores)" },
  { id: 60, name: "Voice", cidr: "10.10.50.0/24", purpose: "Voice Gateway, Whisper, Piper" },
  { id: 70, name: "Cameras", cidr: "10.10.60.0/24", purpose: "Câmaras IP (futuro)" },
];

export const subdomains = [
  { host: "chat.kerberus.uk", target: "OpenWebUI (IA)", phase: "IA" },
  { host: "emby.kerberus.uk", target: "Emby (Media)", phase: "Media" },
  { host: "hermes.kerberus.uk", target: "Hermes (Core)", phase: "Core" },
  { host: "dash.kerberus.uk", target: "Dashboard (Center)", phase: "Center" },
  { host: "kmm.kerberus.uk", target: "KMM (Core)", phase: "Core" },
  { host: "npm.kerberus.uk", target: "Nginx Proxy Manager", phase: "Core" },
  { host: "proxmox.kerberus.uk", target: "Proxmox UI", phase: "Core" },
  { host: "pihole.kerberus.uk", target: "Pi-hole", phase: "Rede" },
];

export const cableMap = [
  { from: "Uplink 10 Gbps", fromPort: "WAN", to: "ZTE F8748", toPort: "WAN 10G" },
  { from: "ZTE F8748", fromPort: "LAN1", to: "MikroTik CSS610", toPort: "SFP+ 1" },
  { from: "MikroTik CSS610", fromPort: "Port 1", to: "Kerberus Core", toPort: "eth0" },
  { from: "MikroTik CSS610", fromPort: "Port 2", to: "Kerberus IA", toPort: "eth0" },
  { from: "MikroTik CSS610", fromPort: "Port 3", to: "Kerberus Media", toPort: "eth0" },
  { from: "MikroTik CSS610", fromPort: "Port 4", to: "Kerberus Rede", toPort: "eth0" },
  { from: "MikroTik CSS610", fromPort: "Port 5", to: "Kerberus Backup", toPort: "eth0" },
  { from: "MikroTik CSS610", fromPort: "Port 6", to: "Kerberus Center", toPort: "eth0" },
];

/* Inventário completo de hardware */
export type InventoryItem = {
  name: string;
  equipment: string;
  cpu: string;
  ram: string;
  ssd: string;
  role: string;
};

export const inventory: InventoryItem[] = [
  { name: "Kerberus Core", equipment: "HP ProDesk Mini", cpu: "Intel i5-9500T", ram: "16 GB DDR4", ssd: "NVMe 512 GB", role: "Orquestração" },
  { name: "Kerberus IA", equipment: "Dell OptiPlex 5050 SFF", cpu: "Intel i5-7500", ram: "16 GB DDR4", ssd: "SSD 256 GB", role: "Ollama / Agentes" },
  { name: "Kerberus Media", equipment: "Dell OptiPlex 3050", cpu: "Intel i5-6500", ram: "8 GB DDR4", ssd: "NVMe 256 GB", role: "Emby / qBittorrent" },
  { name: "Kerberus Rede", equipment: "HP ProLiant MicroServer N36", cpu: "AMD Turion N36", ram: "5 GB", ssd: "SSD 30 GB", role: "DNS / Pi-hole / QDevice" },
  { name: "Kerberus Backup", equipment: "LaCie Cloudbox", cpu: "—", ram: "—", ssd: "2 TB / 4 TB", role: "Backup central" },
  { name: "Kerberus Center", equipment: "iMac 21.5″ Late 2012", cpu: "Intel Core i7", ram: "16 GB", ssd: "SSD 128 GB + HDD 1 TB", role: "Console de operação" },
];

/* Cluster Proxmox */
export type ProxmoxNode = {
  id: string;
  role: "Node" | "QDevice";
  host: string;
  hardware: string;
  vms: string[];
  containers: string[];
};

export const proxmoxCluster: ProxmoxNode[] = [
  {
    id: "node-a",
    role: "Node",
    host: "Kerberus Core",
    hardware: "HP ProDesk Mini · i5-9500T · 16 GB",
    vms: ["vm-core-services", "vm-db"],
    containers: ["ct-npm", "ct-cloudflared", "ct-dashboard", "ct-hermes"],
  },
  {
    id: "node-b",
    role: "Node",
    host: "Kerberus IA",
    hardware: "Dell 5050 · i5-7500 · 16 GB",
    vms: ["vm-ollama", "vm-openwebui"],
    containers: ["ct-mimo", "ct-openclaw", "ct-voice-gateway", "ct-whisper", "ct-piper"],
  },
  {
    id: "node-c",
    role: "Node",
    host: "Kerberus Media",
    hardware: "Dell 3050 · i5-6500 · 8 GB",
    vms: ["vm-emby"],
    containers: ["ct-qbittorrent", "ct-catalog"],
  },
  {
    id: "qdevice",
    role: "QDevice",
    host: "Kerberus Rede",
    hardware: "HP MicroServer N36 · 5 GB",
    vms: [],
    containers: ["ct-pihole", "ct-dns", "ct-monitor"],
  },
];

/* Shared storage layout */
export const sharedStorage = {
  root: "/kerberus",
  children: [
    { path: "/media", desc: "Filmes, séries, música — servido pelo Emby" },
    { path: "/memory", desc: "Memória persistente do Mimo (vector store + logs)" },
    { path: "/projects", desc: "Workspaces de código e experimentos" },
    { path: "/github", desc: "Mirror local de repositórios" },
    { path: "/backups", desc: "Snapshots Proxmox, dumps PostgreSQL, configs" },
    { path: "/logs", desc: "Logs centralizados de hosts e containers" },
    { path: "/documents", desc: "Documentos, PDFs, knowledge base" },
    { path: "/models", desc: "Modelos LLM (.gguf) e embeddings Ollama" },
  ],
};

/* Mapa de serviços → servidor */
export type ServiceMapItem = { service: string; server: string; type: string };

export const serviceMap: ServiceMapItem[] = [
  { service: "Proxmox", server: "Core / IA / Media", type: "Hipervisor" },
  { service: "Hermes", server: "Core", type: "Orquestrador" },
  { service: "Mimo", server: "IA", type: "Memória" },
  { service: "OpenClaw", server: "IA", type: "Execução" },
  { service: "Ollama", server: "IA", type: "LLM" },
  { service: "OpenWebUI", server: "IA", type: "UI LLM" },
  { service: "Voice Gateway", server: "IA", type: "Voz" },
  { service: "Whisper", server: "IA", type: "STT" },
  { service: "Piper", server: "IA", type: "TTS" },
  { service: "Emby", server: "Media", type: "Streaming" },
  { service: "qBittorrent", server: "Media", type: "Download" },
  { service: "KMM", server: "Core", type: "Gestor" },
  { service: "Pi-hole", server: "Rede", type: "DNS / Ads" },
  { service: "DNS Local", server: "Rede", type: "Resolução" },
  { service: "PostgreSQL", server: "Core", type: "Base de dados" },
  { service: "Redis", server: "Core", type: "Cache / Fila" },
  { service: "Nginx Proxy Manager", server: "Core", type: "Reverse Proxy" },
  { service: "Cloudflare Tunnel", server: "Core", type: "Edge" },
  { service: "Dashboard", server: "Center", type: "UI" },
  { service: "Backups", server: "Backup", type: "Storage" },
];

/* Hermes flow */
export const hermesInputs = ["Telegram", "WhatsApp", "Alexa", "Google Nest", "Microfone Local"];
export const hermesTools = [
  { name: "Mimo", desc: "Memória de longo prazo" },
  { name: "Ollama", desc: "Raciocínio LLM" },
  { name: "KMM", desc: "Gestor de tarefas" },
];
export const hermesOutputs = ["Arquivos", "Rede", "Resposta de voz", "Ações em serviços"];

/* Jarvis Mode (voz residencial) */
export const jarvisFlow = [
  { step: "Wake word", actor: "Alexa / Nest / Mic Local", note: "Dispara captura na VLAN Voice" },
  { step: "Captura", actor: "Voice Gateway", note: "Stream de áudio normalizado" },
  { step: "STT", actor: "Whisper", note: "Transcrição local (sem cloud)" },
  { step: "Intenção", actor: "Hermes", note: "Roteia para ferramenta certa" },
  { step: "Raciocínio", actor: "Ollama + Mimo", note: "LLM com memória persistente" },
  { step: "TTS", actor: "Piper", note: "Síntese de voz local" },
  { step: "Resposta", actor: "Dispositivo de origem", note: "Áudio devolvido em <2s alvo" },
];
