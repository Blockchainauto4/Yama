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
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  onOpenRadar?: () => void;
  vacancies?: JobVacancy[];
}

const TIKTOK_PROMO_URL = "https://www.tiktok.com/d/1/ZS9BM3LAvA1wN-TUGxP/";

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [countdown, setCountdown] = useState(5);
  const [isAutoRedirect, setIsAutoRedirect] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenTikTok = () => {
    window.open(TIKTOK_PROMO_URL, "_blank");
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: "Usuário Bônus TikTok",
      email: "bonus.tiktok@yamma.com.br",
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
      handleOpenTikTok();
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
        className="bg-white rounded-3xl border-2 border-rose-500/80 shadow-2xl max-w-md w-full overflow-hidden relative animate-scaleUp flex flex-col text-center"
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

        {/* Hero TikTok Header */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 px-6 pt-7 pb-6 text-white relative overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-rose-500/25 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-[11px] font-black uppercase px-3.5 py-1 rounded-full shadow-md mb-3 border border-rose-400/40">
            <Flame className="w-3.5 h-3.5 fill-current text-amber-300 animate-pulse" />
            <span>EVENTO POR TEMPO LIMITADO</span>
          </div>

          {/* Central Animated Badge / Icon */}
          <div className="relative inline-flex items-center justify-center mb-2">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-slate-900 to-slate-800 border-2 border-rose-500 shadow-xl flex items-center justify-center animate-bounce duration-1000">
              <span className="text-3xl">🎁</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm border border-white/40">
              TIKTOK
            </div>
          </div>

          {/* Punchy Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            Você já viu isso no TikTok?
          </h2>

          <p className="text-xs sm:text-sm text-rose-300 font-bold mt-1.5 leading-snug">
            Tem um evento de recompensas acontecendo por tempo limitado!
          </p>
        </div>

        {/* Content & Action Area */}
        <div className="p-5 sm:p-6 space-y-4 bg-white flex-1 flex flex-col justify-between">
          {/* Highlight Card for R$50 Supermarket Bonus */}
          <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border-2 border-rose-300/80 rounded-2xl p-3.5 shadow-sm text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3" />
              <span>BÔNUS EXCLUSIVO DE SUPERMERCADO</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">
              Ganhe <span className="text-rose-600 text-xl font-black">R$ 50 de Bônus</span>
            </h3>
            <p className="text-xs font-bold text-slate-700 leading-snug">
              Válido para compras em todos os supermercados da rede fazendo a missão.
            </p>
          </div>

          {/* Quick Value Highlights (3 High-Impact Points) */}
          <div className="grid grid-cols-3 gap-2 text-left">
            <div className="bg-rose-50/80 border border-rose-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <ShoppingBag className="w-5 h-5 text-rose-600 mb-0.5" />
              <span className="text-[11px] font-black text-slate-900 leading-tight">
                R$ 50 Bônus
              </span>
              <span className="text-[9px] text-slate-500 font-medium">Nas compras</span>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <Store className="w-5 h-5 text-amber-600 mb-0.5" />
              <span className="text-[11px] font-black text-slate-900 leading-tight">
                Toda a Rede
              </span>
              <span className="text-[9px] text-slate-500 font-medium">Supermercados</span>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <span className="text-base">⚡</span>
              <span className="text-[11px] font-black text-slate-900 leading-tight">
                Missão Fácil
              </span>
              <span className="text-[9px] text-slate-500 font-medium">No TikTok</span>
            </div>
          </div>

          {/* Simple Explanation Note */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700 bg-slate-50 py-2 px-3 rounded-xl border border-slate-100 font-medium">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
            <span>Faça a missão no TikTok e garanta seu cupom na hora</span>
          </div>

          {/* Big High-Converting CTA Button */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleOpenTikTok}
              className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 text-white font-black text-sm sm:text-base py-4 px-4 rounded-2xl transition shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] border-2 border-rose-300 animate-pulse hover:animate-none"
            >
              <span>👉 CONFERIR EVENTO NO TIKTOK</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>

            {/* Countdown / Status Line */}
            {isAutoRedirect ? (
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Redirecionando em <strong className="text-rose-700 font-bold">{countdown}s</strong>...</span>
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
                  className="text-rose-700 font-bold underline cursor-pointer"
                >
                  Reativar timer (5s)
                </button>
              </div>
            )}
          </div>

          {/* Footer Security Badges */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
              <span>Link Oficial TikTok Recompensas</span>
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
