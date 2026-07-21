import React, { useState, useMemo } from "react";
import {
  Product,
  CategoryType,
  StoreUnit,
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
} from "lucide-react";
import { ProductDetailCard } from "./ProductDetailCard";

interface PriceSearchProps {
  products: Product[];
  selectedStore: StoreUnit;
  onAddToCart: (product: Product, quantity: number) => void;
  onReportPrice: (product: Product) => void;
  onOpenScanner: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const PriceSearch: React.FC<PriceSearchProps> = ({
  products,
  selectedStore,
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
    { id: "mercearia", label: "Mercearia", icon: "🌾" },
    { id: "açougue", label: "Açougue", icon: "🥩" },
    { id: "hortifruti", label: "Hortifruti", icon: "🍎" },
    { id: "laticínios", label: "Laticínios & Frios", icon: "🧀" },
    { id: "padaria", label: "Padaria", icon: "🥖" },
    { id: "bebidas", label: "Bebidas", icon: "🥤" },
    { id: "limpeza", label: "Limpeza", icon: "🧼" },
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
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-xs">
            <Flame className="w-3.5 h-3.5 fill-current" />
            Consulta em Tempo Real
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 mb-2">
            SUPER YAMA <span className="text-red-600">SUPERMERCADOS</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium mb-6">
            Digite o nome do produto, passe o código de barras ou use a câmera do seu celular para consultar o preço atualizado na unidade{" "}
            <strong className="text-slate-800 font-bold">{selectedStore.name}</strong>.
          </p>

          {/* Search Inputs & Camera Scanner trigger */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (selectedProduct) setSelectedProduct(null);
                }}
                placeholder="Escaneie o código de barras ou digite o produto..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 text-sm transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded-lg font-semibold"
                >
                  Limpar
                </button>
              )}
            </div>

            <button
              onClick={onOpenScanner}
              className="px-6 py-3.5 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-200 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              <span>CONSULTAR</span>
            </button>
          </div>

          {/* Quick Presets Barcode Chips */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-600 scrollbar-none">
            <span className="text-slate-500 font-bold whitespace-nowrap flex items-center gap-1 uppercase tracking-wider text-[11px]">
              <Tag className="w-3.5 h-3.5 text-red-600" /> Exemp. EAN:
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

      {/* Categories Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition shadow-xs ${
              selectedCategory === cat.id
                ? "bg-red-600 text-white shadow-md shadow-red-200"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
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
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              Valores exclusivos no Clube Yama
            </span>
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
                  onClick={() => setSelectedProduct(p)}
                  className="bg-white border border-slate-200 hover:border-red-500/50 rounded-3xl p-5 transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Badge header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider bg-blue-100 px-2.5 py-0.5 rounded-full">
                        {p.brand}
                      </span>
                      {p.inPromotion && (
                        <span className="text-[10px] font-extrabold bg-red-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <Flame className="w-3 h-3 fill-current" />
                          OFERTA
                        </span>
                      )}
                    </div>

                    {/* Image & Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-20 h-20 object-contain rounded-2xl bg-slate-50 p-2 border border-slate-100 group-hover:scale-105 transition transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-800 group-hover:text-red-600 transition line-clamp-2 leading-tight">
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

                  {/* Pricing footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 line-through">
                        R$ {p.price.toFixed(2).replace(".", ",")}
                      </div>
                      <div className="text-2xl font-black text-slate-900 tracking-tighter">
                        R$ {p.clubeYamaPrice.toFixed(2).replace(".", ",")}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p, 1);
                      }}
                      className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition shadow-md shadow-red-200 flex items-center justify-center active:scale-95"
                      title="Adicionar ao carrinho"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
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
