import React, { useState } from "react";
import { StoreUnit } from "../types";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Award,
  BadgePercent,
  HelpCircle,
  LocateFixed,
} from "lucide-react";

interface LocalSeoFooterProps {
  stores: StoreUnit[];
  selectedStore: StoreUnit;
  onSelectStore: (store: StoreUnit) => void;
}

export const LocalSeoFooter: React.FC<LocalSeoFooterProps> = ({
  stores,
  selectedStore,
  onSelectStore,
}) => {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [closestStoreId, setClosestStoreId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Haversine formula to calculate distance between user location and store
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Navegador não suporta geolocalização.");
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserCoords({ lat, lng });

        // Calculate nearest store
        let minDistance = Infinity;
        let nearestId = stores[0].id;

        stores.forEach((store) => {
          if (store.latitude && store.longitude) {
            const dist = calculateDistanceKm(lat, lng, store.latitude, store.longitude);
            if (dist < minDistance) {
              minDistance = dist;
              nearestId = store.id;
            }
          }
        });

        setClosestStoreId(nearestId);
        const nearestStoreObj = stores.find((s) => s.id === nearestId);
        if (nearestStoreObj) {
          onSelectStore(nearestStoreObj);
        }
        setGeoLoading(false);
      },
      (err) => {
        setGeoLoading(false);
        setGeoError("Permissão de localização negada. Escolha sua unidade manualmente abaixo.");
      }
    );
  };

  const faqs = [
    {
      q: "Onde fica o mercado Super Yama mais perto de mim?",
      a: "O Super Yama conta com 3 unidades estratégicas em São Paulo: Unidade Taquandava (Av. Taquandava, 9 - Balneário Dom Carlos), Unidade Funcionários Públicos (Av. dos Funcionários Públicos, 512 - Jd. São Luís) e Unidade Anatoli Liadov (Rua Anatoli Liadov, 46A - Vila Andrade). Clique no botão 'Usar Meu GPS' para localizar a unidade mais próxima em tempo real!",
    },
    {
      q: "Como consultar preços e encarte de ofertas atualizados do supermercado?",
      a: "Você pode buscar qualquer produto na barra de pesquisa superior por nome ou código de barras EAN, ver o preço de prateleira e o valor exclusivo de desconto do Clube Yama. Acesse também a aba 'Encarte Ofertas' para conferir os destaques do dia do hortifruti, açougue e mercearia.",
    },
    {
      q: "Quais os horários de funcionamento do supermercado Super Yama?",
      a: "As unidades do Super Yama funcionam de segunda a sábado das 07:00 às 22:00 (Funcionários Públicos até 21:30) e aos domingos das 07:00 às 20:00. O status da loja e o horário de fechamento são atualizados ao vivo no topo da página.",
    },
    {
      q: "Como funciona a garantia de preço baixo e o comparativo rápido?",
      a: "No seu carrinho de compras, o sistema identifica automaticamente marcas concorrentes disponíveis do mesmo segmento com valores menores para que você possa substituir e economizar ainda mais na sua compra final.",
    },
  ];

  return (
    <footer className="mt-16 bg-white border-t border-slate-200 text-slate-800 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Local SEO Hero Card - Geo Distance Trigger */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-amber-300 border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              SEO Local • Localizador Inteligente
            </div>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
              Procurando um <span className="text-amber-300">Mercado Perto de Mim</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              Encontre a loja do Super Yama mais próxima, verifique o horário de funcionamento ao vivo, consulte os preços de prateleira em tempo real e aproveite as ofertas exclusivas do Clube Yama.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto z-10">
            <button
              onClick={handleGetLocation}
              disabled={geoLoading}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-6 py-4 rounded-2xl flex items-center justify-center gap-2.5 transition shadow-lg shadow-amber-900/30 whitespace-nowrap active:scale-95 disabled:opacity-60"
            >
              <LocateFixed className="w-5 h-5 text-slate-950 animate-pulse" />
              {geoLoading ? "Localizando via GPS..." : "Usar Meu GPS (Mercado Perto de Mim)"}
            </button>
          </div>
        </div>

        {geoError && (
          <div className="bg-amber-50 text-amber-900 border border-amber-200 p-4 rounded-2xl text-xs text-center font-bold">
            {geoError}
          </div>
        )}

        {/* Store Directory Cards (SEO Rich Listings) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-red-600" />
                Unidades Super Yama em São Paulo - SP
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Endereço, telefone e status em tempo real das nossas lojas físicas
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              3 Unidades Ativas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stores.map((store) => {
              const isSelected = store.id === selectedStore.id;
              const isClosest = store.id === closestStoreId;

              // Calculate live distance if GPS coords are available
              let liveDistanceStr = store.distance;
              if (userCoords && store.latitude && store.longitude) {
                const km = calculateDistanceKm(userCoords.lat, userCoords.lng, store.latitude, store.longitude);
                liveDistanceStr = `${km.toFixed(1).replace(".", ",")} km do seu GPS`;
              }

              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${store.name} ${store.address} ${store.neighborhood}`
              )}`;

              return (
                <div
                  key={store.id}
                  className={`bg-white border rounded-3xl p-5 shadow-sm space-y-4 relative transition flex flex-col justify-between ${
                    isSelected
                      ? "border-red-500 ring-2 ring-red-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  itemScope
                  itemType="https://schema.org/GroceryStore"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded">
                          Supermercado Bairro
                        </span>
                        <h4 className="font-bold text-base text-slate-900 mt-1" itemProp="name">
                          {store.name}
                        </h4>
                      </div>
                      {isClosest && (
                        <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 animate-bounce">
                          Mais Perto
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                      <div className="flex items-start gap-1.5" itemProp="address">
                        <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-slate-800 font-bold">{store.address}</div>
                          <div className="text-slate-500">{store.neighborhood}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>
                          Status: <strong className="text-emerald-700">{store.status}</strong> até {store.closingTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                        <a href={`tel:${store.phone.replace(/\D/g, "")}`} className="hover:underline font-mono text-slate-700" itemProp="telephone">
                          {store.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-blue-700">
                          Distância estimada: {liveDistanceStr}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectStore(store)}
                        className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                          isSelected
                            ? "bg-red-600 text-white shadow-xs"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                        }`}
                      >
                        {isSelected ? <CheckCircle2 className="w-4 h-4" /> : null}
                        {isSelected ? "Unidade Selecionada" : "Selecionar Loja"}
                      </button>

                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-xl flex items-center justify-center transition border border-slate-200"
                        title="Abrir no Google Maps"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Local SEO Categories Keyword Badges */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 uppercase tracking-wider">
            <BadgePercent className="w-4 h-4 text-red-600" />
            Principais Buscas e Seções de Mercado Perto de Mim
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              "Mercado Perto de Mim São Paulo",
              "Supermercado Perto de Mim Aberto Agora",
              "Açougue e Ofertas de Carne Perto de Mim",
              "Feira Hortifruti Frutas e Verduras",
              "Padaria e Pão Francês Quentinho",
              "Laticínios Queijo e Leite com Desconto",
              "Mercearia Arroz Feijão Óleo Café",
              "Cerveja e Bebidas Geladas",
              "Produtos de Limpeza e Lavanderia",
              "Consulta de Preço por Código de Barras",
              "Encarte Super Yama de Hoje",
              "Clube Yama de Vantagens",
            ].map((term, idx) => (
              <span
                key={idx}
                className="bg-white border border-slate-200 text-slate-700 hover:border-red-300 font-medium px-3 py-1.5 rounded-xl transition cursor-default shadow-2xs"
              >
                📍 {term}
              </span>
            ))}
          </div>
        </div>

        {/* SEO FAQ Accordion - Structured Schema Friendly */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-red-600" />
              Perguntas Frequentes - Mercado Perto de Mim & Dúvidas
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Footer Line */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © 2026 <strong>Super Yama Supermercados Ltda.</strong> • Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacidade</span>
            <span>•</span>
            <span>Termos de Uso</span>
            <span>•</span>
            <span>Consulta de Preços em Tempo Real</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
