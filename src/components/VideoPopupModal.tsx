import React, { useState, useEffect, useRef } from "react";
import { X, Play, Pause, ChevronLeft, ChevronRight, CheckCircle2, Download, Smartphone, ArrowRight } from "lucide-react";
import { PROOF_SLIDES, HUB_PROGRAM_URL } from "../data/proofSlides";

interface VideoPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  programUrl?: string;
  delaySeconds?: number;
  closeDelayMinutes?: number;
  onOpenPolicyModal?: () => void;
}

const DEFAULT_PROGRAM_URL = HUB_PROGRAM_URL;
const DEFAULT_CLOSE_DELAY_MINUTES = 22; // 22 minutos conforme solicitado

export const VideoPopupModal: React.FC<VideoPopupModalProps> = ({
  isOpen,
  onClose,
  programUrl = DEFAULT_PROGRAM_URL,
  delaySeconds = 15,
  closeDelayMinutes = DEFAULT_CLOSE_DELAY_MINUTES,
  onOpenPolicyModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [canClose, setCanClose] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(delaySeconds);
  const secretClickCount = useRef<number>(0);
  const progressRef = useRef<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  // Estados para Redirecionamento Automático
  const [redirectCountdown, setRedirectCountdown] = useState<number>(5);
  const [isRedirectPaused, setIsRedirectPaused] = useState<boolean>(false);
  const [redirectTriggered, setRedirectTriggered] = useState<boolean>(false);

  const SLIDE_INTERVAL_MS = 4000;
  const currentSlide = PROOF_SLIDES[currentIndex];

  // Timer para exibir o botão de Renda Extra após 15 segundos
  useEffect(() => {
    if (!isOpen) return;
    if (isUnlocked) return;

    setSecondsRemaining(delaySeconds);

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsUnlocked(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isUnlocked, delaySeconds]);

  // Contagem regressiva e execução do Redirecionamento Automático após liberar o botão
  useEffect(() => {
    if (!isOpen || !isUnlocked || isRedirectPaused || redirectTriggered) return;

    const interval = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setRedirectTriggered(true);
          // Executa redirecionamento automático
          try {
            window.location.assign(programUrl);
          } catch {
            window.location.href = programUrl;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isUnlocked, isRedirectPaused, redirectTriggered, programUrl]);

  // Timer para liberar o botão X de fechar apenas após 22 minutos (1320s)
  useEffect(() => {
    if (!isOpen) return;
    if (canClose) return;

    const totalCloseSeconds = closeDelayMinutes * 60; // 22 min = 1320s
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 1;
      if (elapsed >= totalCloseSeconds) {
        setCanClose(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, canClose, closeDelayMinutes]);

  // Auto-slide effect when isPlaying is true
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const stepMs = 50;
    const stepPercent = (stepMs / SLIDE_INTERVAL_MS) * 100;

    const interval = setInterval(() => {
      progressRef.current += stepPercent;
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setCurrentIndex((prev) => (prev + 1) % PROOF_SLIDES.length);
      }
      setProgressPercent(progressRef.current);
    }, stepMs);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Permitir fechar via teclado (Esc) para conveniência caso necessário quando liberado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && canClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canClose, onClose]);

  const handleNextSlide = () => {
    progressRef.current = 0;
    setProgressPercent(0);
    setCurrentIndex((prev) => (prev + 1) % PROOF_SLIDES.length);
  };

  const handlePrevSlide = () => {
    progressRef.current = 0;
    setProgressPercent(0);
    setCurrentIndex((prev) => (prev - 1 + PROOF_SLIDES.length) % PROOF_SLIDES.length);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Atalho para testes: 3 cliques liberam o botão de renda extra; 5 cliques liberam o botão X de fechar
  const handleControlClick = () => {
    secretClickCount.current += 1;
    if (secretClickCount.current >= 3) {
      setIsUnlocked(true);
    }
    if (secretClickCount.current >= 5) {
      setCanClose(true);
    }
    handleTogglePlay();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      {/* Botão de Fechar (X): liberado apenas após 22 minutos de vídeo/slide */}
      {canClose && (
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 p-2.5 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition cursor-pointer animate-fadeIn"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Conteúdo estritamente limpo: Apenas o slide vertical com imagens e play/pause (sem molduras rosa) */}
      <div className="relative w-full max-w-[320px] sm:max-w-[360px] flex flex-col items-center gap-4">
        {/* Slide Vertical (9:16) com Imagem */}
        <div className="relative w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src={currentSlide.src}
            alt={currentSlide.title}
            className="w-full h-full object-cover select-none"
          />

          {/* Top Badge: Prova & Contador */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-20">
            <span className="bg-black/75 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              {currentSlide.tag}
            </span>
            <span className="bg-black/75 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-md">
              {currentIndex + 1}/{PROOF_SLIDES.length}
            </span>
          </div>

          {/* Bottom Caption */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-6 text-left z-20">
            <p className="text-emerald-400 font-black text-sm drop-shadow-md">
              {currentSlide.value}
            </p>
            <p className="text-white text-xs font-semibold drop-shadow-md truncate">
              {currentSlide.title}
            </p>
          </div>

          {/* Navegação Prev / Next */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 shadow-lg cursor-pointer transition transform active:scale-90"
            title="Slide anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 shadow-lg cursor-pointer transition transform active:scale-90"
            title="Próximo slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Barra de Progresso do Slide */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-40">
            <div
              className="h-full bg-emerald-400 transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Indicadores de bolinhas */}
        <div className="flex items-center gap-1.5">
          {PROOF_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                progressRef.current = 0;
                setProgressPercent(0);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? "w-6 bg-emerald-400"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Botão Play / Pause limpo e direto */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleControlClick}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold text-sm transition cursor-pointer border border-white/20 shadow-lg"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-emerald-400" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>

        {/* Aparece o botão após 15 segundos: Baixar Aplicativo & Renda Extra com Redirect Automático */}
        {isUnlocked && (
          <div className="w-full flex flex-col gap-2.5 animate-fadeIn">
            {/* Aviso e Contagem de Redirecionamento Automático */}
            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-3 text-center flex flex-col items-center gap-2">
              <div className="flex items-center justify-between w-full text-[11px] font-bold">
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Redirecionamento automático:
                </span>
                <span className="text-white font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  {redirectTriggered ? "Redirecionando..." : `${redirectCountdown}s`}
                </span>
              </div>

              {/* Progress bar do redirect */}
              {!redirectTriggered && !isRedirectPaused && (
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${((5 - redirectCountdown) / 5) * 100}%` }}
                  />
                </div>
              )}

              <div className="flex items-center justify-between w-full text-[10px] text-slate-400">
                <button
                  onClick={() => setIsRedirectPaused((prev) => !prev)}
                  className="hover:text-white underline cursor-pointer"
                >
                  {isRedirectPaused ? "▶ Retomar redirecionamento" : "⏸ Pausar redirecionamento"}
                </button>
                <a
                  href={programUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
                >
                  Ir agora
                </a>
              </div>
            </div>

            {/* Botão Baixar Aplicativo Principal */}
            <a
              href={programUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3.5 px-5 rounded-2xl font-black text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer text-sm sm:text-base tracking-wide border-2 border-emerald-300/40 transform active:scale-95 group"
            >
              <Download className="w-5 h-5 text-slate-950 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
              <span>BAIXAR APLICATIVO</span>
            </a>

            {/* Botão Secundário Renda Extra */}
            <a
              href={programUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-4 rounded-xl font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs border border-white/15"
            >
              <span>👉 CLIQUE AQUI: RENDA EXTRA</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </a>

            {/* Nota de conformidade com Políticas e LGPD */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
              <Smartphone className="w-3 h-3 text-emerald-400" />
              <span>Disponível para Android, iOS e Web • Gratuito</span>
              {onOpenPolicyModal && (
                <>
                  <span className="text-slate-600">•</span>
                  <button
                    onClick={onOpenPolicyModal}
                    className="text-slate-400 hover:text-emerald-400 underline cursor-pointer"
                  >
                    Políticas & Cookies
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
