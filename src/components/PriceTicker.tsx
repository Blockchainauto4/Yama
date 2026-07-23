import React, { useState } from "react";
import { Product, UserProfile } from "../types";
import { Sparkles, Plus, Tag, ArrowDownRight, Lock, Gauge, Pause, Play } from "lucide-react";

interface PriceTickerProps {
  products: Product[];
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onAddToCart?: (product: Product) => void;
}

export const PriceTicker: React.FC<PriceTickerProps> = ({
  products,
  currentUser,
  onOpenAuth,
  onAddToCart,
}) => {
  const [tickerSpeed, setTickerSpeed] = useState<"slow" | "normal" | "paused">("slow");

  const tickerProducts = products.length > 0 ? [...products, ...products] : [];

  // Speed duration: "slow" = 85s (fácil de manobrar), "normal" = 45s
  const animationDuration = tickerSpeed === "slow" ? "85s" : "45s";

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

        {/* Speed & Maneuver Controls */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-950/90 px-3 py-2 border-r border-slate-800 z-20 text-[11px]">
          <Gauge className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400 font-bold">Velocidade:</span>
          <button
            onClick={() => setTickerSpeed("slow")}
            className={`px-2 py-0.5 rounded font-bold transition text-[10px] ${
              tickerSpeed === "slow"
                ? "bg-amber-400 text-slate-950 shadow-xs"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
            title="Velocidade reduzida para manobrar e clicar com facilidade"
          >
            🐢 Lenta (Manobrar)
          </button>
          <button
            onClick={() => setTickerSpeed("normal")}
            className={`px-2 py-0.5 rounded font-bold transition text-[10px] ${
              tickerSpeed === "normal"
                ? "bg-amber-400 text-slate-950 shadow-xs"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            ⚡ Normal
          </button>
          <button
            onClick={() =>
              setTickerSpeed((prev) => (prev === "paused" ? "slow" : "paused"))
            }
            className={`p-1 rounded font-bold transition ${
              tickerSpeed === "paused"
                ? "bg-red-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
            title="Pausar / Retomar"
          >
            {tickerSpeed === "paused" ? (
              <Play className="w-3 h-3 fill-current" />
            ) : (
              <Pause className="w-3 h-3 fill-current" />
            )}
          </button>
        </div>

        {/* Marquee Track Container */}
        <div className="overflow-hidden whitespace-nowrap flex-1 py-2 relative group">
          <div
            className={`inline-flex items-center gap-6 ${
              tickerSpeed === "paused"
                ? "[animation-play-state:paused]"
                : "animate-ticker group-hover:[animation-play-state:paused]"
            }`}
            style={{ animationDuration }}
          >
            {tickerProducts.map((p, index) => {
              const discountPercent = Math.round(
                ((p.price - p.clubeYamaPrice) / p.price) * 100
              );

              return (
                <div
                  key={`${p.id}-${index}`}
                  className="inline-flex items-center gap-3 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-xl transition duration-200 cursor-pointer text-xs"
                  onClick={() => {
                    if (!currentUser) {
                      onOpenAuth();
                    } else if (onAddToCart) {
                      onAddToCart(p);
                    }
                  }}
                  title={
                    currentUser
                      ? `Clique para adicionar ${p.name} ao carrinho`
                      : "Faça login para ver o preço e comprar"
                  }
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

                  {/* Prices & Discount Indicator or Login Lock */}
                  {currentUser ? (
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
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAuth();
                      }}
                      className="flex items-center gap-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-2 py-0.5 rounded-lg transition"
                    >
                      <Lock className="w-3 h-3 text-amber-400" />
                      <span>Faça Login p/ ver preço</span>
                    </button>
                  )}

                  {/* Add to Cart Quick Trigger */}
                  {onAddToCart && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!currentUser) {
                          onOpenAuth();
                        } else {
                          onAddToCart(p);
                        }
                      }}
                      className="ml-1 p-1 bg-red-600 hover:bg-red-500 text-white rounded-lg transition shrink-0"
                      title={currentUser ? "Adicionar ao Carrinho" : "Faça Login"}
                    >
                      {currentUser ? <Plus className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
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
          <span>PAUSE AO PASSAR O MOUSE</span>
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
          animation-name: ticker;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};
