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
    window.open("https://open.spotify.com/album/2oEU7FFDsfa3fheCfFXKoc?si=qn5LoN3PT3KtNgnRJiwIqA&utm_source=copy-link", "_blank");
    
    // Auto-login to unlock prices
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: "Ouvinte Fluxo",
      email: "ouvinte@fluxo.com",
      welcomeDiscountActive: true,
      discountPercent: 5,
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
            Preços Bloqueados!
          </h3>
          <p className="text-sm text-green-50 mt-1 font-medium leading-relaxed">
            Para liberar a visibilidade de todos os preços e ofertas, acesse o link abaixo e ouça o melhor do Sertanejo e do Funk!
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <p className="text-sm font-bold text-slate-800 mb-1">Álbum: O Traço e a Tinta</p>
            <p className="text-xs text-slate-500 font-medium">Artista: Fluxo</p>
          </div>

          <button
            onClick={handleUnlock}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-sm py-4 rounded-2xl transition shadow-lg shadow-green-200 flex items-center justify-center gap-2 active:scale-95"
          >
            <Headphones className="w-5 h-5" />
            <span>Ouvir no Spotify & Liberar Preços</span>
          </button>
          
          <p className="text-[10px] text-center text-slate-400 font-medium px-4">
            Ao clicar, você será redirecionado para o Spotify e os preços do Yammá serão desbloqueados automaticamente.
          </p>
        </div>
      </div>
    </div>
  );
};
