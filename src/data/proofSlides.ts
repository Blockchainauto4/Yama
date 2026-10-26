export interface ProofSlide {
  id: number;
  src: string;
  title: string;
  value: string;
  tag: string;
  description: string;
  badge: string;
}

export const HUB_PROGRAM_URL = "https://ai.hub.xyz/r/8G5GNCTF";
export const HUB_REFERRAL_CODE = "8G5GNCTF";

export const PROOF_SLIDES: ProofSlide[] = [
  {
    id: 1,
    src: "/assets/aistudio/IMG-20261024-WA0122_28673feb.jpg",
    title: "Saldo Disponível & Total Ganho no Hub",
    value: "R$ 396,05 p/ Saque • Total R$ 1.687,30",
    tag: "Painel Oficial Hub",
    description: "Saldo disponível para saque imediato no app Hub Capture e mais de R$ 1.687 acumulados avaliando vídeos.",
    badge: "R$ 70/hora",
  },
  {
    id: 2,
    src: "/assets/aistudio/IMG-20261024-WA0145_258bda3a.jpg",
    title: "Comprovante PIX: R$ 491,90 Recebido",
    value: "R$ 491,90 via PIX (NOXPAY.IO)",
    tag: "Comprovante PIX",
    description: "Pagamento imediato na conta com mensagem do Suporte Oficial Hub Renda Extra.",
    badge: "PIX Aprovado",
  },
  {
    id: 3,
    src: "/assets/aistudio/IMG-20261026-WA0047_d12c93ac.jpg",
    title: "Transferência Nubank: R$ 114,70",
    value: "R$ 114,70 no Nubank",
    tag: "Transferência Instantânea",
    description: "Transferência recebida da NOXPAY.IO Instituição de Pagamentos direto no aplicativo do Nubank.",
    badge: "Conta Nubank",
  },
  {
    id: 4,
    src: "/assets/aistudio/IMG-20261026-WA0001_c10e9000.jpg",
    title: "Gravações Aprovadas no Hub",
    value: "R$ 67,50 (3 gravações)",
    tag: "Gravações em Análise",
    description: "Ganhos em análise normalmente aprovados em até 24 horas por avaliações simples no celular.",
    badge: "Aprovação 24h",
  },
  {
    id: 5,
    src: "/assets/aistudio/IMG-20261026-WA0048_99d7768b.jpg",
    title: "PIX no NextJoy: R$ 142,55",
    value: "R$ 142,55 na conta Next",
    tag: "PIX Instantâneo",
    description: "Depósito de R$ 142,55 creditado por NOXPAY.IO Instituição de Pagamentos na conta.",
    badge: "PIX Confirmado",
  },
  {
    id: 6,
    src: "/assets/aistudio/IMG-20261024-WA0177_3d21d269.jpg",
    title: "PIX Recebido: R$ 236,25",
    value: "R$ 236,25 via PIX",
    tag: "Notificação de Pagamento",
    description: "Mais um comprovante de transferência PIX via NOXPAY.IO creditado com sucesso.",
    badge: "PIX na Conta",
  },
];
