import React, { useState } from "react";
import {
  Play,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Film,
  Flame,
  Volume2,
} from "lucide-react";

export const YOUTUBE_VIDEO_URL =
  "https://youtube.com/shorts/Oh9F3y4sbzk?is=bGyAsEX7-ZUGrcWM";
export const YOUTUBE_VIDEO_ID = "Oh9F3y4sbzk";
export const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&playsinline=1`;

interface FeaturedVideoSectionProps {
  onOpenPopup?: () => void;
}

export const FeaturedVideoSection: React.FC<FeaturedVideoSectionProps> = ({
  onOpenPopup,
}) => {
  const [copied, setCopied] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const copyVideoLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(YOUTUBE_VIDEO_URL);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = YOUTUBE_VIDEO_URL;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareViaWhatsApp = () => {
    const text = `Confira a SUPER PROMOÇÃO DE DESCONTOS Yama Supermercado! Assista ao vídeo oficial: ${YOUTUBE_VIDEO_URL}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (isMinimized) {
    return (
      <div className="bg-slate-900 text-white rounded-2xl p-3 sm:p-4 border border-slate-800 shadow-lg flex items-center justify-between gap-3 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30">
                Vídeo Oficial
              </span>
              <span className="text-xs font-bold text-white">
                SUPER PROMOÇÃO DE DESCONTOS Yama Supermercado
              </span>
            </div>
            <p className="text-[11px] text-slate-300 hidden sm:block">
              Assista ao vídeo da promoção e fique por dentro das melhores ofertas!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-md cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Assistir</span>
            <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden transition-all">
      {/* Header bar of the section */}
      <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-red-500/20 border border-red-500/30 text-red-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-red-400 fill-current animate-pulse" />
                Vídeo Oficial no Início
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                YouTube Shorts HD
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
              SUPER PROMOÇÃO DE DESCONTOS Yama Supermercado
            </h3>
          </div>
        </div>

        {/* Minimize button */}
        <button
          onClick={() => setIsMinimized(true)}
          title="Minimizar vídeo"
          className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition text-xs flex items-center gap-1 cursor-pointer"
        >
          <span className="hidden sm:inline text-[11px] font-semibold">Recolher</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid: Video Player on left, Info and Actions on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        {/* Left Side: Vertical YouTube Shorts Frame */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl group">
            {/* Embedded IFrame */}
            <iframe
              src={YOUTUBE_EMBED_URL}
              title="SUPER PROMOÇÃO DE DESCONTOS Yama Supermercado"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Right Side: Promotion Details & Actions */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-4">
          <div className="inline-flex items-center gap-1.5 self-start bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 text-xs font-black px-3 py-1 rounded-xl">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            Ofertas & Descontos Imperdíveis
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
            Assista ao vídeo e aproveite os melhores descontos do Yama!
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Confira as novidades em carnes selecionadas, hortifruti fresco direto do produtor, bebidas geladas e promoções exclusivas válidas para as unidades da Cidade Ipava e Jd. Vera Cruz.
          </p>

          {/* Value Badges */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">Preços Baixos</h4>
                <p className="text-[11px] text-slate-400">Descontos no encarte todo</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">Vídeo Completo</h4>
                <p className="text-[11px] text-slate-400">Com áudio no player</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {/* Open in Pop-up Modal */}
            {onOpenPopup && (
              <button
                onClick={onOpenPopup}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-white" />
                <span>Abrir no Pop-up</span>
              </button>
            )}

            {/* Open on YouTube */}
            <a
              href={YOUTUBE_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-white/20 transition"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>No YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </a>

            {/* WhatsApp Share */}
            <button
              onClick={shareViaWhatsApp}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-md transition cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={copyVideoLink}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-white/20 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-extrabold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>

          {/* Link pill display */}
          <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400 font-mono truncate">
            <span className="text-slate-500 font-sans">Link direto:</span>
            <span className="truncate text-slate-300 underline">
              youtube.com/shorts/Oh9F3y4sbzk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
