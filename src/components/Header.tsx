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
  Gift, Headphones,
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
            Yammá Cotação de Preços
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
                  Selecione o Supermercado
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
                <Gift className="w-3 h-3" /> 50% OFF
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
              <Headphones className="w-3.5 h-3.5" />
              <span>Ouvir Fluxo & Liberar</span>
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
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Yammá */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            onClick={() => setMode("consulta")}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-700 to-indigo-500 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="tracking-tight">Y</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tighter text-slate-900">
                  yammá<span className="text-blue-600">.</span>
                </h1>
                <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full">
                  Cotações Ao Vivo
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest hidden sm:block mt-0.5">
                Rede Multi-Lojas • Entregas 24h
              </p>
            </div>
          </div>

          {/* Mobile Cart / Mode Indicator */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMode("carrinho")}
              className="relative bg-white p-2.5 rounded-xl text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-full md:w-auto overflow-x-auto scrollbar-none">
          <button
            onClick={() => setMode("consulta")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              currentMode === "consulta"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Search className="w-4 h-4" />
            Busca de Preços
          </button>
          <button
            onClick={() => setMode("carrinho")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all relative ${
              currentMode === "carrinho"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Carrinho
            {cartCount > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${currentMode === 'carrinho' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'}`}>
                {cartCount}
              </span>
            )}
          </button>
          
          <div className="w-px h-5 bg-slate-200 mx-1 hidden sm:block"></div>

          <button
            onClick={() => setMode("rastreio")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              currentMode === "rastreio"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Truck className="w-4 h-4" />
            <span className="hidden sm:inline">Rastreio</span>
          </button>
          <button
            onClick={() => setMode("encarte")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              currentMode === "encarte"
                ? "bg-orange-500 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Flame className="w-4 h-4" />
            <span className="hidden sm:inline">Ofertas</span>
          </button>
          <button
            onClick={() => setMode("ia_assistente")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              currentMode === "ia_assistente"
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
            title="Assistente IA"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode("totem")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              currentMode === "totem"
                ? "bg-slate-200 text-slate-900 border border-slate-300"
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
            }`}
            title="Modo Totem"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode("gestor")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              currentMode === "gestor"
                ? "bg-slate-200 text-slate-900 border border-slate-300"
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
            }`}
            title="Painel Gestor"
          >
            <Settings className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </header>
  );
};
