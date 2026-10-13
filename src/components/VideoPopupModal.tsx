import React, { useState, useEffect } from "react";
import {
  X,
  Play,
  Volume2,
  VolumeX,
  ExternalLink,
  Sparkles,
  Clock,
  CheckCircle2,
  Flame,
  FastForward,
  ShieldCheck,
  Briefcase,
  AlertCircle,
} from "lucide-react";

interface VideoPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  programUrl?: string;
  referralCode?: string;
  delayMinutes?: number; // 15 minutos conforme solicitado
}

const DEFAULT_PROGRAM_URL = "https://ai.hub.xyz/r/8G5GNCTF";
const DEFAULT_REFERRAL_CODE = "8G5GNCTF";
const VIDEO_ID = "Oh9F3y4sbzk";

export const VideoPopupModal: React.FC<VideoPopupModalProps> = ({
  isOpen,
  onClose,
  programUrl = DEFAULT_PROGRAM_URL,
  referralCode = DEFAULT_REFERRAL_CODE,
  delayMinutes = 15,
}) => {
  const totalSeconds = delayMinutes * 60; // 15 min = 900s
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSeconds);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Timer countdown while modal is open
  useEffect(() => {
    if (!isOpen) return;

    if (isUnlocked) return;

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
  }, [isOpen, isUnlocked]);

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder
      .toString()
      .padStart(2, "0")}`;
  };

  // Progress percentage
  const progressPercent = Math.min(
    100,
    Math.round(((totalSeconds - secondsRemaining) / totalSeconds) * 100)
  );

  // Skip delay for test / immediate verification
  const handleSkipDelay = () => {
    setSecondsRemaining(0);
    setIsUnlocked(true);
  };

  if (!isOpen) return null;

  // YouTube embed URL with autoplay and loop
  // Browsers require mute=1 to guarantee autoplay without user gesture
  const embedUrl = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=${
    isMuted ? "1" : "0"
  }&controls=1&rel=0&playsinline=1&loop=1&playlist=${VIDEO_ID}&enablejsapi=1`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      {/* Modal Card Container */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-rose-500/50 rounded-3xl shadow-2xl shadow-rose-950/70 overflow-hidden flex flex-col max-h-[96vh]">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-white/10 flex items-center justify-between gap-3 relative z-10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-md">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Pop-up Autoplay
                </span>
                <span className="text-[10px] text-slate-400 font-bold">
                  {delayMinutes} min
                </span>
              </div>
              <h3 className="text-sm font-black text-white truncate max-w-[240px] sm:max-w-xs mt-0.5">
                Apresentação Oficial do Programa
              </h3>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
            title="Fechar Pop-up"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 relative z-10">
          {/* Autoplay Notice & Sound Toggle */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-2.5 px-3 flex items-center justify-between gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-[11px] leading-tight">
                {isMuted ? "Vídeo iniciado no mudo (autoplay). Ative o som:" : "Som ativado no player!"}
              </span>
            </div>
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg transition shrink-0 border border-white/10"
            >
              {isMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ativar Som</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span>Silenciar</span>
                </>
              )}
            </button>
          </div>

          {/* YouTube Shorts Video Player (9:16 Aspect Ratio) */}
          <div className="relative mx-auto w-full max-w-[270px] sm:max-w-[290px] aspect-[9/16] bg-black rounded-3xl overflow-hidden border-2 border-rose-500/50 shadow-2xl group">
            <iframe
              key={`video-frame-${isMuted ? "muted" : "unmuted"}`}
              src={embedUrl}
              title="Apresentação do Programa"
              className="w-full h-full border-0 rounded-3xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* TIMER / STATUS SECTION */}
          {!isUnlocked ? (
            <div className="bg-slate-800/90 border border-rose-500/30 rounded-2xl p-4 text-center space-y-3 shadow-lg">
              <div className="flex items-center justify-center gap-2 text-rose-300">
                <Clock className="w-4 h-4 animate-spin text-rose-400" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Liberando botão para entrar no programa em:
                </span>
              </div>

              {/* Countdown Numbers Display */}
              <div className="flex items-center justify-center gap-1">
                <span className="text-4xl font-black font-mono tracking-tight text-white bg-slate-950 px-4 py-2 rounded-2xl border border-white/10 shadow-inner">
                  {formatTime(secondsRemaining)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500 transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Assista ao vídeo</span>
                  <span>{progressPercent}% concluído</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-snug">
                Por favor, acompanhe o vídeo completo. Assim que os 15 minutos terminarem, o botão exclusivo de acesso ao programa será liberado automaticamente logo abaixo!
              </p>

              {/* TEST MODE SHORTCUT (Permite ao cliente testar o botão imediatamente sem esperar 15 minutos!) */}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={handleSkipDelay}
                  className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-amber-300 hover:text-white border border-amber-400/40 font-bold text-[11px] py-2 px-3 rounded-xl transition cursor-pointer"
                  title="Permite testar e visualizar o botão liberado instantaneamente"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>⚡ Modo Teste: Pular os 15 min e liberar botão agora</span>
                </button>
              </div>
            </div>
          ) : (
            /* UNLOCKED: THE BIG BUTTON APPEARS */
            <div className="space-y-3 animate-bounce-short">
              <div className="bg-emerald-500/20 border-2 border-emerald-400/60 rounded-2xl p-4 text-center space-y-3 shadow-xl">
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Vídeo Concluído • Acesso Liberado!
                </div>

                <h4 className="text-lg font-black text-white leading-tight">
                  Parabéns! Sua vaga para entrar no programa está disponível:
                </h4>

                <p className="text-xs text-emerald-100">
                  Trabalhe em casa ganhando <strong>R$ 30 por hora</strong> assistindo e avaliando vídeos, 100% gratuito.
                </p>

                {/* THE MAIN ACTION BUTTON */}
                <a
                  href={programUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 px-6 rounded-2xl font-black text-base sm:text-lg text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 shadow-2xl shadow-emerald-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-2 border-white/30"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 animate-pulse text-yellow-300" />
                    <span>👉 CLIQUE AQUI PARA ENTRAR NO PROGRAMA</span>
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </a>

                {/* Referral Code Badge */}
                <div className="pt-1 flex items-center justify-center gap-2 text-xs text-slate-300">
                  <span>Código de Convite:</span>
                  <span className="font-mono font-black text-amber-300 bg-black/40 px-2 py-0.5 rounded-lg border border-white/10">
                    {referralCode}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Acesso Seguro e Oficial</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white underline font-semibold transition"
          >
            Continuar no Supermercado
          </button>
        </div>
      </div>
    </div>
  );
};
