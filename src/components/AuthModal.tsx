import React from "react";
import { UserProfile } from "../types";
import { X, Music, LockOpen, Headphones } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const handleUnlock = () => {
    // Open Spotify link in new tab
    window.open("https://offstep.link/307187539131", "_blank");
    
    // Auto-login to unlock prices
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: "Ouvinte Fluxo",
      email: "ouvinte@fluxo.com",
      welcomeDiscountActive: true,
      discountPercent: 50,
    };
    onLogin(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full overflow-hidden relative">
        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-8 relative flex flex-col items-center text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <Music className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-black tracking-tight text-white mb-2">
            Desbloqueie 50% OFF!
          </h3>
          <p className="text-sm text-green-50 mt-1 font-medium leading-relaxed">
            Faça o pre-save da música Dona do meu passo, o melhor do Sertanejo com o Fluxo, e ganhe 50% de desconto na sua primeira compra e 15% em todas as próximas!
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <p className="text-sm font-bold text-slate-800 mb-1">Música: Dona do meu passo</p>
            <p className="text-xs text-slate-500 font-medium">Artista: Fluxo (Sertanejo)</p>
          </div>

          <button
            onClick={handleUnlock}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-sm py-4 rounded-2xl transition shadow-lg shadow-green-200 flex items-center justify-center gap-2 active:scale-95"
          >
            <Headphones className="w-5 h-5" />
            <span>Fazer Pre-save & Liberar 50% OFF</span>
          </button>
          
          <p className="text-[10px] text-center text-slate-400 font-medium px-4">
            Ao clicar, você será redirecionado para fazer o pre-save e os preços do Yammá serão desbloqueados com 50% de desconto.
          </p>
        </div>
      </div>
    </div>
  );
};
