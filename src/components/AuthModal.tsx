import React, { useState, useEffect } from "react";
import { UserProfile, JobVacancy } from "../types";
import {
  X,
  ShieldCheck,
  ArrowRight,
  Flame,
  Check,
  Video,
  Clock,
  Sparkles,
  Copy,
  Laptop,
  Briefcase,
} from "lucide-react";
import { safeCopyText } from "../utils/clipboard";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  onOpenRadar?: () => void;
  vacancies?: JobVacancy[];
}

const HUB_PROMO_URL = "https://ai.hub.xyz/r/8G5GNCTF";
const HUB_REFERRAL_CODE = "8G5GNCTF";

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [countdown, setCountdown] = useState(5);
  const [isAutoRedirect, setIsAutoRedirect] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = async () => {
    await safeCopyText(HUB_REFERRAL_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleOpenHub = () => {
    window.open(HUB_PROMO_URL, "_blank");
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: "Usuário Hub",
      email: "homeoffice.hub@yamma.com.br",
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
      handleOpenHub();
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
      setCopiedCode(false);
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
        className="bg-white rounded-3xl border-2 border-emerald-500/80 shadow-2xl max-w-md w-full overflow-hidden relative animate-scaleUp flex flex-col text-center"
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

        {/* Hero Hub Header */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 pt-7 pb-6 text-white relative overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/25 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-black uppercase px-3.5 py-1 rounded-full shadow-md mb-3 border border-emerald-400/40">
            <Flame className="w-3.5 h-3.5 fill-current text-yellow-300 animate-pulse" />
            <span>OPORTUNIDADE HOME OFFICE • HUB</span>
          </div>

          {/* Central Animated Badge / Icon */}
          <div className="relative inline-flex items-center justify-center mb-2">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-slate-900 to-slate-800 border-2 border-emerald-500 shadow-xl flex items-center justify-center animate-bounce duration-1000">
              <span className="text-3xl">💻</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm border border-white/40">
              HUB AI
            </div>
          </div>

          {/* Punchy Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            Trabalhe em Casa no Hub: R$ 30/Hora!
          </h2>

          <p className="text-xs sm:text-sm text-emerald-200 font-bold mt-1.5 leading-snug">
            Ganhe dinheiro assistindo e avaliando vídeos online. Totalmente sem custo! Use o código <span className="text-yellow-300 font-extrabold">{HUB_REFERRAL_CODE}</span>.
          </p>
        </div>

        {/* Content & Action Area */}
        <div className="p-5 sm:p-6 space-y-4 bg-white flex-1 flex flex-col justify-between">
          {/* Highlight Card for Referral Code */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-300/80 rounded-2xl p-3.5 shadow-sm text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3" />
              <span>CÓDIGO DE CONVITE OFICIAL</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="bg-slate-900 text-white font-mono font-black text-base sm:text-lg px-3.5 py-1.5 rounded-xl border border-slate-700 shadow-inner tracking-wider">
                {HUB_REFERRAL_CODE}
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer active:scale-95 shadow-xs"
                title="Copiar Código"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs font-bold text-slate-700 leading-snug">
              Cadastre-se gratuitamente no Hub para ativar sua conta e começar a lucrar com vídeos.
            </p>
          </div>

          {/* Quick Value Highlights */}
          <div className="grid grid-cols-3 gap-2 text-left">
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <Clock className="w-5 h-5 text-emerald-600 mb-0.5" />
              <span className="text-[11px] font-black text-slate-900 leading-tight">
                R$ 30 / Hora
              </span>
              <span className="text-[9px] text-slate-500 font-medium">Por hora ativa</span>
            </div>

            <div className="bg-teal-50/80 border border-teal-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <Video className="w-5 h-5 text-teal-600 mb-0.5" />
              <span className="text-[11px] font-black text-slate-900 leading-tight">
                Vídeos
              </span>
              <span className="text-[9px] text-slate-500 font-medium">Assista & ganhe</span>
            </div>

            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-2.5 flex flex-col items-center text-center">
              <ShieldCheck className="w-5 h-5 text-blue-600 mb-0.5" />
              <span className="text-[11px] font-black text-slate-900 leading-tight">
                Sem Custo
              </span>
              <span className="text-[9px] text-slate-500 font-medium">100% Grátis</span>
            </div>
          </div>

          {/* User message card */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700 bg-emerald-50/70 py-2.5 px-3.5 rounded-xl border border-emerald-200 font-semibold leading-relaxed">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
            <span>Trabalhe em casa no Hub, R$ 30 por hora, ganhando com vídeos, totalmente sem custo!</span>
          </div>

          {/* Big High-Converting CTA Button */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleOpenHub}
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base py-4 px-4 rounded-2xl transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] border-2 border-emerald-300 animate-pulse hover:animate-none"
            >
              <span>👉 COMEÇAR NO HUB (R$ 30/HORA)</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>

            {/* Countdown / Status Line */}
            {isAutoRedirect ? (
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Abrindo Hub em <strong className="text-emerald-700 font-bold">{countdown}s</strong>...</span>
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
            <div className="flex items-center gap-1 truncate max-w-[240px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">Link: ai.hub.xyz/r/8G5GNCTF</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 hover:underline cursor-pointer font-medium shrink-0 ml-2"
            >
              Continuar no App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
