import React, { useState, useRef } from "react";
import {
  Trophy,
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
  Gift,
  ShieldCheck,
} from "lucide-react";
import { safeCopyText } from "../utils/clipboard";

interface PromoAnnualShoppingBannerProps {
  onOpenAuth?: () => void;
}

const TIKTOK_PROMO_URL = "https://www.tiktok.com/d/4/ZS9AyD1Ka3qSj-Iu84v/";
const TIKTOK_REFERRAL_CODE = "#DLN481109361511";

export const PromoAnnualShoppingBanner: React.FC<PromoAnnualShoppingBannerProps> = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCopyLink = async () => {
    await safeCopyText(TIKTOK_PROMO_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenTikTok = () => {
    safeCopyText(TIKTOK_REFERRAL_CODE).catch(() => {});
    window.open(TIKTOK_PROMO_URL, "_blank");
  };

  const shareText = `Use meu código ${TIKTOK_REFERRAL_CODE} para participar do TikTok Lite e ganhar recompensas. ${TIKTOK_PROMO_URL}`;

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "R$ 50.000 em Compras Durante 1 Ano!",
          text: "Nenhum amigo por perto? Compartilhe a foto ou o link para participar e ganhar!",
          url: TIKTOK_PROMO_URL,
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

    // Background gradient (Dark premium luxury with TikTok glow)
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, "#090d16");
    gradient.addColorStop(0.5, "#160b24");
    gradient.addColorStop(1, "#030712");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative circle glows
    const glow1 = ctx.createRadialGradient(250, 250, 20, 250, 250, 400);
    glow1.addColorStop(0, "rgba(244, 63, 94, 0.45)");
    glow1.addColorStop(1, "rgba(244, 63, 94, 0)");
    ctx.fillStyle = glow1;
    ctx.beginPath();
    ctx.arc(250, 250, 400, 0, Math.PI * 2);
    ctx.fill();

    const glow2 = ctx.createRadialGradient(850, 850, 20, 850, 850, 450);
    glow2.addColorStop(0, "rgba(245, 158, 11, 0.4)");
    glow2.addColorStop(1, "rgba(245, 158, 11, 0)");
    ctx.fillStyle = glow2;
    ctx.beginPath();
    ctx.arc(850, 850, 450, 0, Math.PI * 2);
    ctx.fill();

    // Top Header Badge
    ctx.fillStyle = "#f43f5e";
    ctx.roundRect(140, 90, 800, 70, 35);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🎉 MEGA PROMOÇÃO OFICIAL • TIKTOK LITE", 540, 137);

    // Main Question
    ctx.fillStyle = "#fde047";
    ctx.font = "900 48px 'Inter', sans-serif";
    ctx.fillText("Nenhum amigo por perto?", 540, 235);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px 'Inter', sans-serif";
    ctx.fillText("Compartilhe a foto ou o link!", 540, 285);

    // Grand Prize Box
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 4;
    ctx.roundRect(90, 330, 900, 310, 40);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fbbf24";
    ctx.font = "900 84px 'Inter', sans-serif";
    ctx.fillText("R$ 50.000", 540, 435);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 44px 'Inter', sans-serif";
    ctx.fillText("EM COMPRAS DURANTE 1 ANO", 540, 495);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 28px 'Inter', sans-serif";
    ctx.fillText("São mais de R$ 4.166/mês garantidos de supermercado grátis!", 540, 560);

    // Code & Link Section
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px 'Inter', sans-serif";
    ctx.fillText("USE O CÓDIGO NO APP TIKTOK LITE:", 540, 710);

    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 4;
    ctx.roundRect(240, 740, 600, 90, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.font = "900 52px monospace";
    ctx.fillText(TIKTOK_REFERRAL_CODE, 540, 805);

    // QR or URL footer
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "600 26px 'Inter', sans-serif";
    ctx.fillText("Acesse diretamente pelo link oficial:", 540, 890);

    ctx.fillStyle = "#f43f5e";
    ctx.font = "bold 28px monospace";
    ctx.fillText("www.tiktok.com/d/4/ZS9AyD1Ka3qSj-Iu84v/", 540, 935);

    // Bottom Footer note
    ctx.fillStyle = "#64748b";
    ctx.font = "500 22px 'Inter', sans-serif";
    ctx.fillText("Regulamento e participação no TikTok Lite • Válido para novos e usuários inativos", 540, 1020);

    // Download triggered
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "promocao-50mil-compras-1ano.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 border-2 border-rose-500/70 shadow-2xl shadow-rose-950/40 text-white animate-scaleUp">
      {/* Decorative Background Lighting Effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-8 lg:p-10">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[11px] sm:text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-lg border border-rose-300/40 tracking-wider">
            <Flame className="w-4 h-4 fill-current text-yellow-300 animate-pulse" />
            <span>MEGA PROMOÇÃO OFICIAL</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-400/30 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>1 ANO DE SUPERMERCADO PAGO</span>
          </div>
        </div>

        {/* Headline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-block bg-yellow-400/20 border border-yellow-300/40 text-yellow-300 font-extrabold text-xs sm:text-sm px-3 py-1 rounded-xl">
              Nenhum amigo por perto? Compartilhe a foto ou o link.
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
              Concorra a{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent underline decoration-rose-500 decoration-wavy decoration-2">
                R$ 50.000
              </span>{" "}
              em compras durante 1 ano!
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
              Participe no <strong>TikTok Lite</strong> com o link promocional oficial. Se você for um usuário novo ou inativo, resgate prêmios na hora e participe da bonificação de até <strong>R$ 50.000 em compras</strong> para abastecer sua casa o ano inteiro!
            </p>

            {/* Quick Promo Perks */}
            <div className="pt-2 flex flex-wrap gap-2.5 text-xs text-slate-200">
              <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl font-bold">
                <Gift className="w-4 h-4 text-rose-400" /> R$ 4.166/mês em compras
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Grátis para participar
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl font-bold">
                <Trophy className="w-4 h-4 text-amber-400" /> Bônus TikTok Lite
              </span>
            </div>
          </div>

          {/* Action Card / Code Box */}
          <div className="lg:col-span-4 bg-slate-900/90 border-2 border-rose-500/50 rounded-2xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between gap-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                CÓDIGO DE RECOMPENSA
              </span>
              <div className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 flex items-center justify-between gap-2 shadow-inner">
                <code className="text-base sm:text-lg font-mono font-black text-cyan-300 tracking-wider">
                  {TIKTOK_REFERRAL_CODE}
                </code>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 bg-rose-600 hover:bg-rose-500 rounded-lg text-white transition active:scale-95 cursor-pointer"
                  title="Copiar código e link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleOpenTikTok}
              className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 text-white font-black text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition active:scale-95 border border-rose-300 animate-pulse hover:animate-none"
            >
              <span>PARTICIPAR NO TIKTOK</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Sharing Options Bar */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800">
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center justify-center gap-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 py-2 px-1 rounded-xl transition text-[11px] font-bold cursor-pointer"
                title="Copiar Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-rose-400" />}
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
                className="flex flex-col items-center justify-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 py-2 px-1 rounded-xl transition text-[11px] font-bold cursor-pointer"
                title="Compartilhar Foto / Baixar Imagem"
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Ver Foto</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner Footer with Link Preview */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate max-w-full sm:max-w-lg">
            <span className="text-slate-500 font-bold shrink-0">Link da Promoção:</span>
            <a
              href={TIKTOK_PROMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:text-rose-300 underline font-mono truncate"
            >
              {TIKTOK_PROMO_URL}
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer transition text-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Compartilhar Agora</span>
            </button>

            <button
              onClick={handleDownloadPhoto}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold bg-amber-500/20 hover:bg-amber-500/30 px-3 py-1.5 rounded-lg border border-amber-500/40 cursor-pointer transition text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Imagem</span>
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
          <div className="bg-slate-900 border-2 border-rose-500 rounded-3xl max-w-lg w-full p-6 text-white relative shadow-2xl animate-scaleUp space-y-5">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
                <span>FOTO OFICIAL PARA COMPARTILHAR</span>
              </div>
              <h3 className="text-xl font-black text-white">
                Nenhum amigo por perto?
              </h3>
              <p className="text-xs text-slate-300">
                Compartilhe a imagem ou envie direto no WhatsApp / Stories!
              </p>
            </div>

            {/* Visual Preview Card of the Promotion */}
            <div className="rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-6 text-center space-y-4 shadow-inner">
              <div className="inline-block bg-rose-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full">
                TIKTOK LITE • PROMOÇÃO EXCLUSIVA
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-yellow-300 uppercase tracking-widest">
                  CONCORRA A
                </div>
                <div className="text-4xl font-black text-amber-300 tracking-tight">
                  R$ 50.000
                </div>
                <div className="text-base font-extrabold text-white">
                  EM COMPRAS DURANTE 1 ANO
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  R$ 4.166 por mês em compras de supermercado!
                </div>
              </div>

              {/* QR Code Simulation Frame */}
              <div className="bg-white p-3 rounded-2xl w-40 h-40 mx-auto flex flex-col items-center justify-center shadow-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                    TIKTOK_PROMO_URL
                  )}`}
                  alt="QR Code Promoção TikTok Lite"
                  className="w-32 h-32 object-contain"
                  loading="lazy"
                />
              </div>

              <div className="text-xs font-mono font-bold text-cyan-300 bg-slate-900/80 py-1.5 px-3 rounded-xl border border-slate-700 inline-block">
                Código: {TIKTOK_REFERRAL_CODE}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleDownloadPhoto}
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition cursor-pointer shadow-md"
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
              onClick={handleOpenTikTok}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl border border-slate-700 transition"
            >
              Abrir link oficial no TikTok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
