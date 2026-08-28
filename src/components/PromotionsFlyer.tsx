import React, { useState, useMemo } from "react";
import { Product, StoreUnit } from "../types";
import { TABLOID_SECTIONS } from "../data/tabloidOffers";
import {
  Flame,
  Clock,
  BadgeCheck,
  ShoppingBag,
  Sparkles,
  Search,
  CreditCard,
  Store,
  MapPin,
  CheckCircle2,
  Calendar,
  Percent,
} from "lucide-react";

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
  const [selectedSection, setSelectedSection] = useState<string>("todas");
  const [filterSearch, setFilterSearch] = useState<string>("");

  const promoProducts = useMemo(() => {
    return products.filter((p) => p.inPromotion);
  }, [products]);

  const filteredPromoProducts = useMemo(() => {
    return promoProducts.filter((p) => {
      const matchSection =
        selectedSection === "todas" ||
        p.category.toLowerCase() === selectedSection.toLowerCase();
      const matchQuery =
        filterSearch.trim() === "" ||
        p.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(filterSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(filterSearch.toLowerCase());
      return matchSection && matchQuery;
    });
  }, [promoProducts, selectedSection, filterSearch]);

  return (
    <div className="space-y-8">
      {/* Official Tabloid Header Banner */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-amber-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-red-200 relative overflow-hidden">
        <div className="absolute right-[-20px] top-[-30px] opacity-10 font-serif text-[180px] font-black select-none pointer-events-none leading-none">
          YAMA
        </div>

        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-red-950 font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              <Flame className="w-4 h-4 fill-current animate-pulse" />
              Super Encarte Oficial
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-full backdrop-blur-xs border border-white/30">
              <Calendar className="w-3.5 h-3.5 text-yellow-300" />
              28/08 até 10/09/2026
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none uppercase text-white drop-shadow-sm">
              FECHE O MÊS <br />
              <span className="text-yellow-300 font-extrabold tracking-normal">
                ECONOMIZANDO
              </span>
            </h1>
            <p className="text-red-100 text-sm sm:text-base font-medium max-w-xl pt-1">
              SUPER YAMA SUPERMERCADO • As melhores ofertas para a sua família com preços de atacado e varejo.
            </p>
          </div>

          {/* Condition Pills */}
          <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-bold">
            <div className="bg-white/95 text-slate-900 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-md">
              <CreditCard className="w-4 h-4 text-red-600" />
              Parcelamos em até <strong className="text-red-700">3x sem juros</strong> no cartão acima de R$ 150,00
            </div>
            <div className="bg-emerald-500 text-white px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-md font-extrabold">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              Hortifruti Válido de 28 a 30/08/2026
            </div>
          </div>
        </div>
      </div>

      {/* Store Locations Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 tracking-wider mb-3">
          <Store className="w-4 h-4 text-red-600" />
          Unidades Participantes com Preço Garantido
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
            <div className="font-extrabold text-slate-900 flex items-center justify-between">
              <span>Loja 1 • Cidade Ipava</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                24 Horas
              </span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500 shrink-0" />
              Av. Taquandava, 9
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
            <div className="font-extrabold text-slate-900 flex items-center justify-between">
              <span>Loja 2 • Jd. Vera Cruz</span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Até 00h
              </span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500 shrink-0" />
              Av. dos Funcionários Públicos, 34B
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
            <div className="font-extrabold text-slate-900 flex items-center justify-between">
              <span>Loja 3 • Jd. Vera Cruz</span>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Até 22h
              </span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500 shrink-0" />
              Av. Anatoli Liandovi, 49A
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Section Selector */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-600" />
              Itens do Encarte em Destaque
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Exibindo {filteredPromoProducts.length} itens em oferta especial
            </p>
          </div>

          {/* Search inside Tabloid */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Buscar no encarte..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
            />
          </div>
        </div>

        {/* Section Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedSection("todas")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedSection === "todas"
                ? "bg-red-600 text-white shadow-md shadow-red-200"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            🔥 Todas ({promoProducts.length})
          </button>
          {TABLOID_SECTIONS.map((sec) => {
            const count = promoProducts.filter(
              (p) => p.category.toLowerCase() === sec.category.toLowerCase()
            ).length;
            const isSelected = selectedSection === sec.category;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(sec.category)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span>{sec.icon}</span>
                <span>{sec.title}</span>
                {sec.validity && (
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-black">
                    28-30/08
                  </span>
                )}
                <span className="text-[10px] opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredPromoProducts.map((p) => {
          const savings = (p.price - p.yammaPrice).toFixed(2).replace(".", ",");
          return (
            <div
              key={p.id}
              className="bg-white border border-slate-200 hover:border-red-500 rounded-2xl p-5 text-slate-800 shadow-xs hover:shadow-xl hover:shadow-red-500/10 flex flex-col justify-between transition group relative"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-current" />
                    {p.promotionBadge || "OFERTA"}
                  </span>
                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    -R$ {savings}
                  </span>
                </div>

                {/* Product Image */}
                <div className="bg-slate-50/80 p-3 rounded-xl mb-3 border border-slate-100 flex items-center justify-center relative overflow-hidden h-36">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-full w-auto object-contain group-hover:scale-105 transition transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1.5 right-2 text-[9px] text-slate-400 font-mono">
                    {p.barcode}
                  </span>
                </div>

                {/* Brand and Name */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider">
                      {p.brand}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                    {p.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium">
                    {p.unitMeasure}
                  </div>
                </div>
              </div>

              {/* Price and Action */}
              <div className="space-y-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>Preço Normal:</span>
                    <span className="line-through">
                      R$ {p.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-2xl font-black text-red-600 tracking-tight">
                      R$ {p.yammaPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-[10px] font-bold text-slate-900 bg-amber-300 px-1.5 py-0.5 rounded uppercase flex items-center gap-0.5">
                      <BadgeCheck className="w-3 h-3 text-slate-900" /> Encarte
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(p, 1)}
                  className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-200 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment methods footer */}
      <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 text-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
          <CreditCard className="w-4 h-4 text-amber-400" />
          Formas de Pagamento Aceitas nas 3 Lojas
        </div>
        <p className="text-slate-400 leading-relaxed">
          Aceitamos Dinheiro, Pix, Cartões de Crédito e Débito (Visa, Mastercard, Elo, Hipercard, Cabal) e Vale Refeição / Alimentação (Ticket, Sodexo, VR Benefícios, ValeCard, Alelo, Ben Visa Vale). Parcelamento em até 3x sem juros no cartão de crédito em compras acima de R$ 150,00.
        </p>
      </div>
    </div>
  );
};
