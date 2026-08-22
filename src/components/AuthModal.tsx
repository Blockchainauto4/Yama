import React, { useState, useEffect } from "react";
import { UserProfile, JobVacancy } from "../types";
import {
  X,
  Briefcase,
  ExternalLink,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  DollarSign,
  Building2,
  Bike,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  onOpenRadar?: () => void;
  vacancies?: JobVacancy[];
}

interface PopupSlide {
  id: string;
  badge: string;
  badgeType: "urgent" | "slots" | "benefits" | "whatsapp";
  title: string;
  subtitle: string;
  pay: string;
  location: string;
  time: string;
  detail: string;
  icon: "urgent" | "store" | "cash" | "bike" | "whatsapp";
}

const DEFAULT_POPUP_SLIDES: PopupSlide[] = [
  {
    id: "slide-cumim",
    badge: "🚨 VAGA PARA AGORA • 1 SLOT",
    badgeType: "urgent",
    title: "Cumim Masculino (Restaurante/Bar)",
    subtitle: "Chegada imediata • Água Rasa / Estação Belém",
    pay: "R$ 200,00 (Diária • Pagto Quinta)",
    location: "R. Sapucaia, 572 - Água Rasa / Metrô Belém",
    time: "Pra agora até as 23:00 (Refeição inclusa)",
    detail: "Seleção direta com Produtor de Staff Paulo Gontijo",
    icon: "urgent",
  },
  {
    id: "slide-repositor",
    badge: "💼 3 SLOTS ABERTOS • CLT",
    badgeType: "slots",
    title: "Repositor de Mercadorias",
    subtitle: "Supermercado Yammá • Início Esta Semana",
    pay: "R$ 1.890,00 + VR + VT + Cesta Básica",
    location: "Zona Sul / Cidade Ipava & Chácara Santa Maria",
    time: "Escala 6x1 • Turno Tarde/Noite (14h às 22h20)",
    detail: "Contrato com carteira assinada e plano de carreira",
    icon: "store",
  },
  {
    id: "slide-caixa",
    badge: "⚡ 2 SLOTS DISPONÍVEIS • CLT",
    badgeType: "slots",
    title: "Operador(a) de Caixa Registradora",
    subtitle: "Atendimento ao cliente e recebimento",
    pay: "R$ 1.950,00 + Quebra de Caixa + Benefícios",
    location: "Zona Sul / Estrada do M'Boi Mirim",
    time: "Escala 6x1 • Turno Manhã (07h00 às 15h20)",
    detail: "Treinamento remunerado e vale refeição",
    icon: "cash",
  },
  {
    id: "slide-entregador",
    badge: "🚲 SLOTS LIVRES • FROTA 24H",
    badgeType: "slots",
    title: "Entregador(a) E-Bike & Bike",
    subtitle: "Entregas rápidas de mercado na sua região",
    pay: "Diárias de R$ 140 a R$ 220 + Gorjetas",
    location: "Raio de até 4km • Escolha seu bairro",
    time: "Horários flexíveis (Diurno / Noturno / 24h)",
    detail: "Sem taxa de adesão • Pagamento semanal via PIX",
    icon: "bike",
  },
  {
    id: "slide-grupo-vip",
    badge: "🟢 GRUPO OFICIAL WHATSAPP",
    badgeType: "whatsapp",
    title: "Central de Vagas & Diárias ao Vivo",
    subtitle: "Novas oportunidades divulgadas todos os dias",
    pay: "Acesso 100% Gratuito",
    location: "São Paulo e Grande SP",
    time: "Alertas em tempo real direto no seu celular",
    detail: "Vagas conferidas com RHs e produtores reais",
    icon: "whatsapp",
  },
];

const SLIDE_DURATION_MS = 5000; // 5 seconds per slide

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onOpenRadar,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [isAutoRedirectEnabled, setIsAutoRedirectEnabled] = useState(true);

  const whatsappGroupUrl = "https://chat.whatsapp.com/DM2033oaWsQFUt19YScQBA?s=sh&p=a&ilr=4";
  const slides = DEFAULT_POPUP_SLIDES;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handleJoinGroup = () => {
    window.open(whatsappGroupUrl, "_blank");
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: "Candidato Vagas CLT",
      email: "vagas.clt@yamma.com.br",
      welcomeDiscountActive: true,
      discountPercent: 50,
    };
    onLogin(newUser);
    onClose();
  };

  // Auto-redirect timer countdown (5 seconds)
  useEffect(() => {
    if (!isOpen || !isAutoRedirectEnabled || isPaused) return;

    if (redirectCountdown <= 0) {
      handleJoinGroup();
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, redirectCountdown, isAutoRedirectEnabled, isPaused]);

  // Reset countdown when modal opens
  useEffect(() => {
    if (isOpen) {
      setRedirectCountdown(5);
      setIsAutoRedirectEnabled(true);
    }
  }, [isOpen]);

  // Auto-advance timer with smooth progress bar (5 seconds per slide)
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const intervalStep = 50; // update progress every 50ms
    const totalSteps = SLIDE_DURATION_MS / intervalStep;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
          return 0;
        }
        return prev + 100 / totalSteps;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, slides.length, currentSlideIndex]);

  // Reset progress on manual slide change
  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  if (!isOpen) return null;

  const renderIcon = (type: PopupSlide["icon"]) => {
    switch (type) {
      case "urgent":
        return <span className="text-2xl">🚨</span>;
      case "store":
        return <Building2 className="w-6 h-6 text-emerald-600" />;
      case "cash":
        return <DollarSign className="w-6 h-6 text-amber-600" />;
      case "bike":
        return <Bike className="w-6 h-6 text-blue-600" />;
      case "whatsapp":
        return <MessageCircle className="w-6 h-6 text-emerald-600 fill-current" />;
      default:
        return <Briefcase className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden relative animate-scaleUp flex flex-col"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Top Story/Slides Progress Bars (5 seconds per slide) */}
        <div className="bg-slate-950 px-4 pt-3 pb-2 flex items-center gap-1.5 z-20">
          {slides.map((slide, idx) => {
            const isCurrent = idx === currentSlideIndex;
            const isCompleted = idx < currentSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden relative cursor-pointer group"
                title={`Ir para slide ${idx + 1}`}
                aria-label={`Slide ${idx + 1}`}
              >
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-green-400 transition-all"
                  style={{
                    width: isCompleted
                      ? "100%"
                      : isCurrent
                      ? `${progress}%`
                      : "0%",
                    transitionDuration: isCurrent ? "50ms" : "0ms",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Small Elegant Header Title */}
        <div className="bg-slate-950 text-white px-5 py-3.5 relative flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Radar de Oportunidades • 5s
              </span>
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                Slots & Vagas Disponíveis na Sua Região
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition cursor-pointer"
            title="Fechar"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Slide Card (Current Slot Display) */}
        <div className="p-4 sm:p-5 flex-1 space-y-3.5 bg-gradient-to-b from-slate-50 to-white">
          {/* Automatic Redirection Indicator Banner (5s timer) */}
          {isAutoRedirectEnabled ? (
            <div className="bg-emerald-950 text-white rounded-2xl p-3 border border-emerald-500/50 shadow-md flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center font-black text-xs text-emerald-200 shrink-0 border border-emerald-400">
                  <span>{redirectCountdown}s</span>
                  <div className="absolute inset-0 rounded-full border border-emerald-300 animate-ping opacity-30" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Redirecionamento Automático</span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate">
                    Entrando no grupo WhatsApp em <strong className="text-white font-black">{redirectCountdown}s</strong>...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setIsAutoRedirectEnabled(false)}
                  className="text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-xl border border-slate-700 transition cursor-pointer"
                  title="Cancelar redirecionamento automático"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleJoinGroup}
                  className="text-[11px] font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-2.5 py-1.5 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <span>Ir Agora</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 rounded-xl px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-600 border border-slate-200">
              <span>⏸️ Redirecionamento automático pausado</span>
              <button
                onClick={() => {
                  setRedirectCountdown(5);
                  setIsAutoRedirectEnabled(true);
                }}
                className="text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Reativar (5s)
              </button>
            </div>
          )}

          {/* Slide Header: Badge & Counter */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-xs ${
                currentSlide.badgeType === "urgent"
                  ? "bg-red-600 text-white animate-pulse"
                  : currentSlide.badgeType === "whatsapp"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-100 text-emerald-900 border border-emerald-300/80"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
              {currentSlide.badge}
            </span>

            <span className="text-[11px] font-bold text-slate-400">
              {currentSlideIndex + 1} de {slides.length}
            </span>
          </div>

          {/* Featured Slot Content Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm relative overflow-hidden transition-all duration-300">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                {renderIcon(currentSlide.icon)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                  {currentSlide.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {currentSlide.subtitle}
                </p>
                <div className="inline-block bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-black text-xs px-2.5 py-0.5 rounded-md mt-1">
                  💵 {currentSlide.pay}
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span className="font-medium text-slate-800 leading-snug">
                  {currentSlide.location}
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{currentSlide.time}</span>
              </div>
              <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{currentSlide.detail}</span>
              </div>
            </div>
          </div>

          {/* Quick Slide Navigation Arrows */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevSlide}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer border border-slate-200"
                title="Slide anterior"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextSlide}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer border border-slate-200"
                title="Próximo slide"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[11px] text-slate-400 font-medium">
              Troca automática a cada 5 segundos
            </span>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleJoinGroup}
              className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs sm:text-sm py-3.5 rounded-2xl transition shadow-lg shadow-emerald-800/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] border border-emerald-400"
            >
              <MessageCircle className="w-4 h-4 fill-current text-white" />
              <span>👉 RECEBER TODAS AS VAGAS NO WHATSAPP</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </button>

            {onOpenRadar && (
              <button
                onClick={() => {
                  onClose();
                  onOpenRadar();
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Briefcase className="w-3.5 h-3.5 text-red-400" />
                <span>Ver Radar de Vagas Completo (Feed ao Vivo)</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Gratuito • Vagas Verificadas</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 underline transition cursor-pointer font-medium"
          >
            Continuar para o app
          </button>
        </div>
      </div>
    </div>
  );
};
