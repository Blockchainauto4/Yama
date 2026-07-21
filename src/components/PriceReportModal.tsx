import React, { useState } from "react";
import { Product, StoreUnit } from "../types";
import { AlertTriangle, X, Send, CheckCircle2 } from "lucide-react";

interface PriceReportModalProps {
  product: Product | null;
  selectedStore: StoreUnit;
  onClose: () => void;
  onSubmitReport: (
    productId: string,
    foundPrice: number,
    notes: string
  ) => void;
}

export const PriceReportModal: React.FC<PriceReportModalProps> = ({
  product,
  selectedStore,
  onClose,
  onSubmitReport,
}) => {
  const [shelfPrice, setShelfPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(shelfPrice.replace(",", "."));
    if (isNaN(parsedPrice)) return;

    onSubmitReport(product.id, parsedPrice, notes);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-slate-800 shadow-2xl relative space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Divergência de Preço na Prateleira
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3 text-xs">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-12 h-12 object-contain bg-white rounded-xl p-1 border border-slate-200"
          />
          <div>
            <div className="font-bold text-slate-900">{product.name}</div>
            <div className="text-slate-500 font-medium">
              Preço no Sistema: R${" "}
              {product.clubeYamaPrice.toFixed(2).replace(".", ",")}
            </div>
          </div>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 font-bold mb-1">
                Qual preço estava marcado na etiqueta da prateleira? (R$)
              </label>
              <input
                type="text"
                required
                value={shelfPrice}
                onChange={(e) => setShelfPrice(e.target.value)}
                placeholder="Ex: 19,90"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">
                Observação (Opcional - Ex: Corredor 3, prateleira do meio)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Ex: Etiqueta amarela no corredor 3 dizia R$ 19,90"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition shadow-md shadow-red-200"
            >
              <Send className="w-4 h-4" />
              Enviar Notificação para a Gerência
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="font-bold text-base text-slate-900">
              Notificação Enviada!
            </h4>
            <p className="text-xs text-slate-500">
              A equipe da unidade {selectedStore.name} verificará a etiqueta imediatamente. Obrigado!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
