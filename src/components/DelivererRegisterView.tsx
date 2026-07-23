import React, { useState } from "react";
import { BikeType, DelivererProfile } from "../types";
import {
  Bike,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  User,
  Phone,
  CreditCard,
  MapPin,
  Sparkles,
  DollarSign,
  Award,
  AlertCircle,
  FileCheck,
  Check,
  TrendingUp,
} from "lucide-react";

interface DelivererRegisterViewProps {
  deliverers: DelivererProfile[];
  onRegisterDeliverer: (deliverer: DelivererProfile) => void;
}

export const DelivererRegisterView: React.FC<DelivererRegisterViewProps> = ({
  deliverers,
  onRegisterDeliverer,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [bikeType, setBikeType] = useState<BikeType>("ebike");
  const [bikeModel, setBikeModel] = useState("");
  const [neighborhood, setNeighborhood] = useState("Jardim Aracati / Taquandava");
  const [availability, setAvailability] = useState<"24h" | "diurno" | "noturno">("24h");
  const [pixKey, setPixKey] = useState("");

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !cpf.trim()) return;

    const newDeliverer: DelivererProfile = {
      id: "deliv-" + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      cpf: cpf.trim(),
      bikeType,
      bikeModel: bikeModel.trim() || (bikeType === "ebike" ? "E-Bike Urbana Cargo 350W" : "Bike MTB Aro 29 Reforçada"),
      neighborhood,
      availability,
      status: "Ativo no Radar",
      rating: 5.0,
      totalDeliveries: 0,
      avatarUrl: bikeType === "ebike"
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      pixKey: pixKey.trim() || phone.trim(),
    };

    onRegisterDeliverer(newDeliverer);
    setSubmittedSuccess(true);

    // Reset form
    setName("");
    setPhone("");
    setCpf("");
    setBikeModel("");
    setPixKey("");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <Bike className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Seja um Entregador Parceiro Eco-Bike 24h</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Pedale, Entregue e Ganhe com Baixo Custo e Zero Emissão
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Cadastre sua bicicleta elétrica ou mecânica para fazer entregas 24 horas nos mercados e lojas da sua região (Jardim Aracati, Vila de São Paulo, Pava, Taquandava). Pagamento rápido via PIX, suporte local e flexibilidade total de horários!
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-amber-300">
            <span className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
              <Zap className="w-4 h-4 text-emerald-400 fill-current" /> E-Bikes & Bikes Mecânicas
            </span>
            <span className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
              <Clock className="w-4 h-4 text-amber-400" /> Atendimento 24 Horas
            </span>
            <span className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Repasse Integral via PIX
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Form + Benefits & Fleet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Registration Form (7 Spans) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-red-600" />
                Formulário de Cadastro de Entregador(a)
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Preencha seus dados para ativação imediata no radar da frota
              </p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-200">
              Aprovação Rápida 24h
            </span>
          </div>

          {submittedSuccess ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-emerald-950">
                Cadastro Realizado com Sucesso!
              </h4>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Você já foi integrado à frota do radar local e está habilitado para receber corridas de entrega com sua bike no Jardim Aracati, Pava, Vila de São Paulo e Taquandava.
              </p>
              <button
                onClick={() => setSubmittedSuccess(false)}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold rounded-2xl transition shadow-md"
              >
                Cadastrar Outro Entregador
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Celular *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-8888"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    CPF *
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chave PIX para Recebimentos
                  </label>
                  <input
                    type="text"
                    placeholder="E-mail, CPF ou Celular"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Bike Vehicle Type Selection */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-2">
                  Tipo de Bicicleta *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setBikeType("ebike")}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3 ${
                      bikeType === "ebike"
                        ? "bg-amber-50 border-amber-400 text-slate-900 shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <div className="p-2 bg-amber-400 text-slate-950 rounded-xl font-black shrink-0">
                      <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1">
                        Bicicleta Elétrica (E-Bike)
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        Maior autonomia para morros, subidas e entregas pesadas 24h.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => setBikeType("mechanical_bike")}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3 ${
                      bikeType === "mechanical_bike"
                        ? "bg-amber-50 border-amber-400 text-slate-900 shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <div className="p-2 bg-slate-900 text-white rounded-xl font-black shrink-0">
                      <Bike className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1">
                        Bicicleta Mecânica (Pedal)
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        Sustentabilidade total, custo zero de recarga e treino físico.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bike Model & Equipment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Modelo / Marca da Bike
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Caloi E-Vibe ou GTS Aro 29"
                    value={bikeModel}
                    onChange={(e) => setBikeModel(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Região Principal de Atuação
                  </label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                  >
                    <option value="Jardim Aracati / Taquandava">Jardim Aracati / Taquandava</option>
                    <option value="Vila de São Paulo / Anatoli">Vila de São Paulo / Anatoli</option>
                    <option value="Pava / Jardim São Luís">Pava / Jardim São Luís</option>
                    <option value="Todas as Regiões (24h Express)">Todas as Regiões (24h Express)</option>
                  </select>
                </div>
              </div>

              {/* Availability Shift */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Disponibilidade de Horário
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "24h", label: "24h Flexível" },
                    { id: "diurno", label: "Turno Diurno" },
                    { id: "noturno", label: "Corujão 24h" },
                  ].map((sh) => (
                    <button
                      key={sh.id}
                      type="button"
                      onClick={() => setAvailability(sh.id as any)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                        availability === sh.id
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {sh.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-sm py-4 rounded-2xl transition shadow-xl shadow-red-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <Bike className="w-5 h-5" />
                <span>Concluir Cadastro & Ativar no Radar Eco-Bike</span>
              </button>
            </form>
          )}
        </div>

        {/* Fleet Roster & Benefits Panel (5 Spans) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Earnings Estimator */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="font-extrabold text-base text-white">
                Estimativa de Ganhos na Frota Eco-Bike
              </h3>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium">Médio por dia (6h a 8h):</span>
                <span className="text-2xl font-black text-emerald-400">R$ 180 - R$ 320</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Taxa Baixa de Entrega:</span>
                <span className="font-bold text-amber-300">R$ 3,90 a R$ 6,50 / corrida</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Bônus Turno 24h Corujão:</span>
                <span className="font-bold text-emerald-400">+25% por entrega</span>
              </div>
            </div>

            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Sem taxa de comissão abusiva
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Recebimento via PIX
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Atendimento presencial no mercado parceiro
              </li>
            </ul>
          </div>

          {/* Active Registered Fleet Roster */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-red-600" />
              Entregadores Destaque no Radar ({deliverers.length})
            </h3>

            <div className="space-y-3">
              {deliverers.map((deliv) => (
                <div
                  key={deliv.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={deliv.avatarUrl}
                      alt={deliv.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-300 shrink-0"
                    />
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">
                        {deliv.name}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        {deliv.bikeModel} • {deliv.neighborhood.split("/")[0]}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full block mb-0.5">
                      ★ {deliv.rating}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {deliv.bikeType === "ebike" ? "⚡ E-Bike" : "🚲 Pedal"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
