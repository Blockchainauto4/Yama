import React, { useState, useEffect } from "react";
import {
  Monitor,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Volume2,
  RefreshCw,
  Sparkles,
  MapPin,
  Flame,
  BadgeCheck,
} from "lucide-react";
import { Product, StoreUnit } from "../types";

interface TotemTerminalViewProps {
  products: Product[];
  selectedStore: StoreUnit;
  onOpenScanner: () => void;
}

export const TotemTerminalView: React.FC<TotemTerminalViewProps> = ({
  products,
  selectedStore,
  onOpenScanner,
}) => {
  const [activeBarcode, setActiveBarcode] = useState<string>("");
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [resetCountdown, setResetCountdown] = useState<number>(10);

  // Handle barcode submit
  const handleScanCode = (code: string) => {
    setActiveBarcode(code);
    const found = products.find(
      (p) => p.barcode === code || p.id === code || p.name.toLowerCase().includes(code.toLowerCase())
    );
    if (found) {
      setScannedProduct(found);
      setResetCountdown(10);
    } else {
      setScannedProduct(null);
    }
  };

  // Auto reset timer for terminal view
  useEffect(() => {
    if (!scannedProduct) return;

    const timer = setInterval(() => {
      setResetCountdown((prev) => {
        if (prev <= 1) {
          setScannedProduct(null);
          setActiveBarcode("");
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [scannedProduct]);

  return (
    <div className="bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 max-w-4xl mx-auto min-h-[550px] flex flex-col justify-between relative overflow-hidden">
      {/* Terminal Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center font-black text-2xl text-white shadow-md">
            Y
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900">
              Super Yama • Totem Consulta Rápida
            </h2>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              {selectedStore.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Terminal Online
          </span>
        </div>
      </div>

      {/* Main Terminal Screen Content */}
      <div className="my-8 flex-1 flex flex-col items-center justify-center text-center">
        {!scannedProduct ? (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-red-300 animate-bounce">
              <QrCode className="w-12 h-12 text-red-600" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">
                Passe o código de barras no leitor
              </h3>
              <p className="text-sm text-slate-500">
                Aproxime o produto do scanner do totem ou selecione um código de teste abaixo para consultar o preço instantâneo.
              </p>
            </div>

            {/* Quick barcode simulation input */}
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 max-w-sm mx-auto shadow-xs">
              <input
                type="text"
                value={activeBarcode}
                onChange={(e) => setActiveBarcode(e.target.value)}
                placeholder="Digite o EAN ou nome..."
                className="w-full bg-transparent px-3 text-sm text-slate-900 focus:outline-none placeholder-slate-400 font-medium"
              />
              <button
                onClick={() => handleScanCode(activeBarcode)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl whitespace-nowrap shadow-sm shadow-red-200"
              >
                Consultar
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative animate-fadeIn">
            {/* Auto reset countdown ticker */}
            <div className="absolute top-4 right-4 bg-white text-slate-600 text-xs font-mono px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1 shadow-xs">
              <RefreshCw className="w-3 h-3 animate-spin text-red-600" />
              Reiniciando em {resetCountdown}s
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 text-left">
              <img
                src={scannedProduct.imageUrl}
                alt={scannedProduct.name}
                className="w-36 h-36 object-contain rounded-2xl bg-white p-2 border border-slate-200 shadow-sm"
              />

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-blue-700 uppercase bg-blue-100 px-2.5 py-0.5 rounded-full">
                    {scannedProduct.brand}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    SKU: {scannedProduct.barcode}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-slate-900 leading-tight">
                  {scannedProduct.name}
                </h3>

                <div className="text-xs text-slate-500 flex items-center gap-2 font-medium">
                  <span>{scannedProduct.unitMeasure}</span>
                  <span>•</span>
                  <span className="text-slate-700 font-bold">
                    Localização: {scannedProduct.aisle}
                  </span>
                </div>
              </div>
            </div>

            {/* Giant Price Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="text-center sm:text-left">
                <span className="text-xs text-slate-500 font-medium block mb-0.5">
                  Preço Normal na Prateleira
                </span>
                <span className="text-xl text-slate-400 line-through font-bold">
                  R$ {scannedProduct.price.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <div className="text-center sm:text-right bg-red-50 px-6 py-4 rounded-2xl border border-red-100">
                <span className="text-xs text-red-600 font-extrabold uppercase tracking-wider flex items-center justify-center sm:justify-end gap-1 mb-1">
                  <BadgeCheck className="w-4 h-4 text-red-600" />
                  Preço Clube Yama
                </span>
                <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter">
                  R$ {scannedProduct.clubeYamaPrice.toFixed(2).replace(".", ",")}
                </div>
                <span className="text-xs text-emerald-700 font-bold block mt-1">
                  Economia de R${" "}
                  {(scannedProduct.price - scannedProduct.clubeYamaPrice)
                    .toFixed(2)
                    .replace(".", ",")}{" "}
                  por unidade
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Bottom Shortcuts */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <span>Outros produtos para testar:</span>
          <div className="flex gap-1.5 overflow-x-auto">
            {products.slice(0, 4).map((p) => (
              <button
                key={p.id}
                onClick={() => handleScanCode(p.barcode)}
                className="bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-800 font-medium transition"
              >
                {p.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenScanner}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-md shadow-red-200"
        >
          <QrCode className="w-4 h-4" />
          Abrir Câmera do Leitor
        </button>
      </div>
    </div>
  );
};
