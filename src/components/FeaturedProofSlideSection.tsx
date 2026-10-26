import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Sparkles,
  Flame,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  X,
  Play,
  Pause,
  ArrowRight,
  ShieldCheck,
  Download,
  Smartphone,
} from "lucide-react";
import { PROOF_SLIDES, HUB_PROGRAM_URL, HUB_REFERRAL_CODE, ProofSlide } from "../data/proofSlides";
import { safeCopyText } from "../utils/clipboard";

interface FeaturedProofSlideSectionProps {
  onOpenPopup?: () => void;
}

export const FeaturedProofSlideSection: React.FC<FeaturedProofSlideSectionProps> = ({
  onOpenPopup,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<ProofSlide | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const progressRef = useRef<number>(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const SLIDE_DURATION_MS = 4500;
  const currentSlide = PROOF_SLIDES[currentIndex];

  // Auto-play timer for slide transition with progress indicator
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / SLIDE_DURATION_MS) * 100;

    const interval = setInterval(() => {
      progressRef.current += step;
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setCurrentIndex((prev) => (prev + 1) % PROOF_SLIDES.length);
      }
      setProgressPercent(progressRef.current);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered]);

  const handleNext = () => {
    progressRef.current = 0;
    setProgressPercent(0);
    setCurrentIndex((prev) => (prev + 1) % PROOF_SLIDES.length);
  };

  const handlePrev = () => {
    progressRef.current = 0;
    setProgressPercent(0);
    setCurrentIndex((prev) => (prev - 1 + PROOF_SLIDES.length) % PROOF_SLIDES.length);
  };

  const handleSelectSlide = (idx: number) => {
    progressRef.current = 0;
    setProgressPercent(0);
    setCurrentIndex(idx);
  };

  const handleCopyCode = async () => {
    await safeCopyText(HUB_REFERRAL_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleShare = () => {
    const text = `Confira as provas reais de pagamento do Hub Renda Extra! Ganhe R$ 30 a R$ 70/hora avaliando vídeos em casa sem nenhum custo. Acesse: ${HUB_PROGRAM_URL}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const openLightbox = (slide: ProofSlide) => {
    setLightboxImage(slide);
    setIsLightboxOpen(true);
  };

  return (
    <div
      className="bg-slate-900 text-white rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/30">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-emerald-400 fill-current animate-pulse" />
                Provas Reais de Pagamento • Hub
              </span>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                Slide de Comprovantes Oficiais
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-black tracking-tight text-white mt-0.5">
              Resultados Reais: Renda Extra Trabalhando em Casa
            </h3>
          </div>
        </div>

        {/* Slide Counter & Play/Pause controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer border border-white/10"
            title={isPlaying ? "Pausar slide" : "Iniciar slide"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                <span className="text-[11px] hidden sm:inline">Reproduzir</span>
              </>
            )}
          </button>

          <span className="text-xs font-mono font-bold text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-xl">
            {currentIndex + 1} / {PROOF_SLIDES.length}
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Phone Slide View (Left) & Context Card (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
        {/* Left: Mobile Phone Mockup Slide */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border-2 border-slate-700/80 shadow-2xl shadow-black/80 group">
            {/* Slide Image with Smooth Transition */}
            <img
              src={currentSlide.src}
              alt={currentSlide.title}
              className="w-full h-full object-cover transition-opacity duration-300 select-none cursor-pointer"
              onClick={() => openLightbox(currentSlide)}
            />

            {/* Top Glass Notch / Tag */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
              <span className="bg-black/75 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {currentSlide.tag}
              </span>
              <span className="bg-black/75 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono px-2 py-0.5 rounded-full shadow-md">
                {currentIndex + 1}/{PROOF_SLIDES.length}
              </span>
            </div>

            {/* Bottom Glass Caption */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-8 text-left z-20">
              <p className="text-emerald-400 font-black text-sm drop-shadow-md">
                {currentSlide.value}
              </p>
              <p className="text-white text-xs font-semibold drop-shadow-md line-clamp-2">
                {currentSlide.title}
              </p>
            </div>

            {/* Hover Zoom Overlay */}
            <button
              onClick={() => openLightbox(currentSlide)}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs cursor-pointer z-30"
              title="Clique para ampliar o comprovante"
            >
              <span className="bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-xl">
                <Maximize2 className="w-4 h-4 text-emerald-400" />
                <span>Ampliar Comprovante</span>
              </span>
            </button>

            {/* Prev / Next Overlay Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-white/90 hover:text-white border border-white/20 shadow-lg cursor-pointer transition transform active:scale-95"
              title="Slide anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-white/90 hover:text-white border border-white/20 shadow-lg cursor-pointer transition transform active:scale-95"
              title="Próximo slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Progress Bar inside Slide */}
            <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-40">
              <div
                className="h-full bg-emerald-400 transition-all duration-75"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 mt-4">
            {PROOF_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => handleSelectSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 bg-emerald-400"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                title={`Ver comprovante ${idx + 1}: ${slide.title}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Detailed Context Card & Direct Action Link */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-4">
          <div className="inline-flex items-center gap-2 self-start bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-black px-3.5 py-1.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Comprovante {currentIndex + 1} de {PROOF_SLIDES.length} Verificado</span>
          </div>

          <div>
            <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
              {currentSlide.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mt-1">
              {currentSlide.title}
            </h2>
            <div className="mt-2 text-xl sm:text-2xl font-black text-emerald-400 font-mono">
              {currentSlide.value}
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {currentSlide.description}
          </p>

          {/* Benefits Info Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">Sem Custo de Entrada</h4>
                <p className="text-[11px] text-slate-400">Totalmente gratuito para começar hoje</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">R$ 30 a R$ 70 / Hora</h4>
                <p className="text-[11px] text-slate-400">Avaliando e assistindo vídeos</p>
              </div>
            </div>
          </div>

          {/* Call-to-Action Link Buttons */}
          <div className="pt-2 flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Botão Baixar Aplicativo */}
              <a
                href={HUB_PROGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base px-5 py-4 rounded-2xl shadow-xl shadow-emerald-950/50 hover:shadow-emerald-950/70 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer border-2 border-emerald-300/50 group"
              >
                <Download className="w-5 h-5 text-slate-950 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
                <span>BAIXAR APLICATIVO</span>
              </a>

              {/* Botão Acessar Renda Extra */}
              <a
                href={HUB_PROGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-sm sm:text-base px-5 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/30"
              >
                <span>👉 ENTRAR NO PROGRAMA</span>
                <ArrowRight className="w-5 h-5 text-emerald-300 stroke-[2.5]" />
              </a>
            </div>

            {/* Micro-info bar with app compat & secondary actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-medium">
                <Smartphone className="w-3.5 h-3.5" />
                App compatível com Android, iOS e Web (Sem custo)
              </span>

              {/* Share & Pop-up Options */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition border border-white/10 cursor-pointer"
                  title="Compartilhar no WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Compartilhar</span>
                </button>

                {onOpenPopup && (
                  <button
                    onClick={onOpenPopup}
                    className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition border border-white/10 cursor-pointer"
                    title="Abrir no Pop-up"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Modo Pop-up</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Referral Code Quick Copy */}
          <div className="flex items-center gap-2 text-xs bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5">
            <span className="text-slate-400">Código de Indicação:</span>
            <code className="text-emerald-300 font-mono font-bold tracking-wider">
              {HUB_REFERRAL_CODE}
            </code>
            <button
              onClick={handleCopyCode}
              className="ml-auto flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mini Thumbnails Strip Selector */}
      <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
        <p className="text-[11px] uppercase font-extrabold text-slate-400 mb-3 tracking-wider flex items-center gap-1.5">
          <span>Selecione para ver outros comprovantes da galeria:</span>
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {PROOF_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => handleSelectSlide(idx)}
              className={`relative aspect-[9/16] rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                idx === currentIndex
                  ? "border-emerald-400 ring-2 ring-emerald-400/50 scale-102 shadow-lg"
                  : "border-slate-700/80 hover:border-slate-500 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-1 inset-x-1 text-[9px] font-bold text-white bg-black/80 backdrop-blur-xs px-1 py-0.5 rounded text-center truncate">
                {slide.tag}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for high-res inspection */}
      {isLightboxOpen && lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition cursor-pointer"
            title="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-sm sm:max-w-md w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-center">
              <h4 className="text-white font-extrabold text-base">
                {lightboxImage.title}
              </h4>
              <p className="text-emerald-400 font-mono font-bold text-lg">
                {lightboxImage.value}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                <a
                  href={HUB_PROGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Aplicativo</span>
                </a>
                <a
                  href={HUB_PROGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition border border-white/20"
                >
                  <span>Acessar Programa</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
