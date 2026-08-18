import React from "react";
import { UserProfile } from "../types";
import { X, Gift, Sparkles, ArrowRight, Coins, Users, CheckCircle2, ExternalLink } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const handleUnlock = () => {
    // Open Kwai campaign link in new tab
    window.open("https://k.kwai.com/w/9eBzTzjj", "_blank");
    
    // Auto-login to unlock prices and apply 50% discount
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: "Usuário Kwai",
      email: "kwai.promocao@yamma.com.br",
      welcomeDiscountActive: true,
      discountPercent: 50,
    };
    onLogin(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-purple-200 shadow-2xl max-w-md w-full overflow-hidden relative">
        {/* Header with Kwai Purple & Gold aesthetic */}
        <div className="bg-gradient-to-br from-purple-700 via-indigo-600 to-amber-500 text-white p-6 sm:p-7 relative flex flex-col items-center text-center overflow-hidden">
          {/* Decorative glowing circles */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-purple-400/30 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition z-10"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Kwai Campaign Badge */}
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-md">
            <Coins className="w-3.5 h-3.5 fill-current text-slate-950" />
            Promoção Oficial Kwai & Yammá
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2 leading-tight">
            Convide amigos e ganhe até <span className="text-amber-300">R$100</span>!
          </h3>
          
          {/* Requested prompt highlight */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 mt-2 text-left w-full shadow-inner">
            <p className="text-xs sm:text-sm text-amber-100 font-semibold leading-relaxed">
              👉 Clica no link e se você for um novo ou inativo usuário do Kwai, já ganha <strong className="text-amber-300 font-black text-sm">R$0.5</strong>! Não vai te custar nada～
            </p>
          </div>
        </div>

        {/* Campaign Rewards Preview & Action */}
        <div className="p-6 space-y-4">
          {/* 5 Friends Progression Visual */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-purple-600" /> Metas de Recompensa
              </span>
              <span className="text-amber-600 font-extrabold">+ 50% OFF no Yammá</span>
            </div>
            
            <div className="grid grid-cols-5 gap-1.5 text-center">
              {[
                { label: "1º", val: "R$11,3" },
                { label: "2º", val: "R$13,7" },
                { label: "3º", val: "R$17,7" },
                { label: "4º", val: "R$14,7" },
                { label: "5º", val: "R$51,2" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-purple-100 rounded-xl p-1.5 shadow-xs">
                  <span className="text-[10px] text-slate-400 block font-semibold">{item.label}</span>
                  <span className="text-[11px] font-black text-purple-700">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits summary list */}
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>R$0,50 instantâneo</strong> no Kwai p/ novos ou inativos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>50% de desconto</strong> liberado na sua primeira compra Yammá</span>
            </div>
          </div>

          {/* Main CTA Button */}
          <button
            onClick={handleUnlock}
            className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm py-4 rounded-2xl transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 active:scale-95 cursor-pointer border border-amber-300"
          >
            <Sparkles className="w-4 h-4 fill-current text-slate-950" />
            <span>Acessar Kwai & Liberar Descontos</span>
            <ExternalLink className="w-4 h-4 text-slate-950" />
          </button>
          
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
            <button
              onClick={onClose}
              className="hover:text-slate-600 underline transition"
            >
              Continuar sem o bônus
            </button>
            <span className="font-mono text-[10px] text-purple-600 font-bold">k.kwai.com/w/9eBzTzjj</span>
          </div>
        </div>
      </div>
    </div>
  );
};

