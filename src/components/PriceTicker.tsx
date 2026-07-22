import React from "react";
import { Product } from "../types";
import { TrendingDown, Sparkles, Plus, Tag, ArrowDownRight } from "lucide-react";

interface PriceTickerProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const PriceTicker: React.FC<PriceTickerProps> = ({
  products,
  onAddToCart,
}) => {
  // Select a list of products to highlight in the ticker (promotions and popular items)
  const tickerProducts = products.length > 0 ? [...products, ...products] : [];

  return (
    <div className="bg-slate-900 border-y border-slate-800 text-white overflow-hidden shadow-inner relative z-10 select-none">
      <div className="flex items-center">
        {/* Ticker Fixed Header Tag */}
        <div className="bg-red-600 text-white font-black text-[11px] uppercase tracking-wider px-3.5 py-2.5 flex items-center gap-2 shrink-0 z-20 shadow-md border-r border-red-700">
          <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
          <span className="w-2 h-2 rounded-full bg-white shrink-0 -ml-4" />
          <span className="hidden sm:inline font-mono">COTAÇÕES YAMA</span>
          <span className="sm:hidden font-mono">OFERTAS</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* Marquee Track Container */}
        <div className="overflow-hidden whitespace-nowrap flex-1 py-2 relative group">
          <div className="inline-flex animate-ticker group-hover:[animation-play-state:paused] items-center gap-6">
            {tickerProducts.map((p, index) => {
              const discountPercent = Math.round(
                ((p.price - p.clubeYamaPrice) / p.price) * 100
              );

              return (
                <div
                  key={`${p.id}-${index}`}
                  className="inline-flex items-center gap-3 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-xl transition duration-200 cursor-pointer text-xs"
                  onClick={() => onAddToCart && onAddToCart(p)}
                  title={`Clique para adicionar ${p.name} ao carrinho`}
                >
                  {/* Mini Product Image */}
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-7 h-7 object-contain bg-white rounded-lg p-0.5 shrink-0"
                  />

                  {/* Product Details */}
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-200 hover:text-white max-w-[140px] truncate">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ({p.brand})
                    </span>
                  </div>

                  {/* Prices & Discount Indicator */}
                  <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
                    <span className="text-[10px] text-slate-400 line-through font-mono">
                      R$ {p.price.toFixed(2).replace(".", ",")}
                    </span>

                    <span className="font-black text-amber-300 text-xs font-mono">
                      R$ {p.clubeYamaPrice.toFixed(2).replace(".", ",")}
                    </span>

                    {discountPercent > 0 && (
                      <span className="bg-emerald-950/90 text-emerald-400 border border-emerald-800/80 text-[10px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        <ArrowDownRight className="w-3 h-3" />
                        -{discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Quick Trigger */}
                  {onAddToCart && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p);
                      }}
                      className="ml-1 p-1 bg-red-600 hover:bg-red-500 text-white rounded-lg transition shrink-0"
                      title="Adicionar ao Carrinho"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Info Tag */}
        <div className="hidden md:flex items-center gap-2 bg-slate-950 text-slate-400 text-[11px] font-mono px-3 py-2.5 shrink-0 border-l border-slate-800 z-20">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>PAUSE AO PASSA O MOUSE</span>
        </div>
      </div>

      {/* Inline styles for custom ticker keyframes animation */}
      <style>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          display: inline-flex;
          animation: ticker 35s linear infinite;
        }
      `}</style>
    </div>
  );
};
