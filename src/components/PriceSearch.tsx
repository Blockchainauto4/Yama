import React, { useState, useMemo } from "react";
import {
  Product,
  CategoryType,
  StoreUnit,
  UserProfile,
} from "../types";
import {
  Search,
  QrCode,
  Sparkles,
  Flame,
  Tag,
  SlidersHorizontal,
  ChevronRight,
  TrendingDown,
  ShoppingBag,
  Info,
  Lock,
  UserCheck,
} from "lucide-react";
import { ProductDetailCard } from "./ProductDetailCard";

interface PriceSearchProps {
  products: Product[];
  selectedStore: StoreUnit;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onReportPrice: (product: Product) => void;
  onOpenScanner: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const PriceSearch: React.FC<PriceSearchProps> = ({
  products,
  selectedStore,
  currentUser,
  onOpenAuth,
  onAddToCart,
  onReportPrice,
  onOpenScanner,
  searchQuery,
  setSearchQuery,
}) => {

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "tudo">("tudo");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: { id: CategoryType | "tudo"; label: string; icon: string }[] = [
    { id: "tudo", label: "Todos os Itens", icon: "🛒" },
    { id: "padaria", label: "Padaria", icon: "🥖" },
    { id: "limpeza", label: "Produtos de Limpeza", icon: "🧼" },
    { id: "churrasco", label: "Produtos p/ Churrasco", icon: "🔥" },
    { id: "hortifruti", label: "Hortifruti", icon: "🍎" },
    { id: "utensílios domésticos", label: "Utensílios Domésticos", icon: "🍳" },
    { id: "açougue", label: "Açougue & Carnes", icon: "🥩" },
    { id: "mercearia", label: "Mercearia", icon: "🌾" },
    { id: "laticínios", label: "Laticínios & Frios", icon: "🧀" },
    { id: "bebidas", label: "Adega & Disque Bebida / Cerveja / Vinho", icon: "🍷" },
    { id: "higiene", label: "Higiene Pessoal", icon: "🧴" },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.barcode.includes(searchQuery) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "tudo" || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search Header Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl relative z-10 w-full mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider mb-6 shadow-sm border border-blue-100">
            <Sparkles className="w-3 h-3 fill-current" />
            Consulta em Tempo Real
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-900 mb-4">
            Qual o preço?
          </h2>
          
          <p className="text-sm sm:text-base text-slate-500 font-medium mb-8 max-w-lg mx-auto">
            Busque o nome do produto, passe o código de barras ou use a câmera do seu celular para consultar o preço em{" "}
            <strong className="text-slate-900 font-bold">{selectedStore.name}</strong>.
          </p>

          {/* Search Inputs & Camera Scanner trigger */}
          <div className="flex flex-col sm:flex-row gap-3 shadow-xl shadow-slate-200/50 rounded-2xl p-2 bg-white border border-slate-100">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (selectedProduct) setSelectedProduct(null);
                }}
                placeholder="Busque por produto ou código de barras..."
                className="w-full pl-12 pr-4 py-4 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-base sm:text-lg font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-md font-bold transition"
                >
                  Limpar
                </button>
              )}
            </div>
            <button
              onClick={onOpenScanner}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              <span>CÂMERA</span>
            </button>
          </div>

          {/* Quick Presets Barcode Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
            <span className="text-slate-400 font-bold flex items-center gap-1 text-[10px] uppercase tracking-wider mr-2">
              <Tag className="w-3 h-3" /> Testar:

            </span>
            {[
              { label: "Arroz Camil 5kg", code: "7891000100103" },
              { label: "Feijão Kicaldo 1kg", code: "7896006700018" },
              { label: "Leite Itambé 1L", code: "7891025100010" },
              { label: "Contra Filé kg", code: "7891000300015" },
            ].map((chip) => (
              <button
                key={chip.code}
                onClick={() => {
                  setSearchQuery(chip.code);
                  const found = products.find((p) => p.barcode === chip.code);
                  if (found) setSelectedProduct(found);
                }}
                className="bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1 rounded-lg whitespace-nowrap text-slate-700 font-medium transition"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Filter Menu Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-slate-500">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            Explorar Categorias
          </span>
          {selectedCategory !== "tudo" && (
            <button
              onClick={() => setSelectedCategory("tudo")}
              className="text-blue-600 hover:underline text-[11px] font-extrabold"
            >
              Ver Tudo
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const itemCount =
              cat.id === "tudo"
                ? products.length
                : products.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-300"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    selectedCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Product Detail Card or List View */}
      {selectedProduct ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-red-600" /> Detalhes do Item Selecionado
            </h3>
            <button
              onClick={() => setSelectedProduct(null)}
              className="text-xs text-red-600 hover:underline font-bold"
            >
              Voltar para lista de produtos
            </button>
          </div>
          <ProductDetailCard
            product={selectedProduct}
            selectedStore={selectedStore}
            currentUser={currentUser}
            onOpenAuth={onOpenAuth}
            onAddToCart={onAddToCart}
            onReportPrice={onReportPrice}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Exibindo <strong className="text-slate-800">{filteredProducts.length}</strong> itens cadastrados em{" "}
              <strong className="text-slate-800">{selectedStore.name}</strong>
            </span>
            {currentUser ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Preços liberados + 5% OFF de Boas-Vindas
              </span>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-amber-800 font-extrabold flex items-center gap-1 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full border border-amber-300 transition text-xs"
              >
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                Faça Login p/ ver todos os preços e ganhar 5% OFF
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-3 shadow-sm">
              <Search className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">Nenhum produto encontrado</h3>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Não encontramos nenhum item para a busca "{searchQuery}". Tente buscar por outros nomes como "Arroz", "Carne", "Cerveja" ou digite o código de barras.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("tudo");
                }}
                className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-red-100"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      if (!currentUser) {
                        onOpenAuth();
                      } else {
                        setSelectedProduct(p);
                      }
                    }}
                    className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-5 transition-all duration-200 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      {/* Badge header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                          {p.brand}
                        </span>
                        {p.inPromotion && (
                          <span className="text-[10px] font-extrabold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full flex items-center gap-1 border border-orange-200">
                            <Flame className="w-3 h-3 fill-current" />
                            OFERTA
                          </span>
                        )}
                      </div>

                      {/* Image & Title */}
                      <div className="flex flex-col gap-3 mb-4">
                        <div className="flex items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100 group-hover:bg-blue-50 transition-colors">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-24 h-24 object-contain group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[13px] text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {p.name}
                          </h4>
                          <div className="text-[11px] text-slate-500 mt-1">
                            {p.unitMeasure}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            SKU: {p.barcode}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing footer or Login Lock */}
                    <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                      {currentUser ? (
                        <div>
                          <div className="text-[11px] text-slate-400 line-through">
                            R$ {p.price.toFixed(2).replace(".", ",")}
                          </div>
                          <div className="text-xl font-black text-slate-900 tracking-tighter">
                            R$ {p.yammaPrice.toFixed(2).replace(".", ",")}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenAuth();
                          }}
                          className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-2 rounded-xl transition w-full justify-center"
                        >
                          <Lock className="w-4 h-4" />
                          <span>Ouvir e Liberar Preço</span>
                        </button>
                      )}

                      {currentUser && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(p, 1);
                          }}
                          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-md shadow-blue-200 flex items-center justify-center active:scale-95"
                          title="Adicionar ao carrinho"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
              ))}

            </div>
          )}
        </div>
      )}
    </div>
  );
};
