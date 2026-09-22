import React, { useState } from "react";
import { JobVacancy } from "../types";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  MessageCircle,
  Share2,
  Copy,
  Check,
  Search,
  Filter,
  PlusCircle,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
  Send,
  Building2,
  Users,
  Navigation,
} from "lucide-react";
import { JobSlotsSlider } from "./JobSlotsSlider";
import { safeCopyText } from "../utils/clipboard";

interface LiveJobRadarViewProps {
  vacancies: JobVacancy[];
  onAddVacancy: (vacancy: JobVacancy) => void;
  onOpenGroup: () => void;
}

export const LiveJobRadarView: React.FC<LiveJobRadarViewProps> = ({
  vacancies,
  onAddVacancy,
  onOpenGroup,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [selectedRegion, setSelectedRegion] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);

  // New Job Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<JobVacancy["category"]>("urgente_agora");
  const [newPay, setNewPay] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newLandmark, setNewLandmark] = useState("");
  const [newRegion, setNewRegion] = useState("Zona Leste / Belém");
  const [newHours, setNewHours] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactRole, setNewContactRole] = useState("Produtor de Staff / RH");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newUrgency, setNewUrgency] = useState("🚨 VAGA URGENTE PARA HOJE");

  const categories = [
    { id: "todas", label: "Todas as Vagas", icon: Briefcase },
    { id: "urgente_agora", label: "🚨 Urgente / Para Agora", icon: AlertTriangle },
    { id: "diaria", label: "⚡ Diárias & Extras", icon: DollarSign },
    { id: "clt", label: "💼 Vagas CLT", icon: Building2 },
    { id: "eventos_restaurante", label: "🍽️ Bares & Eventos", icon: Users },
    { id: "logistica_supermercado", label: "🏪 Supermercado & Entregas", icon: Navigation },
  ];

  const regions = [
    "todas",
    "Zona Leste / Belém / Água Rasa",
    "Zona Sul / Cidade Ipava",
    "Zona Sul / Chácara Santa Maria",
    "Zona Oeste / Pinheiros",
    "Centro",
  ];

  // Filter logic
  const filteredVacancies = vacancies.filter((job) => {
    const matchesCategory =
      selectedCategory === "todas" ||
      job.category === selectedCategory ||
      (selectedCategory === "diaria" && job.category === "urgente_agora");

    const matchesRegion =
      selectedRegion === "todas" || job.region.toLowerCase().includes(selectedRegion.toLowerCase());

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.address.toLowerCase().includes(query) ||
      job.landmark.toLowerCase().includes(query) ||
      job.contactName.toLowerCase().includes(query) ||
      job.pay.toLowerCase().includes(query) ||
      job.region.toLowerCase().includes(query);

    return matchesCategory && matchesRegion && matchesQuery;
  });

  const handleCopyJobData = async (job: JobVacancy) => {
    const textToCopy =
      job.rawWhatsAppText ||
      `🚨 *${job.title}*\n${job.urgencyLevel}\n\n📍 ${job.address}\n*${job.landmark}*\n\n💵 ${job.pay}\n⏰ ${job.workingHours}\n\n${
        job.notes ? `*${job.notes}*\n\n` : ""
      }👤 Contato: ${job.contactName} (${job.contactRole})\n📱 WhatsApp: ${job.contactPhone}`;

    await safeCopyText(textToCopy);
    setCopiedJobId(job.id);
    setTimeout(() => setCopiedJobId(null), 2500);
  };

  const handleOpenWhatsAppCandidate = (job: JobVacancy) => {
    const cleanPhone = job.contactPhone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
    const text = encodeURIComponent(
      `Olá ${job.contactName}! Vi a vaga de *${job.title}* (${job.landmark || job.region}) no Radar de Vagas Yammá e tenho interesse imediato. Seguem minhas informações:`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, "_blank");
  };

  const handleSubmitNewJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPay || !newContactPhone || !newAddress) return;

    const createdJob: JobVacancy = {
      id: "vaga-" + Date.now(),
      title: newTitle.toUpperCase(),
      category: newCategory,
      urgencyLevel: newUrgency,
      quantity: "1 Vaga Imediata",
      pay: newPay,
      address: newAddress,
      landmark: newLandmark || "São Paulo - SP",
      region: newRegion,
      workingHours: newHours || "Horário a combinar",
      requirements: [
        "Disponibilidade imediata",
        "Chamar no WhatsApp com nome e experiência",
      ],
      contactName: newContactName || "Recrutador",
      contactRole: newContactRole || "Produtor de Staff / RH",
      contactPhone: newContactPhone,
      notes: newNotes,
      postedAt: "Agora mesmo",
      isVerified: true,
      rawWhatsAppText: `🚨 *${newTitle.toUpperCase()}*\n${newUrgency}\n\n📍 ${newAddress}\n*${newLandmark}*\n\n💵 ${newPay}\n⏰ ${newHours}\n\n${
        newNotes ? `*${newNotes}*\n\n` : ""
      }👤 Contato: ${newContactName} (${newContactRole})\n📱 WhatsApp: ${newContactPhone}`,
    };

    onAddVacancy(createdJob);
    setIsPostModalOpen(false);

    // Reset Form
    setNewTitle("");
    setNewPay("");
    setNewAddress("");
    setNewLandmark("");
    setNewHours("");
    setNewContactName("");
    setNewContactPhone("");
    setNewNotes("");
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Slider with Available Slots */}
      <JobSlotsSlider
        vacancies={vacancies}
        onOpenGroup={onOpenGroup}
      />

      {/* Header Live Radar Banner with Small Title */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-5 sm:p-6 text-white border border-emerald-500/30 shadow-xl relative overflow-hidden">
        {/* Glowing Waves */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-red-600/90 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                Radar de Vagas ao Vivo
              </span>
              <span className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {vacancies.length} Vagas Monitoradas Hoje
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
              Vagas, Diárias & <span className="text-emerald-400">Empregos CLT em São Paulo</span>
            </h2>

            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Vagas com contratação imediata para eventos, bares, restaurantes, supermercados e entregas com contato direto via WhatsApp.
            </p>
          </div>

          {/* Quick Actions Header Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
            <button
              onClick={onOpenGroup}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current text-slate-950" />
              <span>Grupo WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
            </button>

            <button
              onClick={() => setIsPostModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>Divulgar Vaga</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Navigation */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por cargo (ex: Cumim, Repositor, Caixa, Garçom), bairro ou produtor..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Region Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-bold flex items-center gap-1 shrink-0">
            <MapPin className="w-3.5 h-3.5" /> Região:
          </span>
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer text-[11px] ${
                selectedRegion === reg
                  ? "bg-slate-900 text-white font-bold"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {reg === "todas" ? "Todas as Regiões" : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>
            Mostrando <strong>{filteredVacancies.length}</strong> vagas disponíveis no radar
          </span>
        </div>
        <div className="text-[11px] text-slate-400 font-medium">
          Feed atualizado ao vivo
        </div>
      </div>

      {/* Vacancy Feed Cards Grid */}
      {filteredVacancies.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredVacancies.map((job) => {
            const isUrgent = job.category === "urgente_agora" || job.urgencyLevel.includes("AGORA");
            return (
              <div
                key={job.id}
                className={`bg-white rounded-3xl border transition-all duration-200 shadow-sm hover:shadow-md relative overflow-hidden flex flex-col justify-between ${
                  isUrgent
                    ? "border-red-300 ring-2 ring-red-500/10"
                    : "border-slate-200 hover:border-emerald-300"
                }`}
              >
                {/* Top Urgency Header Ribbon */}
                <div
                  className={`px-5 py-2.5 flex items-center justify-between text-xs font-bold ${
                    isUrgent
                      ? "bg-gradient-to-r from-red-600 to-rose-700 text-white"
                      : "bg-slate-900 text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {isUrgent ? (
                      <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
                    ) : (
                      <Briefcase className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    )}
                    <span className="truncate">{job.urgencyLevel}</span>
                  </div>
                  <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full shrink-0">
                    {job.postedAt}
                  </span>
                </div>

                {/* Card Main Body */}
                <div className="p-5 sm:p-6 space-y-4 flex-1">
                  {/* Title & Pay Block */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                        {job.title}
                      </h3>
                      <span className="inline-block bg-slate-100 text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-md mt-1">
                        {job.quantity}
                      </span>
                    </div>

                    <div className="sm:text-right bg-emerald-50 border border-emerald-200 p-2.5 rounded-2xl shrink-0">
                      <div className="text-[10px] uppercase font-black text-emerald-800 tracking-wider">
                        Remuneração
                      </div>
                      <div className="text-base font-black text-emerald-700">
                        {job.pay}
                      </div>
                    </div>
                  </div>

                  {/* Location & Landmark */}
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">{job.address}</span>
                        {job.landmark && (
                          <div className="text-slate-500 font-semibold mt-0.5">
                            📍 {job.landmark}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-800">{job.workingHours}</span>
                    </div>
                  </div>

                  {/* Recruiter Instruction Notice Box */}
                  {job.notes && (
                    <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-3 text-xs text-amber-950 font-bold space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-900 text-[11px] uppercase tracking-wider">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        Aviso do Recrutador / Produtor:
                      </div>
                      <p className="text-[11px] text-amber-900/90 font-semibold leading-relaxed">
                        {job.notes}
                      </p>
                    </div>
                  )}

                  {/* Requirements List */}
                  {job.requirements && job.requirements.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Requisitos & Instruções:
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recruiter / Staff Info */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {job.contactName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-black text-slate-900">{job.contactName}</div>
                        <div className="text-[10px] text-slate-500 font-semibold">
                          {job.contactRole} • {job.contactPhone}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                      Verificado ✓
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons Bar */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap sm:flex-nowrap items-center gap-2">
                  {/* WhatsApp Direct Candidacy */}
                  <button
                    onClick={() => handleOpenWhatsAppCandidate(job)}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs py-3 px-4 rounded-xl transition shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-current text-white" />
                    <span>Candidatar no WhatsApp</span>
                  </button>

                  {/* Copy Job Data Text */}
                  <button
                    onClick={() => handleCopyJobData(job)}
                    className={`px-3 py-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                      copiedJobId === job.id
                        ? "bg-emerald-100 border-emerald-400 text-emerald-900"
                        : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                    title="Copiar dados da vaga para compartilhar"
                  >
                    {copiedJobId === job.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="hidden sm:inline">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span className="hidden sm:inline">Copiar Vaga</span>
                      </>
                    )}
                  </button>

                  {/* Open in Google Maps */}
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          job.address
                        )}`,
                        "_blank"
                      )
                    }
                    className="p-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                    title="Ver endereço no Google Maps"
                  >
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            Nenhuma vaga encontrada com os filtros selecionados
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Tente buscar com outros termos ou selecione "Todas as Regiões" para visualizar todas as oportunidades do radar.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("todas");
              setSelectedRegion("todas");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Modal: Divulgar Nova Vaga no Radar */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-scaleUp">
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black">
                  ➕
                </div>
                <div>
                  <h3 className="font-black text-base text-white">Publicar Vaga no Radar</h3>
                  <p className="text-[11px] text-slate-400">Divulgue diárias, freelas e vagas CLT ao vivo</p>
                </div>
              </div>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitNewJob} className="p-5 sm:p-6 space-y-4 text-xs">
              <div>
                <label className="font-black text-slate-900 block mb-1">
                  Título do Cargo / Função *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: CUMIM MASCULINO, REPOSITOR DE LOJA, GARÇOM..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-black text-slate-900 block mb-1">
                    Tipo de Vaga *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="urgente_agora">🚨 Urgente / Para Agora</option>
                    <option value="diaria">⚡ Diária / Freelance</option>
                    <option value="clt">💼 Vaga CLT Efetiva</option>
                    <option value="eventos_restaurante">🍽️ Bar / Restaurante / Evento</option>
                    <option value="logistica_supermercado">🏪 Supermercado / Logística</option>
                  </select>
                </div>

                <div>
                  <label className="font-black text-slate-900 block mb-1">
                    Valor Pago / Remuneração *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: R$ 200,00 (Pago Quinta) ou R$ 1.900 + VT"
                    value={newPay}
                    onChange={(e) => setNewPay(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-black text-slate-900 block mb-1">
                  Endereço Completo do Local *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: R. Sapucaia, 572 - Água Rasa, São Paulo - SP"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-black text-slate-900 block mb-1">
                    Ponto de Referência
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Próximo à Estação Belém"
                    value={newLandmark}
                    onChange={(e) => setNewLandmark(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-black text-slate-900 block mb-1">
                    Região de SP
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Zona Leste / Belém"
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-black text-slate-900 block mb-1">
                  Horário de Trabalho & Refeição
                </label>
                <input
                  type="text"
                  placeholder="Ex: Pra agora até as 23:00 • 1h almoço (Refeição no local)"
                  value={newHours}
                  onChange={(e) => setNewHours(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-black text-slate-900 block mb-1">
                    Seu Nome (Produtor / RH) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Paulo Gontijo"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-black text-slate-900 block mb-1">
                    WhatsApp para Contato *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 11952325701"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-black text-slate-900 block mb-1">
                  Observações / Exigências no WhatsApp
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Enviar foto de perfil e região no PV. Não respondo sem foto..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Send className="w-4 h-4" />
                <span>Publicar Vaga no Radar ao Vivo</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
