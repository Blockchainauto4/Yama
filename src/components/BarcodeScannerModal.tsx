import React, { useEffect, useRef, useState } from "react";
import { Camera, X, QrCode, CheckCircle2, RefreshCw, Volume2, VolumeX, Sparkles } from "lucide-react";
import { Product } from "../types";

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (barcode: string) => void;
  productsList: Product[];
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
  productsList,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  // Play beep sound
  const playBeep = () => {
    if (!audioEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.log("Audio not supported or blocked", e);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setScannedCode(null);
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err: any) {
      console.warn("Camera access failed or unavailable:", err);
      setCameraError(
        "A câmera não pôde ser ativada ou não há permissão. Você pode selecionar os códigos pré-configurados abaixo."
      );
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const handleSelectBarcode = (code: string) => {
    setScannedCode(code);
    playBeep();
    setTimeout(() => {
      onScanSuccess(code);
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-blue-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl text-white flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-blue-950 p-4 border-b border-blue-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-600 rounded-lg text-white">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Leitor de Código de Barras
              </h3>
              <p className="text-xs text-blue-200">
                Aproxime o código de barras da câmera ou selecione um item
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
              title={audioEnabled ? "Som Ativo" : "Som Mudo"}
            >
              {audioEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Camera View Area */}
        <div className="relative bg-black h-64 flex items-center justify-center overflow-hidden">
          {cameraActive ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
          ) : (
            <div className="p-6 text-center max-w-sm">
              <Camera className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400 mb-3">{cameraError}</p>
              <button
                onClick={startCamera}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Tentar Câmera Novamente
              </button>
            </div>
          )}

          {/* Scanner Target Frame Overlay */}
          <div className="absolute inset-0 border-[3px] border-emerald-500/30 m-8 rounded-xl pointer-events-none flex flex-col justify-between p-2">
            <div className="flex justify-between">
              <div className="w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg"></div>
              <div className="w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg"></div>
            </div>
            <div className="relative w-full h-0.5 bg-red-500/80 shadow-[0_0_12px_rgba(239,68,68,1)] animate-pulse"></div>
            <div className="flex justify-between">
              <div className="w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg"></div>
              <div className="w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg"></div>
            </div>
          </div>

          {scannedCode && (
            <div className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center p-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mb-2 animate-bounce" />
              <span className="text-lg font-bold text-white">
                Código Lido com Sucesso!
              </span>
              <span className="font-mono text-amber-300 text-sm mt-1">
                {scannedCode}
              </span>
            </div>
          )}
        </div>

        {/* Preset Sample Barcodes for Quick Testing */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Toque em um produto para simular leitura de código
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {productsList.slice(0, 8).map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectBarcode(p.barcode)}
                className="p-2 bg-slate-800 hover:bg-blue-900/60 border border-slate-700 hover:border-blue-500 rounded-xl text-left flex items-center gap-2 transition group"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate group-hover:text-amber-300">
                    {p.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    EAN: {p.barcode}
                  </div>
                  <div className="text-xs font-bold text-emerald-400">
                    R$ {p.clubeYamaPrice.toFixed(2).replace(".", ",")}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
