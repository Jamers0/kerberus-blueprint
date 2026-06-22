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
      "Emby",
      "qBittorrent",
      "OpenWebUI",
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
    services: ["Pi-hole", "DNS Local", "DHCP Backup", "Monitorização"],
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
      "Hermes",
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
    services: ["Emby", "KMM", "qBittorrent", "Catálogo de Filmes", "Catálogo de Séries"],
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
  { from: "MikroTik CSS610", fromPort: "Port 2", to: "Kerberus Rede", toPort: "eth0" },
  { from: "MikroTik CSS610", fromPort: "Port 3", to: "Kerberus IA", toPort: "eth0" },
  { from: "MikroTik CSS610", fromPort: "Port 4", to: "Kerberus Media", toPort: "eth0" },
  { from: "MikroTik CSS610", fromPort: "Port 5", to: "Kerberus Backup", toPort: "eth0" },
  { from: "MikroTik CSS610", fromPort: "Port 6", to: "Kerberus Center", toPort: "eth0" },
];
