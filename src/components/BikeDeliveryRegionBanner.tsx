import React, { useState } from "react";
import {
  Bike,
  Zap,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Gift,
  ArrowRight,
  ChevronDown,
  Navigation,
} from "lucide-react";
import { UserProfile } from "../types";

interface BikeDeliveryRegionBannerProps {
  onOpenAuth: () => void;
  onOpenDeliveryTracker: () => void;
  currentUser: UserProfile | null;
}

const COVERED_REGIONS = [
  { name: "Cidade Ipava", time: "20-30 min", active: true, tag: "Sede Principal" },
  { name: "Chácara Santa Maria", time: "25-35 min", active: true, tag: "Frequente" },
  { name: "Taquandava", time: "30-40 min", active: true, tag: "Área Total" },
  { name: "Jardim Aracati", time: "25-35 min", active: true, tag: "Rota Diária" },
  { name: "Vila Calu", time: "30-40 min", active: true, tag: "Rotas E-Bike" },
  { name: "Jardim Vera Cruz", time: "30-45 min", active: true, tag: "Zona Sul" },
  { name: "Vila de São Paulo", time: "25-35 min", active: true, tag: "Área Total" },
  { name: "Parque Bologne", time: "35-45 min", active: true, tag: "Atendido" },
  { name: "Região M'Boi Mirim", time: "30-45 min", active: true, tag: "E-Bikes 24h" },
];

export const BikeDeliveryRegionBanner: React.FC<BikeDeliveryRegionBannerProps> = ({
  onOpenAuth,
  onOpenDeliveryTracker,
  currentUser,
}) => {
  const [selectedRegion, setSelectedRegion] = useState(COVERED_REGIONS[0]);
  const [showAllRegions, setShowAllRegions] = useState(false);

  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl border border-emerald-500/30 text-white p-5 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left column: Title & Highlights */}
        <div className="space-y-4 max-w-2xl">
          {/* Active Fleet Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Frota de E-Bikes Ativa na Região</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-2.5 py-1 rounded-full">
              <Zap className="w-3 h-3 fill-current" />
              <span>100% Ecológica & Rápida</span>
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight flex items-center gap-3">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Entregas Delivery de Bike
              </span>
              <span className="inline-block text-2xl sm:text-3xl">🚲</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium mt-2 leading-relaxed">
              Atendemos <strong className="text-white font-bold">toda a região e bairros vizinhos</strong> com entregadores parceiros locais. Compras acondicionadas em baú térmico lacrado, entregues direto na sua porta em tempo recorde!
            </p>
          </div>

          {/* Quick value cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>25 a 45 min</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">Tempo médio de entrega na região</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs mb-1">
                <Gift className="w-3.5 h-3.5" />
                <span>R$ 3,90 ou Grátis</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                {currentUser?.welcomeDiscountActive ? "Frete Grátis para Você!" : "Frete Grátis para Membros"}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Baú Térmico</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">Carnes frias e pão quente protegidos</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Toda a Região</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">Ipava, Taquandava, Calu e arredores</p>
            </div>
          </div>
        </div>

        {/* Right column: Neighborhood Coverage & Actions */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md lg:w-[380px] shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-black text-white uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Bairros com Entrega Ativa</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-bold">
              {COVERED_REGIONS.length} Regiões
            </span>
          </div>

          {/* Region Chips Selector */}
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-thin">
            {(showAllRegions ? COVERED_REGIONS : COVERED_REGIONS.slice(0, 6)).map((region) => {
              const isSelected = selectedRegion.name === region.name;
              return (
                <button
                  key={region.name}
                  onClick={() => setSelectedRegion(region)}
                  className={`text-xs px-2.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 shadow-sm"
                      : "bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  <Navigation className="w-2.5 h-2.5" />
                  <span>{region.name}</span>
                  <span className="text-[9px] opacity-80">({region.time})</span>
                </button>
              );
            })}
          </div>

          {COVERED_REGIONS.length > 6 && (
            <button
              onClick={() => setShowAllRegions(!showAllRegions)}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition cursor-pointer"
            >
              <span>{showAllRegions ? "Mostrar menos bairros" : `Ver todos os ${COVERED_REGIONS.length} bairros atendidos`}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllRegions ? "rotate-180" : ""}`} />
            </button>
          )}

          {/* Selected Region Status Card */}
          <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">Previsão em {selectedRegion.name}</span>
              <strong className="text-white font-black text-sm">{selectedRegion.time}</strong>
              <span className="text-[11px] text-slate-300 block">Entregadores de bike no setor</span>
            </div>
            <button
              onClick={onOpenDeliveryTracker}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black px-3 py-2 rounded-xl transition flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Rastrear</span>
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2 pt-1">
            {!currentUser ? (
              <button
                onClick={onOpenAuth}
                className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Gift className="w-4 h-4 text-slate-950" />
                <span>Cadastre-se como Membro (50% OFF)</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-2.5 text-center">
                <span className="text-xs font-black text-emerald-300 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Membro Ativo: {currentUser.name} (50% OFF + Entrega de Bike)
                </span>
              </div>
            )}

            <button
              onClick={onOpenDeliveryTracker}
              className="w-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer border border-white/10"
            >
              <Bike className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acompanhar Entregas de Bike ao Vivo</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
