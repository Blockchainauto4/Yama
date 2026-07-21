import React from "react";
import { Product, StoreUnit } from "../types";
import { Flame, Clock, BadgeCheck, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface PromotionsFlyerProps {
  products: Product[];
  selectedStore: StoreUnit;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const PromotionsFlyer: React.FC<PromotionsFlyerProps> = ({
  products,
  selectedStore,
  onAddToCart,
}) => {
  const promoProducts = products.filter((p) => p.inPromotion);

  return (
    <div className="space-y-8">
      {/* Flyer Header Banner */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl p-6 sm:p-10 text-white shadow-lg shadow-red-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 font-serif text-[180px] font-black select-none pointer-events-none leading-none">
          YAMA
        </div>

        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-white/30 uppercase tracking-widest backdrop-blur-xs">
            <Flame className="w-4 h-4 text-amber-300 fill-current animate-bounce" />
            Encarte Digital de Ofertas
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight uppercase">
            SUPER YAMA <br />
            <span className="text-amber-300 font-serif lowercase italic">
              ofertas imbatíveis da semana
            </span>
          </h2>

          <p className="text-sm text-red-100 font-medium max-w-lg">
            Aproveite os melhores preços com o seu cadastro no{" "}
            <strong>Clube Yama</strong> na unidade {selectedStore.name}.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-900">
            <div className="bg-white text-slate-900 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-md">
              <Clock className="w-4 h-4 text-red-600" />
              Ofertas válidas até Domingo ou enquanto durar o estoque
            </div>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-600" />
            Destaques do Encarte ({promoProducts.length} itens em oferta)
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Super Yama • {selectedStore.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promoProducts.map((p) => {
            const savings = (p.price - p.clubeYamaPrice).toFixed(2).replace(".", ",");
            return (
              <div
                key={p.id}
                className="bg-white border border-slate-200 hover:border-red-500 rounded-3xl p-6 text-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 flex flex-col justify-between transition group"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-red-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-current" />
                    {p.promotionBadge || "OFERTA"}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Economize R$ {savings}
                  </span>
                </div>

                {/* Image */}
                <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100 flex items-center justify-center relative">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-36 w-auto object-contain group-hover:scale-105 transition transform"
                  />
                  <span className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">
                    SKU: {p.barcode}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider">
                    {p.brand} • {p.category.toUpperCase()}
                  </span>
                  <h4 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                    {p.name}
                  </h4>
                  <div className="text-xs text-slate-500">{p.unitMeasure}</div>
                </div>

                {/* Price Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Preço Regular:</span>
                    <span className="line-through">
                      R$ {p.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">
                      R$ {p.clubeYamaPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-[10px] font-bold text-white bg-slate-900 px-2 py-0.5 rounded uppercase flex items-center gap-0.5">
                      <BadgeCheck className="w-3 h-3 text-amber-400" /> Clube
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(p, 1)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-200 transition active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Garantir Oferta no Carrinho
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
