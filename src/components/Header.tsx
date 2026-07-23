import React from "react";
import {
  Store,
  QrCode,
  ShoppingBag,
  Sparkles,
  Search,
  Monitor,
  Flame,
  Settings,
  ChevronDown,
  CheckCircle2,
  Clock,
  PhoneCall,
  MapPin,
  User,
  Gift,
  LogOut,
  Lock,
  Bike,
  Truck,
  Zap,
} from "lucide-react";
import { AppMode, StoreUnit, UserProfile } from "../types";

interface HeaderProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  selectedStore: StoreUnit;
  setSelectedStore: (store: StoreUnit) => void;
  stores: StoreUnit[];
  cartCount: number;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  setMode,
  selectedStore,
  setSelectedStore,
  stores,
  cartCount,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [showStoreDropdown, setShowStoreDropdown] = React.useState(false);


  return (
    <header className="bg-white text-slate-800 shadow-sm sticky top-0 z-40 border-b border-slate-200">
      {/* Top Banner - Store Selector & Status */}
      <div className="bg-slate-100 px-4 py-1.5 text-xs text-slate-600 flex flex-wrap justify-between items-center gap-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-slate-700">
            <Store className="w-3.5 h-3.5 text-red-600" />
            Super Yama Supermercados
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div className="relative">
            <button
              onClick={() => setShowStoreDropdown(!showStoreDropdown)}
              className="flex items-center gap-1 text-slate-800 hover:text-red-600 font-semibold transition bg-white hover:bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>{selectedStore.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
            </button>

            {showStoreDropdown && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 p-2 text-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">
                  Selecione a Unidade Yama
                </div>
                {stores.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStore(s);
                      setShowStoreDropdown(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg mb-1 flex flex-col gap-0.5 transition ${
                      s.id === selectedStore.id
                        ? "bg-red-50 text-red-700 border border-red-200 font-bold"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span className="flex items-center gap-1">
                        {s.name}
                        {s.id === selectedStore.id && (
                          <CheckCircle2 className="w-3 h-3 text-red-600" />
                        )}
                      </span>
                      <span className="text-[10px] text-amber-600 font-mono">
                        {s.distance}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{s.address}</div>
                    <div className="flex items-center gap-2 text-[10px] text-emerald-700 mt-1">
                      <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                        {s.status} até {s.closingTime}
                      </span>
                      <span className="text-slate-500">⭐ {s.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          {/* User Account Login Status Badge */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-[11px] font-bold">
              <span className="flex items-center gap-1 text-slate-800">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
              </span>
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded text-[10px] font-black uppercase flex items-center gap-0.5">
                <Gift className="w-3 h-3" /> 5% OFF
              </span>
              <button
                onClick={onLogout}
                className="text-slate-400 hover:text-red-600 transition ml-1"
                title="Sair da Conta"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] px-3 py-1 rounded-lg transition shadow-xs"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Entrar e Ganhar 5% OFF</span>
            </button>
          )}

          <span className="hidden sm:inline text-slate-300">|</span>
          <div className="text-xs text-green-600 font-semibold flex items-center justify-end gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Servidor
          </div>
        </div>

      </div>

      {/* Main Header Branding & Modes */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Super Yama */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            onClick={() => setMode("consulta")}
            className="cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center font-black text-2xl text-white shadow-md group-hover:bg-red-700 transition">
              <span className="tracking-tight">Y</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-800">
                  SUPER YAMA <span className="text-red-600">SUPERMERCADOS</span>
                </h1>
                <span className="bg-red-100 text-red-700 border border-red-200 text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded">
                  Ao Vivo
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                Rede Multi-Lojas • Entregas 24h em E-Bikes com Baixo Custo
              </p>
            </div>
          </div>

          {/* Mobile Cart / Mode Indicator */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMode("carrinho")}
              className="relative bg-slate-100 p-2.5 rounded-xl text-slate-800 border border-slate-200"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200 w-full md:w-auto overflow-x-auto scrollbar-none">
          <button
            onClick={() => setMode("consulta")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              currentMode === "consulta"
                ? "bg-red-600 text-white shadow-md shadow-red-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            <Search className="w-4 h-4" />
            Consulta & Lojas
          </button>

          <button
            onClick={() => setMode("rastreio")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              currentMode === "rastreio"
                ? "bg-emerald-600 text-white shadow-md font-black"
                : "text-slate-700 hover:text-slate-900 hover:bg-white bg-emerald-50/80 border border-emerald-200/60"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400 fill-current" />
            Rastreio GPS 24h (E-Bike)
          </button>

          <button
            onClick={() => setMode("cadastro_entregador")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              currentMode === "cadastro_entregador"
                ? "bg-amber-400 text-slate-950 font-black shadow-md"
                : "text-slate-700 hover:text-slate-900 hover:bg-white bg-amber-50/80 border border-amber-200/60"
            }`}
          >
            <Bike className="w-4 h-4 text-red-600" />
            Seja Entregador(a)
          </button>

          <button
            onClick={() => setMode("totem")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              currentMode === "totem"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            <Monitor className="w-4 h-4" />
            Totem Kiosk
          </button>

          <button
            onClick={() => setMode("encarte")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              currentMode === "encarte"
                ? "bg-amber-500 text-white shadow-md font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            <Flame className="w-4 h-4 text-red-600" />
            Encarte Ofertas
          </button>

          <button
            onClick={() => setMode("carrinho")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition relative ${
              currentMode === "carrinho"
                ? "bg-red-600 text-white shadow-md shadow-red-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Carrinho
            {cartCount > 0 && (
              <span className="bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMode("ia_assistente")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              currentMode === "ia_assistente"
                ? "bg-purple-700 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            IA Leitora & Dicas
          </button>

          <button
            onClick={() => setMode("gestor")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              currentMode === "gestor"
                ? "bg-slate-800 text-amber-300 shadow-md"
                : "text-slate-500 hover:text-slate-900 hover:bg-white"
            }`}
            title="Painel de Atualização de Preços para Funcionários"
          >
            <Settings className="w-4 h-4" />
            Gestor
          </button>
        </nav>
      </div>
    </header>
  );
};
