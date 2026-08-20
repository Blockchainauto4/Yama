import React from "react";
import { UserProfile } from "../types";
import { X, Briefcase, Sparkles, Users, CheckCircle2, ExternalLink, MessageCircle, Building2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const whatsappGroupUrl = "https://chat.whatsapp.com/DM2033oaWsQFUt19YScQBA?s=sh&p=a&ilr=4";

  const handleJoinGroup = () => {
    // Open WhatsApp Group invitation link in new tab
    window.open(whatsappGroupUrl, "_blank");
    
    // Auto-login to unlock prices and apply 50% member discount
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: "Membro Vagas CLT",
      email: "vagas.clt@yamma.com.br",
      welcomeDiscountActive: true,
      discountPercent: 50,
    };
    onLogin(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-emerald-200 shadow-2xl max-w-md w-full overflow-hidden relative">
        {/* Header with Emerald Green & WhatsApp aesthetic */}
        <div className="bg-gradient-to-br from-emerald-800 via-teal-700 to-slate-950 text-white p-6 sm:p-7 relative flex flex-col items-center text-center overflow-hidden">
          {/* Decorative glowing circles */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition z-10"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Vacancies WhatsApp Badge */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-400 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-md">
            <MessageCircle className="w-3.5 h-3.5 fill-current text-slate-950" />
            Grupo Oficial de Vagas CLT no WhatsApp
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2 leading-tight">
            Oportunidades de Emprego <span className="text-emerald-300">CLT na Região</span>
          </h3>
          
          {/* Requested prompt highlight */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 mt-2 text-left w-full shadow-inner">
            <p className="text-xs sm:text-sm text-emerald-100 font-semibold leading-relaxed">
              👉 Clique no botão abaixo para entrar no nosso grupo de <strong className="text-emerald-300 font-bold">Vagas CLT no WhatsApp</strong> e receba oportunidades com carteira assinada em primeira mão!
            </p>
          </div>
        </div>

        {/* Roles list & WhatsApp Action */}
        <div className="p-6 space-y-4">
          {/* Available Roles Visual */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Vagas Abertas na Região
              </span>
              <span className="text-emerald-700 font-extrabold">+ 50% OFF no Yammá</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { title: "Repositor de Loja", type: "CLT + Benefícios" },
                { title: "Operador de Caixa", type: "CLT + VT + VR" },
                { title: "Atendente Balcão", type: "Padaria / Açougue" },
                { title: "Entregador E-Bike", type: "Logística / Rápido" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-emerald-100 rounded-xl p-2 shadow-xs">
                  <span className="font-extrabold text-slate-900 block text-[11px]">{item.title}</span>
                  <span className="text-[10px] text-emerald-700 font-bold">{item.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits summary list */}
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Acesso a vagas com carteira assinada (CLT) todos os dias</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>50% de desconto</strong> liberado na sua primeira compra no Yammá</span>
            </div>
          </div>

          {/* Main CTA Button to WhatsApp Group */}
          <button
            onClick={handleJoinGroup}
            className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm py-4 rounded-2xl transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 cursor-pointer border border-emerald-400"
          >
            <MessageCircle className="w-4 h-4 fill-current text-white" />
            <span>Entrar no Grupo de Vagas WhatsApp</span>
            <ExternalLink className="w-4 h-4 text-white" />
          </button>
          
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
            <button
              onClick={onClose}
              className="hover:text-slate-600 underline transition"
            >
              Continuar navegando
            </button>
            <span className="font-mono text-[10px] text-emerald-700 font-bold">chat.whatsapp.com/DM2033oaWsQ...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

