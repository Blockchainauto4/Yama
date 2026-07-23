import React from "react";
import {
  Product,
  StoreUnit,
  UserProfile,
} from "../types";
import {
  ShoppingBag,
  MapPin,
  Flame,
  CheckCircle2,
  AlertTriangle,
  BadgeCheck,
  Tag,
  Share2,
  TrendingDown,
  Lock,
  Sparkles,
} from "lucide-react";

interface ProductDetailCardProps {
  product: Product;
  selectedStore: StoreUnit;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onReportPrice: (product: Product) => void;
}

export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({
  product,
  selectedStore,
  currentUser,
  onOpenAuth,
  onAddToCart,
  onReportPrice,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [addedNotice, setAddedNotice] = React.useState(false);

  const discountPercent = Math.round(
    ((product.price - product.clubeYamaPrice) / product.price) * 100
  );

  const handleAdd = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };


  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 text-slate-800 flex flex-col md:flex-row transition">
      {/* Product Image Section */}
      <div className="relative md:w-2/5 bg-slate-100 p-8 flex items-center justify-center min-h-[240px]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-56 w-auto object-contain rounded-2xl shadow-inner"
        />

        {product.inPromotion && (
          <span className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow flex items-center gap-1 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-current" />
            {product.promotionBadge || `${discountPercent}% OFF`}
          </span>
        )}

        <span className="absolute bottom-4 left-4 bg-white/90 text-slate-500 font-mono text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
          SKU: {product.barcode}
        </span>
      </div>

      {/* Product Info Section */}
      <div className="p-8 md:w-3/5 flex flex-col justify-between gap-6">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
              {product.brand} • {product.category.toUpperCase()}
            </span>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {product.stockQuantity} em estoque
            </span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
            {product.name}
          </h2>

          <p className="text-sm text-slate-500 mt-2 leading-relaxed">{product.description}</p>

          {/* Corridor Location */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
            <MapPin className="w-4 h-4 text-red-600" />
            <span>Localização na loja: {product.aisle}</span>
          </div>
        </div>

        {/* Pricing Box */}
        {currentUser ? (
          <div className="space-y-4">
            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-2xl font-bold text-slate-400 pb-2">R$</span>
              <span className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tighter">
                {product.clubeYamaPrice.toFixed(2).replace(".", ",")}
              </span>
              <div className="mb-2 bg-red-50 p-2.5 rounded-xl border border-red-100">
                <p className="text-red-600 text-xs font-bold uppercase">Oferta Yama</p>
                <p className="text-slate-500 text-xs line-through decoration-slate-400 font-semibold">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-emerald-700 text-xs font-bold uppercase mb-0.5">Economia no Clube</p>
                <p className="text-base font-bold text-emerald-900">
                  R$ {(product.price - product.clubeYamaPrice).toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-amber-700 text-xs font-bold uppercase mb-0.5">Preço Unitário</p>
                <p className="text-base font-bold text-amber-900">{product.unitPriceRatio}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-3xl p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-amber-950">
                Preço Exclusivo para Cadastrados
              </h4>
              <p className="text-xs text-amber-800 font-medium max-w-sm mx-auto mt-1">
                Faça login ou cadastre-se grátis em menos de 10 segundos para visualizar o preço e garantir <strong>5% de desconto de boas-vindas</strong> em sua compra.
              </p>
            </div>
            <button
              onClick={onOpenAuth}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-2xl transition shadow-lg shadow-red-200 flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Criar Conta / Entrar para Ver Preço & Ganhar 5% OFF</span>
            </button>
          </div>
        )}


        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center bg-slate-100 rounded-2xl border border-slate-200 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-xl bg-white hover:bg-slate-200 text-slate-900 font-bold flex items-center justify-center shadow-xs"
            >
              -
            </button>
            <span className="w-10 text-center font-bold text-sm text-slate-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl bg-white hover:bg-slate-200 text-slate-900 font-bold flex items-center justify-center shadow-xs"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <button
              onClick={handleAdd}
              className={`w-full py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg ${
                addedNotice
                  ? "bg-emerald-600 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {addedNotice ? "Adicionado ao Carrinho!" : "Adicionar ao Carrinho"}
            </button>

            <button
              onClick={() => onReportPrice(product)}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-red-600 rounded-xl border border-slate-200 transition"
              title="Notificar divergência de preço na prateleira"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
