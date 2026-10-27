import React, { useState } from "react";
import { X, Shield, Lock, CheckCircle2, Cookie, ExternalLink, ArrowRight } from "lucide-react";
import { HUB_PROGRAM_URL } from "../data/proofSlides";

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreferences?: (preferences: { essential: boolean; redirect: boolean; analytics: boolean }) => void;
}

const COOKIE_STORAGE_KEY = "yamma_cookie_consent_v1";

export const CookiePolicyModal: React.FC<CookiePolicyModalProps> = ({
  isOpen,
  onClose,
  onSavePreferences,
}) => {
  const [allowRedirect, setAllowRedirect] = useState<boolean>(true);
  const [allowAnalytics, setAllowAnalytics] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSave = () => {
    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({
          status: "customized",
          date: new Date().toISOString(),
          categories: { essential: true, redirect: allowRedirect, analytics: allowAnalytics },
        })
      );
    } catch {
      // ignore
    }
    if (onSavePreferences) {
      onSavePreferences({ essential: true, redirect: allowRedirect, analytics: allowAnalytics });
    }
    onClose();
  };

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
    if (onSavePreferences) {
      onSavePreferences({ essential: true, redirect: true, analytics: true });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                Políticas de Privacidade, Cookies & Redirecionamento
              </h2>
              <p className="text-xs text-slate-400">
                Conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 text-sm text-slate-600 leading-relaxed">
          {/* Summary */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950">
            <h3 className="font-black text-xs uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Compromisso com a Transparência
            </h3>
            <p className="text-xs">
              O <strong>Yama Supermercado</strong> preza pela sua privacidade e controle sobre seus dados.
              Nosso sistema utiliza identificadores locais seguros para armazenar seu carrinho, lojas favoritas,
              e viabilizar o <strong>redirecionamento automático</strong> para o aplicativo de renda extra oficial parceiro.
            </p>
          </div>

          {/* Section 1: Categorias de Cookies */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Cookie className="w-4 h-4 text-emerald-600" />
              Categorias e Finalidades dos Cookies
            </h4>

            <div className="space-y-3">
              {/* Essential */}
              <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">Cookies Estritamente Necessários</span>
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Sempre Ativos
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Essenciais para navegação, funcionamento do carrinho de compras, cotação de preços em tempo real e segurança do portal.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="rounded text-emerald-600 h-4 w-4"
                />
              </div>

              {/* Redirect Partner */}
              <div className="border border-emerald-200 rounded-xl p-3.5 bg-emerald-50/40 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-900 text-xs">Redirecionamento Automático & Parcerias</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      Recomendado
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Permite o redirecionamento automático e transparente para a plataforma oficial do aplicativo <strong>Hub Renda Extra</strong> ({HUB_PROGRAM_URL}) sem atritos ou barreiras.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={allowRedirect}
                  onChange={(e) => setAllowRedirect(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                />
              </div>

              {/* Analytics */}
              <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-900 text-xs">Cookies de Desempenho e Mídia</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Armazenam o progresso da reprodução do slide, som/áudio selecionado e métricas anônimas de visitação.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={allowAnalytics}
                  onChange={(e) => setAllowAnalytics(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section 2: LGPD Rights */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-700" />
              Seus Direitos como Titular de Dados
            </h5>
            <p>
              Você pode solicitar a alteração, eliminação ou revogação de seu consentimento a qualquer momento
              através de nossas configurações ou canais de atendimento oficial. Nenhum dado financeiro ou confidencial é vendido ou compartilhado indevidamente.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <a
            href={HUB_PROGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Ver Termos do Parceiro Hub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              Salvar Selecionados
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2 text-xs font-black text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Aceitar Todos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
