import React, { useState, useEffect } from "react";
import { UserProfile, JobVacancy } from "../types";
import {
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Coins,
  ArrowRight,
  Flame,
  Check,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  onOpenRadar?: () => void;
  vacancies?: JobVacancy[];
}

const KWAI_PROMO_URL = "https://k.kwai.com/w/mnTy5j4l";

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
      name: "Usuário Kwai Bônus",
      email: "kwai.bonus@yamma.com.br",
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
        className="bg-white rounded-3xl border-2 border-amber-400 shadow-2xl max-w-md w-full overflow-hidden relative animate-scaleUp flex flex-col text-center"
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

        {/* Hero Golden Header */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 px-6 pt-7 pb-6 text-slate-950 relative overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />

          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-1.5 bg-slate-950 text-amber-400 text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md mb-3">
            <Flame className="w-3.5 h-3.5 fill-current text-orange-400 animate-pulse" />
            <span>BÔNUS LIBERADO • NÃO CUSTA NADA</span>
          </div>

          {/* Central Animated Coin Icon */}
          <div className="relative inline-flex items-center justify-center mb-2">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-200 border-2 border-white shadow-xl flex items-center justify-center animate-bounce duration-1000">
              <Coins className="w-9 h-9 text-amber-900 fill-amber-500/20" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
              GRÁTIS
            </div>
          </div>

          {/* Punchy Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
            Ganhe <span className="underline decoration-red-600 decoration-wavy">R$ 1.200</span> na Hora!
          </h2>

          <p className="text-xs sm:text-sm text-slate-900 font-bold mt-1.5 leading-snug">
            Divida bilhões de Kwai Golds e faça seu resgate diário.
          </p>
        </div>

        {/* Content & Action Area */}
        <div className="p-5 sm:p-6 space-y-4 bg-white flex-1 flex flex-col justify-between">
          {/* Quick Value Highlights (3 High-Impact Points) */}
          <div className="grid grid-cols-3 gap-2 text-left">
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <span className="text-base">💵</span>
              <span className="text-[11px] font-black text-slate-900 mt-1 leading-tight">
                R$ 1.200
              </span>
              <span className="text-[9px] text-slate-500 font-medium">Bônus instantâneo</span>
            </div>

            <div className="bg-orange-50/80 border border-orange-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <span className="text-base">🏆</span>
              <span className="text-[11px] font-black text-slate-900 mt-1 leading-tight">
                758M Golds
              </span>
              <span className="text-[9px] text-slate-500 font-medium">Grande prêmio</span>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <span className="text-base">⚡</span>
              <span className="text-[11px] font-black text-slate-900 mt-1 leading-tight">
                Zero Custo
              </span>
              <span className="text-[9px] text-slate-500 font-medium">100% grátis</span>
            </div>
          </div>

          {/* Simple Explanation Note */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700 bg-slate-50 py-2 px-3 rounded-xl border border-slate-100 font-medium">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
            <span>Válido para novos usuários ou contas inativas</span>
          </div>

          {/* Big High-Converting CTA Button */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleOpenKwai}
              className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-black text-sm sm:text-base py-4 px-4 rounded-2xl transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] border-2 border-emerald-300 animate-pulse hover:animate-none"
            >
              <span>👉 CLIQUE AQUI PARA RESGATAR</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>

            {/* Countdown / Status Line */}
            {isAutoRedirect ? (
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>Redirecionando em <strong className="text-amber-700 font-bold">{countdown}s</strong>...</span>
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
                  className="text-emerald-700 font-bold underline cursor-pointer"
                >
                  Reativar timer (5s)
                </button>
              </div>
            )}
          </div>

          {/* Footer Security Badges */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Link Seguro Oficial Kwai</span>
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
