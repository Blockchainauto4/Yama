import React, { useState } from "react";
import { CartItem, Product, StoreUnit } from "../types";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Share2,
  TrendingDown,
  Receipt,
  ArrowLeftRight,
  Zap,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Tag,
  CheckCircle2,
} from "lucide-react";

interface CartManagerProps {
  cart: CartItem[];
  products?: Product[];
  selectedStore: StoreUnit;
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onSwapItem?: (oldProductId: string, newProduct: Product) => void;
  onSwapAllCheaper?: () => void;
}

export const CartManager: React.FC<CartManagerProps> = ({
  cart,
  products = [],
  selectedStore,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSwapItem,
  onSwapAllCheaper,
}) => {
  const [copied, setCopied] = useState(false);
  const [expandedComparisons, setExpandedComparisons] = useState<Record<string, boolean>>({});

  const toggleExpand = (productId: string) => {
    setExpandedComparisons((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const regularTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const clubeTotal = cart.reduce(
    (sum, item) => sum + item.product.clubeYamaPrice * item.quantity,
    0
  );

  const totalSavings = regularTotal - clubeTotal;

  // Calculate quick price comparison for each item in the cart
  const itemComparisons = cart.map((item) => {
    // Find all products in the same category that are cheaper than current item
    const cheaperCompetitors = products
      .filter(
        (p) =>
          p.category === item.product.category &&
          p.id !== item.product.id &&
          p.clubeYamaPrice < item.product.clubeYamaPrice
      )
      .sort((a, b) => a.clubeYamaPrice - b.clubeYamaPrice);

    const bestAlternative = cheaperCompetitors[0] || null;
    const unitSavings = bestAlternative
      ? item.product.clubeYamaPrice - bestAlternative.clubeYamaPrice
      : 0;
    const totalItemPotentialSavings = unitSavings * item.quantity;

    return {
      cartItem: item,
      cheaperCompetitors,
      bestAlternative,
      unitSavings,
      totalItemPotentialSavings,
    };
  });

  // Calculate total potential extra savings across all items
  const totalPotentialExtraSavings = itemComparisons.reduce(
    (sum, comp) => sum + comp.totalItemPotentialSavings,
    0
  );

  const itemsWithCheaperAlternativesCount = itemComparisons.filter(
    (comp) => comp.bestAlternative !== null
  ).length;

  const handleShareList = () => {
    let text = `🛒 *Minha Lista de Compras - Super Yama (${selectedStore.name})*\n\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.product.name}* (${item.quantity}x)\n`;
      text += `   Preço Clube: R$ ${(
        item.product.clubeYamaPrice * item.quantity
      )
        .toFixed(2)
        .replace(".", ",")}\n`;
    });
    text += `\n💰 *Total com Clube Yama:* R$ ${clubeTotal
      .toFixed(2)
      .replace(".", ",")}\n`;
    text += `🎉 *Economia Atual:* R$ ${totalSavings
      .toFixed(2)
      .replace(".", ",")}\n`;

    if (totalPotentialExtraSavings > 0) {
      text += `💡 *Economia Adicional Possível com Comparativo Rápido:* +R$ ${totalPotentialExtraSavings
        .toFixed(2)
        .replace(".", ",")}\n`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-800">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600 rounded-2xl text-white shadow-md shadow-red-200">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Carrinho de Compras & Calculadora
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Verifique o total estimado na unidade <strong className="text-slate-800">{selectedStore.name}</strong>
            </p>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-xl border border-red-100 transition"
          >
            <Trash2 className="w-3.5 h-3.5" /> Esvaziar Carrinho
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-4 shadow-sm">
          <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">Seu carrinho está vazio</h3>
          <p className="text-xs max-w-xs mx-auto text-slate-500">
            Utilize a consulta de preços para adicionar itens e calcular seu desconto com o Clube Yama!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Smart Savings Banner / Comparativo Rápido Global Highlight */}
          {itemsWithCheaperAlternativesCount > 0 && (
            <div className="bg-gradient-to-r from-amber-50 via-blue-50 to-emerald-50 border-2 border-blue-200 rounded-3xl p-5 shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-sm shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                        Comparativo Rápido do Catálogo
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        +{itemsWithCheaperAlternativesCount} sugestão(ões)
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 mt-1">
                      Economize até <span className="text-emerald-700">+R$ {totalPotentialExtraSavings.toFixed(2).replace(".", ",")}</span> trocando marcas!
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      O Super Yama identificou marcas concorrentes mais baratas no mesmo segmento para os itens do seu carrinho.
                    </p>
                  </div>
                </div>

                {onSwapAllCheaper && (
                  <button
                    onClick={onSwapAllCheaper}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-blue-200 transition shrink-0 hover:scale-102"
                  >
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    Trocar Tudo para o Mais Barato
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Item List */}
            <div className="lg:col-span-2 space-y-4">
              {itemComparisons.map(({ cartItem, cheaperCompetitors, bestAlternative, unitSavings, totalItemPotentialSavings }) => (
                <div
                  key={cartItem.product.id}
                  className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3 transition hover:border-slate-300"
                >
                  {/* Item Main Info Row */}
                  <div className="flex items-center justify-between gap-4">
                    <img
                      src={cartItem.product.imageUrl}
                      alt={cartItem.product.name}
                      className="w-16 h-16 object-contain rounded-2xl bg-slate-50 p-1 border border-slate-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded">
                          {cartItem.product.brand}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">
                          {cartItem.product.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 truncate mt-0.5">
                        {cartItem.product.name}
                      </h4>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        Preço Clube: <strong className="text-slate-800">R$ {cartItem.product.clubeYamaPrice.toFixed(2).replace(".", ",")}</strong>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                      <button
                        onClick={() =>
                          onUpdateQuantity(cartItem.product.id, cartItem.quantity - 1)
                        }
                        className="p-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold shadow-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-bold text-xs text-slate-900">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(cartItem.product.id, cartItem.quantity + 1)
                        }
                        className="p-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[80px]">
                      <div className="text-base font-black text-slate-900">
                        R${" "}
                        {(cartItem.product.clubeYamaPrice * cartItem.quantity)
                          .toFixed(2)
                          .replace(".", ",")}
                      </div>
                      <button
                        onClick={() => onRemoveItem(cartItem.product.id)}
                        className="text-[10px] text-red-600 hover:underline font-bold mt-1"
                      >
                        Remover
                      </button>
                    </div>
                  </div>

                  {/* Per-Item Quick Comparison Suggestion Box */}
                  {bestAlternative && (
                    <div className="bg-gradient-to-r from-blue-50/90 to-emerald-50/90 border border-blue-200 rounded-2xl p-3.5 text-xs space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 font-extrabold text-blue-900">
                          <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                          <span>Opção mais barata de marca concorrente:</span>
                        </div>
                        <span className="bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full text-[10px]">
                          Economize R$ {unitSavings.toFixed(2).replace(".", ",")} /un
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-blue-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={bestAlternative.imageUrl}
                            alt={bestAlternative.name}
                            className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900 text-xs">
                              {bestAlternative.name}
                            </div>
                            <div className="text-[11px] text-slate-600 font-medium">
                              Marca <strong className="text-blue-700">{bestAlternative.brand}</strong> • Preço: <span className="font-bold text-emerald-700">R$ {bestAlternative.clubeYamaPrice.toFixed(2).replace(".", ",")}</span>
                            </div>
                          </div>
                        </div>

                        {onSwapItem && (
                          <button
                            onClick={() => onSwapItem(cartItem.product.id, bestAlternative)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3.5 py-2 rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs whitespace-nowrap self-end sm:self-center"
                          >
                            <ArrowLeftRight className="w-3.5 h-3.5" />
                            Trocar para {bestAlternative.brand}
                          </button>
                        )}
                      </div>

                      {/* Expand additional alternatives if available */}
                      {cheaperCompetitors.length > 1 && (
                        <div className="pt-1">
                          <button
                            onClick={() => toggleExpand(cartItem.product.id)}
                            className="text-[11px] font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                          >
                            {expandedComparisons[cartItem.product.id] ? (
                              <>
                                <ChevronUp className="w-3.5 h-3.5" /> Ocultar outras {cheaperCompetitors.length - 1} opções
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3.5 h-3.5" /> Ver mais {cheaperCompetitors.length - 1} marca(s) concorrente(s) mais barata(s)
                              </>
                            )}
                          </button>

                          {expandedComparisons[cartItem.product.id] && (
                            <div className="mt-2 space-y-2 pt-2 border-t border-blue-200/60">
                              {cheaperCompetitors.slice(1).map((comp) => {
                                const compSavings = cartItem.product.clubeYamaPrice - comp.clubeYamaPrice;
                                return (
                                  <div
                                    key={comp.id}
                                    className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-[11px]"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-slate-900">{comp.name}</span>
                                      <span className="text-slate-500">({comp.brand})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-emerald-700">
                                        R$ {comp.clubeYamaPrice.toFixed(2).replace(".", ",")}
                                      </span>
                                      <span className="text-[10px] text-slate-500 font-medium">
                                        (-R$ {compSavings.toFixed(2).replace(".", ",")})
                                      </span>
                                      {onSwapItem && (
                                        <button
                                          onClick={() => onSwapItem(cartItem.product.id, comp)}
                                          className="text-blue-700 hover:underline font-bold text-[10px] bg-blue-50 px-2 py-1 rounded-lg"
                                        >
                                          Trocar
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Cart Summary Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6 self-start">
              <div className="space-y-4">
                <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-red-400" />
                  Resumo da Compra
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal sem Clube:</span>
                    <span className="line-through">
                      R$ {regularTotal.toFixed(2).replace(".", ",")}
                    </span>
                  </div>

                  <div className="flex justify-between text-emerald-400 font-bold bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <span className="flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-400" /> Economia Clube Yama:
                    </span>
                    <span>- R$ {totalSavings.toFixed(2).replace(".", ",")}</span>
                  </div>

                  {totalPotentialExtraSavings > 0 && (
                    <div className="bg-blue-950/80 border border-blue-800/60 p-2.5 rounded-xl space-y-1">
                      <div className="flex justify-between text-amber-300 font-bold">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Economia extra sugerida:
                        </span>
                        <span>+ R$ {totalPotentialExtraSavings.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <p className="text-[10px] text-blue-200 leading-tight">
                        Se você aceitar todas as trocas por concorrentes mais baratos.
                      </p>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="font-bold text-white text-sm">
                      Total Final (Clube):
                    </span>
                    <span className="text-3xl font-black text-white tracking-tight">
                      R$ {clubeTotal.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleShareList}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg ${
                    copied
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-950"
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  {copied ? "Lista Copiada para o WhatsApp!" : "Compartilhar Lista no WhatsApp"}
                </button>

                <div className="text-[11px] text-slate-400 text-center font-medium">
                  Super Yama • Valores válidos para hoje
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
