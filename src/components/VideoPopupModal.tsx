import React, { useState, useEffect, useRef } from "react";
import { X, Play, Pause } from "lucide-react";

interface VideoPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  programUrl?: string;
  delaySeconds?: number;
  closeDelayMinutes?: number;
}

const DEFAULT_PROGRAM_URL = "https://ai.hub.xyz/r/8G5GNCTF";
const VIDEO_ID = "Oh9F3y4sbzk";
const DEFAULT_CLOSE_DELAY_MINUTES = 22; // 22 minutos conforme solicitado

export const VideoPopupModal: React.FC<VideoPopupModalProps> = ({
  isOpen,
  onClose,
  programUrl = DEFAULT_PROGRAM_URL,
  delaySeconds = 15,
  closeDelayMinutes = DEFAULT_CLOSE_DELAY_MINUTES,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [canClose, setCanClose] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(delaySeconds);
  const secretClickCount = useRef<number>(0);

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

  // Permitir fechar via teclado (Esc) para conveniência caso necessário em desenvolvimento
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && canClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canClose, onClose]);

  // Send commands to YouTube iframe (Play, Pause, unMute with full audio)
  const sendIframeCommand = (func: string, args: unknown[] = []) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    }
  };

  // Start with audio on load
  const handleIframeLoad = () => {
    sendIframeCommand("unMute");
    sendIframeCommand("setVolume", [100]);
    sendIframeCommand("playVideo");
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      sendIframeCommand("pauseVideo");
      setIsPlaying(false);
    } else {
      sendIframeCommand("unMute");
      sendIframeCommand("setVolume", [100]);
      sendIframeCommand("playVideo");
      setIsPlaying(true);
    }
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

  // YouTube embed URL starting with autoplay and audio (mute=0)
  const embedUrl = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=0&controls=1&enablejsapi=1&playsinline=1&rel=0&loop=1&playlist=${VIDEO_ID}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      {/* Botão de Fechar (X): liberado apenas após 22 minutos de vídeo */}
      {canClose && (
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 p-2.5 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition cursor-pointer animate-fadeIn"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Conteúdo estritamente limpo: Apenas o vídeo e play/pause (sem molduras rosa, sem textos) */}
      <div className="relative w-full max-w-[320px] sm:max-w-[360px] flex flex-col items-center gap-4">
        {/* Vídeo vertical Shorts (sem bordas rosa) */}
        <div className="relative w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            onLoad={handleIframeLoad}
            title="Vídeo Oficial"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
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
                <Play className="w-4 h-4 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>

        {/* Aparece só o botão após 15 segundos com o link de renda extra */}
        {isUnlocked && (
          <a
            href={programUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-3.5 px-6 rounded-2xl font-black text-white bg-emerald-600 hover:bg-emerald-500 shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer animate-fadeIn text-sm sm:text-base tracking-wide"
          >
            <span>👉 CLIQUE AQUI: RENDA EXTRA</span>
          </a>
        )}
      </div>
    </div>
  );
};
