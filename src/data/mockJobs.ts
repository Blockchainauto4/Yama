import { JobVacancy } from "../types";

export const INITIAL_JOB_VACANCIES: JobVacancy[] = [
  {
    id: "vaga-cumim-agua-rasa",
    title: "CUMIM MASCULINO",
    category: "urgente_agora",
    urgencyLevel: "🚨 1 VAGA PARA AGORA! CHEGAR O MAIS RÁPIDO POSSÍVEL",
    quantity: "1 Vaga Imediata",
    pay: "R$ 200,00 (Pagamento Quinta-Feira)",
    address: "R. Sapucaia, 572 - Água Rasa, São Paulo - SP, 03170-050",
    landmark: "Próximo à Estação Belém (Metrô)",
    region: "Zona Leste / Belém / Água Rasa",
    workingHours: "Pra agora até as 23:00 • 1 hora de almoço (Refeição no local)",
    requirements: [
      "Chegar o mais rápido possível",
      "Enviar no PV foto de perfil e região para indicação",
      "Não responde sem foto e sem informações necessárias para seleção",
    ],
    contactName: "Paulo Gontijo",
    contactRole: "Produtor de Staff / RH",
    contactPhone: "11952325701",
    notes: "🚨 PV FOTO DE PERFIL E REGIÃO PRA INDICAÇÃO... (NÃO RESPONDO SEM FOTO, SEM INFORMAÇÕES NECESSÁRIAS PARA SELEÇÃO)",
    postedAt: "Há 3 minutos",
    isVerified: true,
    rawWhatsAppText: `🚨 *CUMIM MASCULINO*
1 VAGA PARA AGORA! 
*CHEGAR O MAIS RÁPIDO POSSÍVEL*

R. Sapucaia, 572 - Água Rasa, São Paulo - SP, 03170-050.
*PRÓXIMO ESTAÇÃO BELÉM*

PAGA $$200,00 QUINTA FEIRA.. 

Pra agora até as 23:00 
1 hora de almoço- refeição no local.

*PV FOTO DE PERFIL E REGIÃO*
PRA INDICAÇÃO... 

PAULO GONTIJO
11952325701
*(PRODUTOR DE STAFF / RH)*

*(NÃO RESPONDO SEM FOTO, SEM INFORMAÇÕES NECESSÁRIAS PARA SELEÇÃO)*`,
  },
  {
    id: "vaga-repositor-ipava",
    title: "REPOSITOR DE MERCADORIAS (SUPERMERCADO)",
    category: "clt",
    urgencyLevel: "💼 CONTRATAÇÃO CLT EFETIVA",
    quantity: "3 Vagas Abertas",
    pay: "R$ 1.890,00 + VT + VR + Cesta Básica + Convênio",
    address: "Av. Taquandava, 9 - Cidade Ipava, São Paulo - SP",
    landmark: "Próx. Balneário São José / Pava",
    region: "Zona Sul / Cidade Ipava",
    workingHours: "Escala 6x1 • Turno Tarde/Noite (14h00 às 22h20)",
    requirements: [
      "Ensino Fundamental ou Médio",
      "Experiência prévia em reposição, estoque ou supermercado",
      "Disponibilidade para início nesta semana",
    ],
    contactName: "Coordenação de RH Yammá",
    contactRole: "Recrutamento & Seleção",
    contactPhone: "11951490800",
    notes: "Entrevista presencial agendada pelo WhatsApp. Levar currículo e documento com foto.",
    postedAt: "Há 18 minutos",
    isVerified: true,
    rawWhatsAppText: `💼 *REPOSITOR DE MERCADORIAS - CLT*
3 Vagas Abertas • Cidade Ipava (Zona Sul SP)
Salário: R$ 1.890,00 + VT + VR + Cesta
Escala 6x1 (14h00 às 22h20)
Local: Av. Taquandava, 9 - Cidade Ipava
Contato: 11951490800 (RH Yammá)`,
  },
  {
    id: "vaga-caixa-chacara-santa-maria",
    title: "OPERADOR(A) DE CAIXA REGISTRADORA",
    category: "clt",
    urgencyLevel: "📋 INÍCIO IMEDIATO • CLT",
    quantity: "2 Vagas",
    pay: "R$ 1.950,00 + Quebra de Caixa + VT + VR",
    address: "Av. dos Funcionários Públicos, 512 - Chácara Santa Maria, São Paulo - SP",
    landmark: "Próximo à Estrada do M'Boi Mirim",
    region: "Zona Sul / Chácara Santa Maria",
    workingHours: "Escala 6x1 • Turno Manhã (07h00 às 15h20)",
    requirements: [
      "Ensino Médio Completo",
      "Boa comunicação e atendimento ao cliente",
      "Noções de informática básica e recebimento de valores",
    ],
    contactName: "Mariana Silva",
    contactRole: "Gerente Operacional",
    contactPhone: "11951433200",
    notes: "Vagas preferenciais para moradores da Zona Sul (Chácara Santa Maria, Pava, Jd. Aracati).",
    postedAt: "Há 35 minutos",
    isVerified: true,
    rawWhatsAppText: `📋 *OPERADORA DE CAIXA - CLT*
2 Vagas • Chácara Santa Maria / M'Boi Mirim
Salário: R$ 1.950,00 + Quebra de Caixa + Benefícios
Local: Av. dos Funcionários Públicos, 512
Contato: 11951433200 (Mariana Silva)`,
  },
  {
    id: "vaga-garcom-pinheiros",
    title: "GARÇOM / ATENDENTE DE RESTAURANTE",
    category: "eventos_restaurante",
    urgencyLevel: "⚡ DIÁRIA PARA HOJE À NOITE",
    quantity: "2 Vagas",
    pay: "R$ 180,00 / Noite + Gorjeta da Mesa (Pago no final do turno via PIX)",
    address: "Rua dos Pinheiros, 840 - Pinheiros, São Paulo - SP",
    landmark: "A 200m da Estação Fradique Coutinho (Linha Amarela)",
    region: "Zona Oeste / Pinheiros",
    workingHours: "Hoje das 18h00 às 01h00 • Jantar incluso no local",
    requirements: [
      "Camisa preta lisa e calça preta",
      "Agilidade no atendimento e postura profissional",
      "Disponibilidade para começar hoje às 18h",
    ],
    contactName: "Carlos Eduardo",
    contactRole: "Maitre / Coordenador de Salão",
    contactPhone: "11988776655",
    notes: "Chamar no WhatsApp com nome completo e experiência prévia em restaurante.",
    postedAt: "Há 42 minutos",
    isVerified: true,
    rawWhatsAppText: `⚡ *GARÇOM / DIÁRIA HOJE À NOITE*
Paga R$ 180,00 + Gorjetas no PIX ao término!
Horário: 18h às 01h (Jantar incluso)
Local: Rua dos Pinheiros, 840 (Próx. Fradique Coutinho)
Contato: 11988776655 (Carlos Maitre)`,
  },
  {
    id: "vaga-entregador-ebike",
    title: "ENTREGADOR DE SUPERMERCADO EM E-BIKE",
    category: "logistica_supermercado",
    urgencyLevel: "🛵 RADAR DE ENTREGADORES ATIVO",
    quantity: "5 Vagas",
    pay: "R$ 120,00 diária mínima garantida + R$ 6,50 por entrega realizada",
    address: "Bases em Cidade Ipava, Taquandava e M'Boi Mirim",
    landmark: "Raio de atendimento de 3 a 5 km",
    region: "Zona Sul SP",
    workingHours: "Turnos flexíveis (Manhã, Tarde ou Noite / 24h)",
    requirements: [
      "Bicicleta elétrica ou convencional própria",
      "Smartphone com WhatsApp ativo e GPS",
      "Bag / Mochila térmica para compras",
    ],
    contactName: "Logística Express Yammá",
    contactRole: "Supervisão de Frotas",
    contactPhone: "11951411400",
    notes: "Repasses diários via PIX sem taxa de saque. Bônus de produtividade por metas.",
    postedAt: "Há 1 hora",
    isVerified: true,
    rawWhatsAppText: `🛵 *ENTREGADORES DE E-BIKE / SUPERMERCADO*
R$ 120 garantido + R$ 6,50 por entrega!
Região: Zona Sul (Ipava, Taquandava, Aracati)
Contato: 11951411400 (Logística Yammá)`,
  },
  {
    id: "vaga-auxiliar-cozinha-mooca",
    title: "AUXILIAR DE COZINHA / COPA & LIMPEZA",
    category: "eventos_restaurante",
    urgencyLevel: "🔥 URGENTE PARA O ALMOÇO DE HOJE",
    quantity: "1 Vaga Imediata",
    pay: "R$ 170,00 (Pago no encerramento da diária)",
    address: "Rua Juventus, 320 - Mooca, São Paulo - SP",
    landmark: "Próximo à Rua da Mooca / Estação Bresser",
    region: "Zona Leste / Mooca",
    workingHours: "Das 10h00 às 18h00 • Almoço fornecido no local",
    requirements: [
      "Sapatos fechados e antiderrapantes",
      "Habilidade com pré-preparo de alimentos e higienização",
      "Pontualidade rigorosa",
    ],
    contactName: "Chef Roberto",
    contactRole: "Gerente de Cozinha",
    contactPhone: "11977665544",
    notes: "Confirmar vaga agora pelo WhatsApp enviando nome e comprovante de experiência.",
    postedAt: "Há 1 hora e 15 minutos",
    isVerified: true,
    rawWhatsAppText: `🔥 *AUXILIAR DE COZINHA / DIÁRIA URGENTE*
Paga R$ 170,00 no ato!
Horário: 10h às 18h com almoço incluso
Local: Rua Juventus, 320 - Mooca
Contato: 11977665544 (Chef Roberto)`,
  },
];
