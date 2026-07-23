import React, { useState, useEffect } from "react";
import { ActiveDeliveryOrder, DeliveryStatusStep, DelivererProfile } from "../types";
import {
  Bike,
  Zap,
  MapPin,
  Clock,
  ShieldCheck,
  PhoneCall,
  CheckCircle2,
  PackageCheck,
  ShoppingBag,
  Navigation,
  RefreshCw,
  AlertCircle,
  KeyRound,
  DollarSign,
  Sparkles,
  ArrowRight,
  Truck,
  PlusCircle,
  Compass,
} from "lucide-react";

interface DeliveryTrackerViewProps {
  orders: ActiveDeliveryOrder[];
  deliverers: DelivererProfile[];
  onNewOrderRequest?: (neighborhood: string, itemsDesc: string) => void;
}

export const DeliveryTrackerView: React.FC<DeliveryTrackerViewProps> = ({
  orders: initialOrders,
  deliverers,
  onNewOrderRequest,
}) => {
  const [orders, setOrders] = useState<ActiveDeliveryOrder[]>(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    initialOrders[0]?.id || ""
  );
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simStepCount, setSimStepCount] = useState<number>(0);

  // Quick errand form
  const [showErrandForm, setShowErrandForm] = useState(false);
  const [errandNeighborhood, setErrandNeighborhood] = useState("Jardim Aracati");
  const [errandStore, setErrandStore] = useState("Super Yama - Unidade Taquandava");
  const [errandItems, setErrandItems] = useState("1x Leite Integral, 1x Açúcar 1kg, 1x Ovos 30u");
  const [errandAddress, setErrandAddress] = useState("Rua das Rosas, 77");

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  // Live GPS simulation timer
  useEffect(() => {
    if (!isSimulating || !currentOrder) return;

    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((ord) => {
          if (ord.id !== currentOrder.id) return ord;

          // Progress status steps or simulate small GPS coordinates movement
          let nextLat = ord.currentLat;
          let nextLng = ord.currentLng;

          if (ord.status === "em_transito_bike") {
            // Move slightly towards target
            const latDiff = (ord.targetLat - ord.currentLat) * 0.15;
            const lngDiff = (ord.targetLng - ord.currentLng) * 0.15;
            nextLat += latDiff;
            nextLng += lngDiff;

            // Reduce estimated minutes
            const newMins = Math.max(1, ord.estimatedMinutes - 1);

            return {
              ...ord,
              currentLat: nextLat,
              currentLng: nextLng,
              estimatedMinutes: newMins,
            };
          }

          return ord;
        })
      );

      setSimStepCount((c) => c + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulating, currentOrder?.id]);

  const handleAdvanceStatus = () => {
    if (!currentOrder) return;
    const steps: DeliveryStatusStep[] = [
      "aguardando_aceite",
      "no_estabelecimento",
      "mercadoria_coletada",
      "em_transito_bike",
      "entregue",
    ];
    const currentIndex = steps.indexOf(currentOrder.status);
    const nextIndex = (currentIndex + 1) % steps.length;
    const nextStatus = steps[nextIndex];

    setOrders((prev) =>
      prev.map((o) =>
        o.id === currentOrder.id ? { ...o, status: nextStatus } : o
      )
    );
  };

  const handleCreateNewErrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errandItems.trim()) return;

    const assignedDeliverer = deliverers[Math.floor(Math.random() * deliverers.length)];

    const newOrd: ActiveDeliveryOrder = {
      id: "ord-" + Math.floor(1000 + Math.random() * 9000),
      orderNumber: "#EXPRESS-" + Math.floor(1000 + Math.random() * 9000),
      storeName: errandStore,
      storeAddress: errandStore.includes("Taquandava")
        ? "Av. Taquandava, 9"
        : "Av. dos Funcionários Públicos, 512",
      customerAddress: `${errandAddress} - ${errandNeighborhood}`,
      customerName: "Cliente Eco-Express",
      neighborhood: errandNeighborhood,
      deliverer: assignedDeliverer,
      itemsCount: 3,
      totalValue: 35.50,
      deliveryFee: 3.90, // Low cost fee
      status: "aguardando_aceite",
      estimatedMinutes: 12,
      currentLat: -23.6800,
      currentLng: -46.7321,
      targetLat: -23.6750,
      targetLng: -46.7290,
      otpCode: String(Math.floor(1000 + Math.random() * 9000)),
      createdAt: "Agora mesmo",
      is24hExpress: true,
    };

    setOrders([newOrd, ...orders]);
    setSelectedOrderId(newOrd.id);
    setShowErrandForm(false);
    setErrandItems("");
  };

  const getStepStatusDetails = (status: DeliveryStatusStep) => {
    switch (status) {
      case "aguardando_aceite":
        return {
          title: "Buscando Entregador E-Bike 24h",
          desc: "Localizando o entregador de bicicleta elétrica mais próximo no radar da sua região.",
          color: "text-amber-500 bg-amber-50 border-amber-200",
          stepNumber: 1,
        };
      case "no_estabelecimento":
        return {
          title: "Atendente na Loja / Mercado",
          desc: "O entregador/atendente já está no estabelecimento selecionando produtos e verificando a qualidade.",
          color: "text-blue-600 bg-blue-50 border-blue-200",
          stepNumber: 2,
        };
      case "mercadoria_coletada":
        return {
          title: "Mercadoria Coletada & Embalada",
          desc: "As compras foram conferidas, lacradas e acomodadas com segurança no baú da bike.",
          color: "text-purple-600 bg-purple-50 border-purple-200",
          stepNumber: 3,
        };
      case "em_transito_bike":
        return {
          title: "Em Trânsito na Bicicleta Elétrica",
          desc: "O entregador está pedalando em direção ao seu endereço com rastreio GPS ativo ao vivo.",
          color: "text-emerald-600 bg-emerald-50 border-emerald-200",
          stepNumber: 4,
        };
      case "entregue":
        return {
          title: "Pedido Entregue na Sua Porta!",
          desc: "Entrega concluída com sucesso com zero emissões de carbono e tarifa de baixo custo.",
          color: "text-green-700 bg-green-100 border-green-300",
          stepNumber: 5,
        };
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Bike className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-current" />
              <span>Plataforma de Entregas 24/7 • Frota E-Bike</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white">
              Monitor de Rastreio GPS & Entregas Rápidas
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Atendimento 24 horas por dia com bicicletas elétricas e mecânicas. O entregador/atendente vai até o mercado ou loja, seleciona suas mercadorias e entrega na sua porta com <strong>baixo custo de taxa</strong> e zero poluição.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowErrandForm(!showErrandForm)}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-2xl transition shadow-lg flex items-center gap-2 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Chamar Entregador E-Bike (24h)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Errand Call Modal / Inline Panel */}
      {showErrandForm && (
        <div className="bg-white border-2 border-amber-400 rounded-3xl p-6 shadow-xl space-y-4 animate-fadeIn">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Bike className="w-5 h-5 text-red-600" />
              Solicitar Atendimento & Entrega 24h na Sua Região
            </h3>
            <button
              onClick={() => setShowErrandForm(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Fechar ✕
            </button>
          </div>

          <form onSubmit={handleCreateNewErrand} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Selecione o Estabelecimento / Mercado
              </label>
              <select
                value={errandStore}
                onChange={(e) => setErrandStore(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800"
              >
                <option value="Super Yama - Unidade Taquandava">Super Yama - Unidade Taquandava</option>
                <option value="Super Yama - Unidade Funcionários Públicos">Super Yama - Unidade Funcionários Públicos</option>
                <option value="Super Yama - Unidade Anatoli Liadov">Super Yama - Unidade Anatoli Liadov</option>
                <option value="Farmácia de Bairro Parceira">Farmácia de Bairro Parceira 24h</option>
                <option value="Hortifruti & Feira Local">Hortifruti & Feira Local</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bairro de Destino
              </label>
              <select
                value={errandNeighborhood}
                onChange={(e) => setErrandNeighborhood(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800"
              >
                <option value="Jardim Aracati">Jardim Aracati</option>
                <option value="Vila de São Paulo">Vila de São Paulo</option>
                <option value="Pava">Pava</option>
                <option value="Taquandava">Taquandava</option>
                <option value="Balneário Dom Carlos">Balneário Dom Carlos</option>
                <option value="Jardim São Luís">Jardim São Luís</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Endereço de Entrega
              </label>
              <input
                type="text"
                required
                value={errandAddress}
                onChange={(e) => setErrandAddress(e.target.value)}
                placeholder="Ex: Rua das Palmeiras, 142"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lista de Itens / Observação para o Atendente
              </label>
              <input
                type="text"
                required
                value={errandItems}
                onChange={(e) => setErrandItems(e.target.value)}
                placeholder="Ex: 1x Leite UHT, 1x Açúcar Refinado, 1x Ovos"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium"
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-600">
                Taxa de Entrega em E-Bike: <strong className="text-emerald-700 font-black">R$ 3,90 (Baixo Custo)</strong>
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-6 py-3 rounded-2xl transition shadow-md flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current text-amber-300" />
                <span>Disparar Pedido de Entrega 24h</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Orders Selector & Live Radar Layout */}
      {currentOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Active Deliveries List */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-red-600" />
                Pedidos em Andamento ({orders.length})
              </span>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ● Radar GPS Ativo
              </span>
            </h3>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {orders.map((ord) => {
                const isSelected = ord.id === currentOrder.id;
                const statusDetails = getStepStatusDetails(ord.status);

                return (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrderId(ord.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.01]"
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-mono font-black text-xs text-amber-400">
                          {ord.orderNumber}
                        </span>
                        <h4 className="font-bold text-sm truncate max-w-[180px]">
                          {ord.storeName}
                        </h4>
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                          isSelected ? "bg-slate-800 text-amber-300 border-slate-700" : statusDetails.color
                        }`}
                      >
                        {ord.status === "em_transito_bike"
                          ? "🚲 Na E-Bike"
                          : ord.status === "no_estabelecimento"
                          ? "🛒 No Mercado"
                          : "⏱️ Em Separação"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs opacity-90 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">{ord.customerAddress}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/20 text-[11px]">
                      <span className="flex items-center gap-1 font-bold">
                        <Clock className="w-3 h-3 text-amber-400" />
                        Chega em ~{ord.estimatedMinutes} min
                      </span>
                      <span className="font-extrabold text-emerald-400">
                        Taxa: R$ {ord.deliveryFee.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (2 Spans): Active Delivery GPS Live Monitor & Stepper */}
          <div className="lg:col-span-2 space-y-6">
            {/* GPS Live Map Simulator Component */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <h3 className="font-black text-lg text-white">
                      Rastreamento GPS ao Vivo • {currentOrder.orderNumber}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Origem: <strong>{currentOrder.storeName}</strong> ➔ Destino: <strong>{currentOrder.neighborhood}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAdvanceStatus}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                    title="Simular evolução do pedido"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Avançar Etapa</span>
                  </button>
                </div>
              </div>

              {/* Simulated Interactive Radar Area */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl h-64 relative overflow-hidden flex items-center justify-center p-4">
                {/* Background Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#38bdf8 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Radar Sweep Animation Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent pointer-events-none animate-pulse" />

                {/* Simulated Street Route Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 50 180 Q 200 80, 450 120"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                    className="animate-pulse"
                  />
                </svg>

                {/* Point A: Store / Market Pin */}
                <div className="absolute left-8 top-36 flex flex-col items-center group">
                  <div className="w-10 h-10 bg-red-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-red-900/50 border-2 border-white">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black bg-slate-950 px-2 py-0.5 rounded text-slate-300 mt-1 border border-slate-800">
                    Mercado Yama
                  </span>
                </div>

                {/* Moving Courier Bike Pin */}
                <div
                  className="absolute transition-all duration-1000 flex flex-col items-center z-20"
                  style={{
                    left: currentOrder.status === "em_transito_bike" ? "52%" : currentOrder.status === "entregue" ? "82%" : "18%",
                    top: currentOrder.status === "em_transito_bike" ? "38%" : currentOrder.status === "entregue" ? "32%" : "48%",
                  }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center font-black shadow-xl border-2 border-white animate-bounce">
                      <Bike className="w-6 h-6" />
                    </div>
                    {currentOrder.deliverer?.bikeType === "ebike" && (
                      <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full font-black text-[9px]">
                        <Zap className="w-3 h-3 fill-current" />
                      </span>
                    )}
                  </div>

                  <div className="bg-slate-950/90 backdrop-blur-md border border-amber-400/50 px-2.5 py-1 rounded-lg text-center mt-1 shadow-lg">
                    <p className="text-[10px] font-black text-amber-300">
                      {currentOrder.deliverer?.name || "Entregador E-Bike"}
                    </p>
                    <p className="text-[9px] text-slate-300 font-mono">
                      {currentOrder.deliverer?.bikeModel}
                    </p>
                  </div>
                </div>

                {/* Point B: Customer Destination Pin */}
                <div className="absolute right-8 top-24 flex flex-col items-center">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-emerald-900/50 border-2 border-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black bg-slate-950 px-2 py-0.5 rounded text-slate-300 mt-1 border border-slate-800">
                    {currentOrder.neighborhood}
                  </span>
                </div>

                {/* Live Distance Info Overlay */}
                <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs flex items-center gap-3">
                  <span className="text-slate-400 font-mono">
                    Atendimento 24h • E-Bike
                  </span>
                  <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> GPS Online
                  </span>
                </div>
              </div>

              {/* Delivery LifeCycle Timeline Stepper */}
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
                <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                  Etapas do Atendimento & Coleta da Mercadoria
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center">
                  {[
                    { id: "aguardando_aceite", label: "1. Aceite 24h", icon: Clock },
                    { id: "no_estabelecimento", label: "2. No Mercado", icon: ShoppingBag },
                    { id: "mercadoria_coletada", label: "3. Coletado", icon: PackageCheck },
                    { id: "em_transito_bike", label: "4. Na E-Bike", icon: Bike },
                    { id: "entregue", label: "5. Entregue", icon: CheckCircle2 },
                  ].map((st, idx) => {
                    const steps: DeliveryStatusStep[] = [
                      "aguardando_aceite",
                      "no_estabelecimento",
                      "mercadoria_coletada",
                      "em_transito_bike",
                      "entregue",
                    ];
                    const currentIdx = steps.indexOf(currentOrder.status);
                    const isDone = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;
                    const IconComp = st.icon;

                    return (
                      <div
                        key={st.id}
                        className={`p-2.5 rounded-xl border transition text-xs font-bold flex flex-col items-center gap-1.5 ${
                          isCurrent
                            ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-105"
                            : isDone
                            ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                            : "bg-slate-900 text-slate-500 border-slate-800"
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span className="text-[11px] leading-tight">{st.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Courier & Security Code Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Courier Profile Card */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  Entregador Responsável
                </h4>

                {currentOrder.deliverer ? (
                  <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                    <img
                      src={currentOrder.deliverer.avatarUrl}
                      alt={currentOrder.deliverer.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-red-600 shadow-sm shrink-0"
                    />
                    <div>
                      <h5 className="font-extrabold text-slate-900 text-base">
                        {currentOrder.deliverer.name}
                      </h5>
                      <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                        <span className="font-bold text-amber-600">
                          ★ {currentOrder.deliverer.rating}
                        </span>
                        <span>•</span>
                        <span className="font-medium">
                          {currentOrder.deliverer.totalDeliveries} entregas
                        </span>
                      </div>

                      <div className="mt-1.5 inline-flex items-center gap-1 bg-slate-900 text-amber-300 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">
                        {currentOrder.deliverer.bikeType === "ebike" ? (
                          <>
                            <Zap className="w-3 h-3 text-emerald-400 fill-current" />
                            <span>Bicicleta Elétrica Eco</span>
                          </>
                        ) : (
                          <>
                            <Bike className="w-3 h-3 text-amber-400" />
                            <span>Bicicleta Mecânica</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Buscando entregador disponível...
                  </p>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`tel:${currentOrder.deliverer?.phone || "11987654321"}`}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ligar para Entregador</span>
                  </a>
                </div>
              </div>

              {/* Order Security Code & Low Cost Delivery Info */}
              <div className="space-y-3 bg-amber-50/60 border border-amber-200 p-4 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Código de Confirmação (OTP)
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
                      Informe ao receber
                    </span>
                  </div>

                  <div className="bg-white border-2 border-amber-300 rounded-xl p-3 text-center">
                    <span className="font-mono text-3xl font-black tracking-widest text-slate-900">
                      {currentOrder.otpCode}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">
                    Taxa Eco-Bike (Baixo Custo):
                  </span>
                  <span className="font-black text-emerald-700 text-sm">
                    R$ {currentOrder.deliveryFee.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
          <Bike className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-bold">Nenhum pedido de entrega ativo no momento.</p>
        </div>
      )}
    </div>
  );
};
