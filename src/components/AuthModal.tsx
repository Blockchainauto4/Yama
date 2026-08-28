import React, { useState, useEffect } from "react";
import { UserProfile, JobVacancy } from "../types";
import {
  X,
  ShieldCheck,
  ArrowRight,
  Flame,
  Check,
  ShoppingBag,
  Store,
  Sparkles,
  Gift,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  onOpenRadar?: () => void;
  vacancies?: JobVacancy[];
}

const KWAI_PROMO_URL = "https://k.kwai.com/w/a3Cy6Cjb";

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [countdown, setCountdown] = useState(5);
  const [isAutoRedirect, setIsAutoRedirect] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenKwai = () => {
    window.open(KWAI_PROMO_URL, "_blank");
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: "Usuário Bônus Kwai",
      email: "bonus.kwai@yamma.com.br",
      welcomeDiscountActive: true,
      discountPercent: 50,
    };
    onLogin(newUser);
    onClose();
  };

  // 5-second countdown timer for auto-redirect
  useEffect(() => {
    if (!isOpen || !isAutoRedirect || isHovered) return;

    if (countdown <= 0) {
      handleOpenKwai();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, countdown, isAutoRedirect, isHovered]);

  // Reset timer on open
  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      setIsAutoRedirect(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl border-2 border-orange-500/80 shadow-2xl max-w-md w-full overflow-hidden relative animate-scaleUp flex flex-col text-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-black/30 hover:bg-black/50 text-white rounded-full transition cursor-pointer z-20 backdrop-blur-xs"
          title="Fechar"
          aria-label="Fechar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Kwai Header */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-6 pt-7 pb-6 text-white relative overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-orange-500/25 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white text-[11px] font-black uppercase px-3.5 py-1 rounded-full shadow-md mb-3 border border-orange-400/40">
            <Flame className="w-3.5 h-3.5 fill-current text-yellow-300 animate-pulse" />
            <span>BÔNUS EXCLUSIVO KWAI</span>
          </div>

          {/* Central Animated Badge / Icon */}
          <div className="relative inline-flex items-center justify-center mb-2">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-slate-900 to-slate-800 border-2 border-orange-500 shadow-xl flex items-center justify-center animate-bounce duration-1000">
              <span className="text-3xl">🎁</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm border border-white/40">
              KWAI
            </div>
          </div>

          {/* Punchy Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            Ganhe Bônus no Kwai!
          </h2>

          <p className="text-xs sm:text-sm text-orange-200 font-bold mt-1.5 leading-snug">
            Clica no link e se você for um novo ou inativo usuário do Kwai, já ganha R$0.5! Não vai te custar nada～
          </p>
        </div>

        {/* Content & Action Area */}
        <div className="p-5 sm:p-6 space-y-4 bg-white flex-1 flex flex-col justify-between">
          {/* Highlight Card for Kwai Bonus */}
          <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-300/80 rounded-2xl p-3.5 shadow-sm text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3" />
              <span>BÔNUS DIRETO NA CONTA</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">
              Ganhe <span className="text-orange-600 text-xl font-black">R$ 0,50 a R$ 100</span>
            </h3>
            <p className="text-xs font-bold text-slate-700 leading-snug">
              Basta clicar e abrir seu Kwai para resgatar na hora.
            </p>
          </div>

          {/* Quick Value Highlights */}
          <div className="grid grid-cols-3 gap-2 text-left">
            <div className="bg-orange-50/80 border border-orange-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <Gift className="w-5 h-5 text-orange-600 mb-0.5" />
              <span className="text-[11px] font-black text-slate-900 leading-tight">
                R$ 0.5 na Hora
              </span>
              <span className="text-[9px] text-slate-500 font-medium">Novo/Inativo</span>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <Store className="w-5 h-5 text-amber-600 mb-0.5" />
              <span className="text-[11px] font-black text-slate-900 leading-tight">
                50% OFF
              </span>
              <span className="text-[9px] text-slate-500 font-medium">Supermercado</span>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <span className="text-base">⚡</span>
              <span className="text-[11px] font-black text-slate-900 leading-tight">
                Sem Custo
              </span>
              <span className="text-[9px] text-slate-500 font-medium">100% Grátis</span>
            </div>
          </div>

          {/* User verbatim message card */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700 bg-orange-50/70 py-2.5 px-3.5 rounded-xl border border-orange-200 font-semibold leading-relaxed">
            <Check className="w-4 h-4 text-orange-600 shrink-0 font-bold" />
            <span>Clica no link e se você for um novo ou inativo usuário do Kwai, já ganha R$0.5! Não vai te custar nada～</span>
          </div>

          {/* Big High-Converting CTA Button */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleOpenKwai}
              className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm sm:text-base py-4 px-4 rounded-2xl transition shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] border-2 border-orange-300 animate-pulse hover:animate-none"
            >
              <span>👉 CLICAR PARA GANHAR NO KWAI</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>

            {/* Countdown / Status Line */}
            {isAutoRedirect ? (
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span>Abrindo Kwai em <strong className="text-orange-700 font-bold">{countdown}s</strong>...</span>
                <button
                  onClick={() => setIsAutoRedirect(false)}
                  className="text-slate-400 hover:text-slate-700 underline cursor-pointer"
                >
                  Pausar
                </button>
              </div>
            ) : (
              <div className="text-[11px] text-slate-400">
                <span>Pausado • </span>
                <button
                  onClick={() => {
                    setCountdown(5);
                    setIsAutoRedirect(true);
                  }}
                  className="text-orange-700 font-bold underline cursor-pointer"
                >
                  Reativar timer (5s)
                </button>
              </div>
            )}
          </div>

          {/* Footer Security Badges */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
              <span>Link Oficial: k.kwai.com/w/a3Cy6Cjb</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 hover:underline cursor-pointer font-medium"
            >
              Continuar no App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
