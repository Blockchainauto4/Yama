import React, { useState, useRef } from "react";
import {
  Briefcase,
  Share2,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Download,
  Image as ImageIcon,
  Sparkles,
  MessageCircle,
  X,
  Flame,
  ShieldCheck,
  Video,
  Clock,
  Laptop,
} from "lucide-react";
import { safeCopyText } from "../utils/clipboard";

interface PromoAnnualShoppingBannerProps {
  onOpenAuth?: () => void;
}

const HUB_PROMO_URL = "https://ai.hub.xyz/r/8G5GNCTF";
const HUB_REFERRAL_CODE = "8G5GNCTF";

export const PromoAnnualShoppingBanner: React.FC<PromoAnnualShoppingBannerProps> = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCopyLink = async () => {
    await safeCopyText(HUB_PROMO_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenHub = () => {
    safeCopyText(HUB_REFERRAL_CODE).catch(() => {});
    window.open(HUB_PROMO_URL, "_blank");
  };

  const shareText = `Trabalhe em casa no Hub! Ganhe R$ 30 por hora assistindo e avaliando vídeos, totalmente sem custo. Use meu link oficial e comece agora: ${HUB_PROMO_URL}`;

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Trabalhe em Casa no Hub: R$ 30 por Hora!",
          text: "Ganhe dinheiro avaliando vídeos, 100% sem custo no Hub. Use o código 8G5GNCTF!",
          url: HUB_PROMO_URL,
        });
      } catch {
        await handleCopyLink();
      }
    } else {
      await handleCopyLink();
    }
  };

  // Generate downloadable promotional image using HTML5 Canvas
  const handleDownloadPhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient (Modern high-tech indigo & emerald dark theme)
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, "#060d1d");
    gradient.addColorStop(0.5, "#0b192e");
    gradient.addColorStop(1, "#022c22");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative circle glows
    const glow1 = ctx.createRadialGradient(250, 250, 20, 250, 250, 420);
    glow1.addColorStop(0, "rgba(16, 185, 129, 0.45)");
    glow1.addColorStop(1, "rgba(16, 185, 129, 0)");
    ctx.fillStyle = glow1;
    ctx.beginPath();
    ctx.arc(250, 250, 420, 0, Math.PI * 2);
    ctx.fill();

    const glow2 = ctx.createRadialGradient(850, 850, 20, 850, 850, 450);
    glow2.addColorStop(0, "rgba(59, 130, 246, 0.4)");
    glow2.addColorStop(1, "rgba(59, 130, 246, 0)");
    ctx.fillStyle = glow2;
    ctx.beginPath();
    ctx.arc(850, 850, 450, 0, Math.PI * 2);
    ctx.fill();

    // Top Header Badge
    ctx.fillStyle = "#10b981";
    ctx.roundRect(140, 90, 800, 70, 35);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("💼 HOME OFFICE OFICIAL • HUB (ai.hub.xyz)", 540, 137);

    // Main Question / Hook
    ctx.fillStyle = "#38bdf8";
    ctx.font = "900 46px 'Inter', sans-serif";
    ctx.fillText("Quer trabalhar em casa?", 540, 235);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px 'Inter', sans-serif";
    ctx.fillText("Ganhe assistindo e avaliando vídeos!", 540, 285);

    // Earnings Box
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 4;
    ctx.roundRect(90, 330, 900, 310, 40);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#34d399";
    ctx.font = "900 84px 'Inter', sans-serif";
    ctx.fillText("R$ 30 / HORA", 540, 435);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 40px 'Inter', sans-serif";
    ctx.fillText("TOTALMENTE SEM CUSTO", 540, 495);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 28px 'Inter', sans-serif";
    ctx.fillText("100% Gratuito • Sem taxas • Comece pelo celular ou computador", 540, 560);

    // Code & Link Section
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px 'Inter', sans-serif";
    ctx.fillText("CÓDIGO DE CONVITE OFICIAL:", 540, 710);

    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 4;
    ctx.roundRect(260, 740, 560, 90, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.font = "900 52px monospace";
    ctx.fillText(HUB_REFERRAL_CODE, 540, 805);

    // QR or URL footer
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "600 26px 'Inter', sans-serif";
    ctx.fillText("Acesse diretamente pelo link oficial do Hub:", 540, 890);

    ctx.fillStyle = "#34d399";
    ctx.font = "bold 30px monospace";
    ctx.fillText("ai.hub.xyz/r/8G5GNCTF", 540, 935);

    // Bottom Footer note
    ctx.fillStyle = "#64748b";
    ctx.font = "500 22px 'Inter', sans-serif";
    ctx.fillText("Plataforma Hub • Remuneração por horas ativas assistindo vídeos", 540, 1020);

    // Download triggered
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "hub-trabalhe-em-casa-r30-hora.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/70 shadow-2xl shadow-emerald-950/40 text-white animate-scaleUp">
      {/* Decorative Background Lighting Effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-8 lg:p-10">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] sm:text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-lg border border-emerald-300/40 tracking-wider">
            <Flame className="w-4 h-4 fill-current text-yellow-300 animate-pulse" />
            <span>OPORTUNIDADE OFICIAL • HUB (ai.hub.xyz)</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>TOTALMENTE SEM CUSTO • 100% GRATUITO</span>
          </div>
        </div>

        {/* Headline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap gap-2">
              <div className="inline-block bg-emerald-400/20 border border-emerald-300/40 text-emerald-300 font-extrabold text-xs sm:text-sm px-3 py-1 rounded-xl">
                💼 Trabalhe em casa no seu tempo livre
              </div>
              <div className="inline-block bg-teal-500/20 border border-teal-400/40 text-teal-300 font-bold text-xs sm:text-sm px-3 py-1 rounded-xl">
                🎥 Ganhe assistindo e avaliando vídeos
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
              Ganhe{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-green-400 bg-clip-text text-transparent underline decoration-emerald-500 decoration-wavy decoration-2">
                R$ 30 por Hora
              </span>{" "}
              Trabalhando em Casa!
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
              Conheça o <strong>Hub</strong> (ai.hub.xyz), a plataforma onde você rentabiliza seu tempo assistindo vídeos curtos e realizando tarefas online simples. <strong>Sem taxas, sem mensalidades e totalmente sem custo de adesão.</strong> Comece agora mesmo pelo celular ou computador!
            </p>

            {/* Quick Promo Perks */}
            <div className="pt-2 flex flex-wrap gap-2.5 text-xs text-slate-200">
              <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl font-bold">
                <Clock className="w-4 h-4 text-emerald-400" /> R$ 30 por hora ativa
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl font-bold">
                <Video className="w-4 h-4 text-teal-400" /> Ganhando com vídeos
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Sem Custo
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl font-bold">
                <Laptop className="w-4 h-4 text-blue-400" /> Pelo Celular ou PC
              </span>
            </div>
          </div>

          {/* Action Card / Code Box */}
          <div className="lg:col-span-4 bg-slate-900/90 border-2 border-emerald-500/50 rounded-2xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between gap-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                CÓDIGO DE CONVITE OFICIAL
              </span>
              <div className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 flex items-center justify-between gap-2 shadow-inner">
                <code className="text-base sm:text-lg font-mono font-black text-cyan-300 tracking-wider">
                  {HUB_REFERRAL_CODE}
                </code>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition active:scale-95 cursor-pointer"
                  title="Copiar código e link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleOpenHub}
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition active:scale-95 border border-emerald-300 animate-pulse hover:animate-none"
            >
              <span>ACESSAR O HUB (R$ 30/H)</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Sharing Options Bar */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800">
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center justify-center gap-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 py-2 px-1 rounded-xl transition text-[11px] font-bold cursor-pointer"
                title="Copiar Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-emerald-400" />}
                <span>{copiedLink ? "Copiado!" : "Copiar Link"}</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex flex-col items-center justify-center gap-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 py-2 px-1 rounded-xl transition text-[11px] font-bold cursor-pointer"
                title="Enviar no WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => setShowPhotoModal(true)}
                className="flex flex-col items-center justify-center gap-1 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 text-teal-300 py-2 px-1 rounded-xl transition text-[11px] font-bold cursor-pointer"
                title="Compartilhar Foto / Baixar Imagem"
              >
                <ImageIcon className="w-4 h-4 text-teal-400" />
                <span>Ver Imagem</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner Footer with Link Preview */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate max-w-full sm:max-w-lg">
            <span className="text-slate-500 font-bold shrink-0">Link Oficial do Hub:</span>
            <a
              href={HUB_PROMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline font-mono truncate"
            >
              {HUB_PROMO_URL}
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer transition text-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compartilhar Agora</span>
            </button>

            <button
              onClick={handleDownloadPhoto}
              className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-bold bg-emerald-500/20 hover:bg-emerald-500/30 px-3 py-1.5 rounded-lg border border-emerald-500/40 cursor-pointer transition text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Foto (HD)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Promotional Photo & Share Modal */}
      {showPhotoModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl max-w-lg w-full p-6 text-white relative shadow-2xl animate-scaleUp space-y-5">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
                <span>IMAGEM OFICIAL PARA COMPARTILHAR</span>
              </div>
              <h3 className="text-xl font-black text-white">
                Trabalhe em Casa no Hub
              </h3>
              <p className="text-xs text-slate-300">
                Envie no WhatsApp, grupos ou Stories e convide amigos para ganhar R$ 30/hora!
              </p>
            </div>

            {/* Visual Preview Card of the Promotion */}
            <div className="rounded-2xl overflow-hidden border-2 border-emerald-400/50 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-center space-y-4 shadow-inner">
              <div className="inline-block bg-emerald-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full">
                HUB (ai.hub.xyz) • HOME OFFICE
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-teal-300 uppercase tracking-widest">
                  GANHE
                </div>
                <div className="text-4xl font-black text-emerald-300 tracking-tight">
                  R$ 30 / HORA
                </div>
                <div className="text-base font-extrabold text-white">
                  TOTALMENTE SEM CUSTO
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  Ganhe avaliando e assistindo vídeos pelo celular ou PC!
                </div>
              </div>

              {/* QR Code Frame */}
              <div className="bg-white p-3 rounded-2xl w-40 h-40 mx-auto flex flex-col items-center justify-center shadow-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                    HUB_PROMO_URL
                  )}`}
                  alt="QR Code Oficial Hub"
                  className="w-32 h-32 object-contain"
                  loading="lazy"
                />
              </div>

              <div className="text-xs font-mono font-bold text-cyan-300 bg-slate-900/80 py-1.5 px-3 rounded-xl border border-slate-700 inline-block">
                Código: {HUB_REFERRAL_CODE}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleDownloadPhoto}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Foto (HD)</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar no WhatsApp</span>
              </button>
            </div>

            <button
              onClick={handleOpenHub}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl border border-slate-700 transition"
            >
              Abrir link oficial no Hub (ai.hub.xyz)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
