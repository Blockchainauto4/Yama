import React from "react";
import { CartItem, StoreUnit } from "../types";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Share2,
  BadgeCheck,
  TrendingDown,
  ArrowRight,
  Receipt,
} from "lucide-react";

interface CartManagerProps {
  cart: CartItem[];
  selectedStore: StoreUnit;
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartManager: React.FC<CartManagerProps> = ({
  cart,
  selectedStore,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [copied, setCopied] = React.useState(false);

  const regularTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const clubeTotal = cart.reduce(
    (sum, item) => sum + item.product.clubeYamaPrice * item.quantity,
    0
  );

  const totalSavings = regularTotal - clubeTotal;

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
    text += `🎉 *Economia Total:* R$ ${totalSavings
      .toFixed(2)
      .replace(".", ",")}\n`;

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Item List */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm transition hover:border-slate-300"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-14 h-14 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-blue-700 uppercase">
                    {item.product.brand}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Preço Clube: R${" "}
                    {item.product.clubeYamaPrice.toFixed(2).replace(".", ",")}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="p-1 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold shadow-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold text-xs text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.product.id, item.quantity + 1)
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
                    {(item.product.clubeYamaPrice * item.quantity)
                      .toFixed(2)
                      .replace(".", ",")}
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-[10px] text-red-600 hover:underline font-bold mt-1"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-red-400" />
                Resumo da Compra
              </h3>

              <div className="space-y-2 text-xs">
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
      )}
    </div>
  );
};
