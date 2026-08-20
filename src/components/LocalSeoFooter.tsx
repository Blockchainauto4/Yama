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
      q: "O que é o Yammá / Super Yama Supermercados?",
      a: "O Yammá (frequentemente buscado como Super Yama Supermercado ou Mercado Yama) é a principal rede e sistema inteligente de cotações em tempo real da Zona Sul de São Paulo, conectando unidades em Cidade Ipava, Chácara Santa Maria, Taquandava e regiões vizinhas com os menores preços garantidos.",
    },
    {
      q: "O Yama Supermercado faz entrega perto de mim (Mercado Delivery)?",
      a: "Sim! Através da nossa frota própria de E-Bikes ecológicas e integração direta com WhatsApp, realizamos entregas rápidas para Cidade Ipava, Chácara Santa Maria, Taquandava, Jardim Aracati, Vila de São Paulo, Jardim São Luís e M'Boi Mirim.",
    },
    {
      q: "Como comparar os preços do Yama com Supermercado Gideão, Super City e Polvo?",
      a: "No Yammá você pode pesquisar qualquer produto ou escanear o código de barras (EAN). Nosso algoritmo compara instantaneamente os valores praticados por outros estabelecimentos da região (como Supermercado Gideão na Chácara Santa Maria, Super City em Cotia / SP II, Supermercado Polvo, Supermercado Avenida e Super Be), garantindo economia real no seu bolso.",
    },
    {
      q: "Existe opção de Adega e Mercado 24h perto de mim?",
      a: "Sim, nossa seção de adega e conveniência disponibiliza cervejas trincando de geladas, vinhos, destilados, carvão para churrasco e petiscos com atendimento ágil para a sua comodidade.",
    },
    {
      q: "Como funciona o desconto de 50% de desconto na primeira compra?",
      a: "Basta clicar no banner de Vagas CLT no topo do site e acessar nosso grupo oficial no WhatsApp para desbloquear automaticamente 50% de desconto adicional na sua cesta de compras e visualizar todos os preços.",
    },
    {
      q: "Consigo comparar preços de hortifruti fresco, açougue e padaria?",
      a: "Com certeza! Monitoramos diariamente cortes de carne bovina no açougue, pão francês quentinho assado na hora na padaria e hortifruti fresco selecionado para você.",
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
              O Melhor Preço <span className="text-amber-300">Você Encontra Aqui!</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              Compare preços entre todos os supermercados da Zona Sul de São Paulo, encontre as melhores ofertas e economize em suas compras online.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto z-10">
            <button
              onClick={handleGetLocation}
              disabled={geoLoading}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-6 py-4 rounded-2xl flex items-center justify-center gap-2.5 transition shadow-lg shadow-amber-900/30 whitespace-nowrap active:scale-95 disabled:opacity-60"
            >
              <LocateFixed className="w-5 h-5 text-slate-950 animate-pulse" />
              {geoLoading ? "Localizando via GPS..." : "Usar Meu GPS (Supermercados Próximos)"}
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
                Supermercados na Zona Sul de SP
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Endereço, telefone e status em tempo real das nossas lojas físicas
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Supermercados Parceiros
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

        {/* Local SEO Categories Keyword Badges & Search Console Hub */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <BadgePercent className="w-5 h-5 text-red-600" />
                Buscas Frequentes & SEO Local: "Mercado Perto de Mim"
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium max-w-3xl">
                Cotações em tempo real no <strong>Yammá (Super Yama Supermercado)</strong>. Compare ofertas com mercados da região e peça delivery rápido para <strong>Cidade Ipava, Chácara Santa Maria, Taquandava, Jardim Aracati, Cotia e toda Zona Sul SP</strong>.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-3 py-1.5 rounded-xl shrink-0 self-start md:self-auto border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Preços Monitorados Hoje
            </div>
          </div>

          {/* Special Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            {/* Mercado que faz entrega perto de mim */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-emerald-700">
                🛵 Mercado Delivery Perto de Mim
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Mercado que faz entrega rápida no seu endereço via WhatsApp e frota E-Bike sustentável com taxa reduzida.
              </p>
              <div className="text-[10px] text-emerald-800 font-extrabold bg-emerald-50 px-2 py-1 rounded-lg">
                📍 Cidade Ipava • Chácara Sta Maria • Taquandava
              </div>
            </div>

            {/* Adega 24 Horas & Disque Bebida Perto de Mim */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-purple-700">
                🍷 Adega 24h & Disque Bebida
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Adega aberta 24h perto de mim com disque cerveja gelada, disque vinho, whiskies, destilados e energéticos entregues em minutos.
              </p>
              <div className="text-[10px] text-purple-800 font-extrabold bg-purple-50 px-2 py-1 rounded-lg">
                📍 Tele-Bebida & Delivery Express 24h
              </div>
            </div>

            {/* Padaria Perto de Mim */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-amber-700">
                🥐 Padaria Perto de Mim
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Pão francês crocante assado de hora em hora, broas de milho, bolo caseiro de fubá, rosquinhas e salgados fofinhos.
              </p>
              <div className="text-[10px] text-amber-800 font-extrabold bg-amber-50 px-2 py-1 rounded-lg">
                📍 Assado na Hora • Unidades 1, 2 e 3
              </div>
            </div>

            {/* Açougue e Churrasco */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-red-700">
                🥩 Açougue & Churrasco
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Picanha bovina resfriada, alcatra, fraldinha, linguiça toscana, espetinhos e carvão vegetal 3kg sem fumaça.
              </p>
              <div className="text-[10px] text-red-800 font-extrabold bg-red-50 px-2 py-1 rounded-lg">
                📍 Cortes Nobres • Sexta do Churrasco
              </div>
            </div>

            {/* Loja de Produtos de Limpeza Perto de Mim */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-blue-700">
                🧹 Produtos de Limpeza
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Sabão em pó Omo e Brilhante, amaciantes concentrados Downy e Ypê, desinfetantes e papel higiênico no menor preço.
              </p>
              <div className="text-[10px] text-blue-800 font-extrabold bg-blue-50 px-2 py-1 rounded-lg">
                📍 Corredor 6 • Ofertas do Clube
              </div>
            </div>
          </div>

          {/* Comparativo Regional de Mercados */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Mercados e Redes Monitorados na Região da Zona Sul & Cotia:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              {[
                { name: "Yammá / Super Yama", loc: "Cidade Ipava & Taquandava", tag: "Cotações Ao Vivo" },
                { name: "Supermercado Gideão", loc: "Chácara Santa Maria", tag: "Comparado" },
                { name: "Super City SP II / Cotia", loc: "Cotia & Zona Sul", tag: "Comparado" },
                { name: "Supermercado Polvo", loc: "Zona Sul SP", tag: "Comparado" },
                { name: "Supermercado Avenida", loc: "Vila de São Paulo", tag: "Comparado" },
                { name: "Super Be Supermercado", loc: "Jardim São Luís", tag: "Comparado" },
              ].map((m, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center flex flex-col justify-between">
                  <div className="font-bold text-slate-900 text-[11px]">{m.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{m.loc}</div>
                  <span className="mt-1.5 text-[9px] font-extrabold text-blue-700 bg-blue-50 rounded px-1.5 py-0.5 self-center">
                    {m.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords Cloud (Direct Search Console Matching) */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
              Principais Termos Pesquisados no Google:
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                "yama supermercado",
                "super yama supermercado",
                "super yama",
                "supermercado yama cidade ipava",
                "supermercado yama",
                "mercado yama ipava",
                "supermercado gideão chácara santa maria",
                "mercado gideão chacara santa maria",
                "gideao supermercado",
                "mercado super city cotia",
                "supermercado super city sp ii",
                "supermercado polvo",
                "supermercado avenida",
                "super be",
                "mercado que faz entrega perto de mim",
                "mercado delivery",
                "mercado 24h perto de mim",
                "mercado perto de mim",
                "supermercado perto de mim",
                "yammá supermercado",
                "cotação de preços supermercado",
                "consulta de preço código de barras",
                "adega perto de mim 24 horas",
                "padaria perto de mim pão quente",
                "açougue carne churrasco zona sul",
                "mercado delivery whatsapp",
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
        </div>

        {/* SEO FAQ Accordion - Structured Schema Friendly */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-red-600" />
              Perguntas Frequentes - Yammá Cotação de Preços
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
            © {new Date().getFullYear()} <strong>Yammá.</strong> • O melhor preço você encontra aqui! • Todos os direitos reservados.
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
