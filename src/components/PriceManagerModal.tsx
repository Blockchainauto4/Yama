import React, { useState } from "react";
import { Product, PriceChangeLog } from "../types";
import { Settings, Save, RefreshCw, Flame, CheckCircle2, History, Tag } from "lucide-react";

interface PriceManagerModalProps {
  products: Product[];
  onUpdateProductPrice: (
    productId: string,
    newPrice: number,
    newClubePrice: number,
    inPromotion: boolean,
    badge?: string
  ) => void;
  priceLogs: PriceChangeLog[];
}

export const PriceManagerModal: React.FC<PriceManagerModalProps> = ({
  products,
  onUpdateProductPrice,
  priceLogs,
}) => {
  const [selectedProdId, setSelectedProdId] = useState<string>(products[0]?.id || "");
  const selectedProd = products.find((p) => p.id === selectedProdId) || products[0];

  const [editPrice, setEditPrice] = useState<string>(selectedProd?.price.toString() || "");
  const [editClubePrice, setEditClubePrice] = useState<string>(
    selectedProd?.clubeYamaPrice.toString() || ""
  );
  const [isPromo, setIsPromo] = useState<boolean>(selectedProd?.inPromotion || false);
  const [promoBadge, setPromoBadge] = useState<string>(selectedProd?.promotionBadge || "");
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSelectProduct = (id: string) => {
    setSelectedProdId(id);
    const prod = products.find((p) => p.id === id);
    if (prod) {
      setEditPrice(prod.price.toString());
      setEditClubePrice(prod.clubeYamaPrice.toString());
      setIsPromo(prod.inPromotion);
      setPromoBadge(prod.promotionBadge || "");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const np = parseFloat(editPrice.replace(",", "."));
    const ncp = parseFloat(editClubePrice.replace(",", "."));

    if (isNaN(np) || isNaN(ncp)) return;

    onUpdateProductPrice(selectedProdId, np, ncp, isPromo, promoBadge);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-800">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-900 rounded-2xl text-white">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Painel Gestor - Atualização de Preços em Tempo Real
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Altere o valor de qualquer produto para refletir instantaneamente em todos os totens e telas do sistema Super Yama
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selector List */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-xs uppercase text-slate-400 tracking-wider px-2">
            Selecione o Produto
          </h3>
          <div className="max-h-[380px] overflow-y-auto space-y-1.5 pr-1">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectProduct(p.id)}
                className={`w-full p-3 rounded-2xl text-left flex items-center justify-between gap-2 transition ${
                  p.id === selectedProdId
                    ? "bg-red-600 text-white font-bold shadow-md shadow-red-200"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <div className="min-w-0">
                  <div className="text-xs truncate">{p.name}</div>
                  <div className="text-[10px] opacity-75 font-mono">
                    SKU: {p.barcode}
                  </div>
                </div>
                <div className={`text-xs font-bold whitespace-nowrap ${p.id === selectedProdId ? "text-white" : "text-slate-900"}`}>
                  R$ {p.clubeYamaPrice.toFixed(2).replace(".", ",")}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Form */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          {selectedProd && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <img
                  src={selectedProd.imageUrl}
                  alt={selectedProd.name}
                  className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-base text-slate-900">
                    {selectedProd.name}
                  </h4>
                  <div className="text-xs text-slate-500 font-medium">
                    Marca: {selectedProd.brand} • Corredor: {selectedProd.aisle}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Preço Regular Prateleira (R$)
                  </label>
                  <input
                    type="text"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-red-600 mb-1">
                    Preço Exclusivo Clube Yama (R$)
                  </label>
                  <input
                    type="text"
                    value={editClubePrice}
                    onChange={(e) => setEditClubePrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-slate-900 font-black text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={isPromo}
                    onChange={(e) => setIsPromo(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 bg-white border-slate-300 focus:ring-0"
                  />
                  <span>Ativar Destaque no Encarte de Ofertas</span>
                </label>

                {isPromo && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Selo / Etiqueta Promocional
                    </label>
                    <input
                      type="text"
                      value={promoBadge}
                      onChange={(e) => setPromoBadge(e.target.value)}
                      placeholder="Ex: OFERTA RELÂMPAGO, SEXTA DA CARNE"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-red-500"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-red-200 active:scale-95"
              >
                <Save className="w-4 h-4" />
                Atualizar Preço em Tempo Real
              </button>

              {successMsg && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-3 rounded-xl text-xs text-center font-bold flex items-center justify-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Preço atualizado e transmitido em tempo real para os totens!
                </div>
              )}
            </form>
          )}

          {/* Audit History Log */}
          {priceLogs.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-slate-600" />
                Histórico de Modificações Recentes
              </h4>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {priceLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex justify-between items-center"
                  >
                    <span className="font-bold text-slate-800">
                      {log.productName}
                    </span>
                    <span className="text-red-600 font-mono font-bold">
                      Clube: R$ {log.oldClubePrice.toFixed(2)} → R${" "}
                      {log.newClubePrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
