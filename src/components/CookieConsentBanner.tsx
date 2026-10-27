import React, { useState, useEffect } from "react";
import { ShieldCheck, Cookie, Settings, Check, ExternalLink, X } from "lucide-react";

interface CookieConsentBannerProps {
  onOpenPolicyModal: () => void;
  onConsentChange?: (hasAccepted: boolean) => void;
}

const COOKIE_STORAGE_KEY = "yamma_cookie_consent_v1";

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPolicyModal,
  onConsentChange,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!consent) {
        // Show after a brief delay so the page loads smoothly
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        if (onConsentChange) onConsentChange(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, [onConsentChange]);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({
          status: "accepted_all",
          date: new Date().toISOString(),
          categories: { essential: true, redirect: true, analytics: true },
        })
      );
    } catch {
      // ignore
    }
    setIsVisible(false);
    if (onConsentChange) onConsentChange(true);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({
          status: "accepted_essential",
          date: new Date().toISOString(),
          categories: { essential: true, redirect: false, analytics: false },
        })
      );
    } catch {
      // ignore
    }
    setIsVisible(false);
    if (onConsentChange) onConsentChange(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 animate-fadeIn pointer-events-none">
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-md text-white border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 text-left">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-black text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Política de Privacidade & Cookies (LGPD)
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
                Segurança Ativa
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Utilizamos cookies e tecnologias similares para personalizar ofertas de frete grátis, 
              salvar suas preferências e viabilizar o <strong>redirecionamento automático e seguro</strong> para 
              a plataforma parceira oficial (Hub Renda Extra). Ao clicar em "Aceitar Todos", você concorda com nossos termos.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={onOpenPolicyModal}
            className="text-xs text-slate-400 hover:text-white underline underline-offset-4 px-2 py-1.5 transition flex items-center gap-1 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Preferências</span>
          </button>

          <button
            onClick={handleAcceptEssential}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3.5 py-2.5 rounded-xl transition border border-slate-700 cursor-pointer"
          >
            Apenas Essenciais
          </button>

          <button
            onClick={handleAcceptAll}
            className="text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer transform active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Aceitar Todos e Continuar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
