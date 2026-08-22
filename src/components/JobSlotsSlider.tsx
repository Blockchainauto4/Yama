import React, { useRef, useState } from "react";
import { JobVacancy } from "../types";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MapPin,
  Clock,
  Briefcase,
  Copy,
  Check,
  Navigation,
  ExternalLink,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface JobSlotsSliderProps {
  vacancies: JobVacancy[];
  onOpenRadar?: () => void;
  onOpenGroup?: () => void;
}

export const JobSlotsSlider: React.FC<JobSlotsSliderProps> = ({
  vacancies,
  onOpenRadar,
  onOpenGroup,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 340;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleCopyJob = (job: JobVacancy, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy =
      job.rawWhatsAppText ||
      `🚨 *${job.title}*\n${job.urgencyLevel}\n\n📍 ${job.address}\n*${job.landmark}*\n\n💵 ${job.pay}\n⏰ ${job.workingHours}\n\n👤 Contato: ${job.contactName} (${job.contactRole})\n📱 WhatsApp: ${job.contactPhone}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleWhatsAppCandidate = (job: JobVacancy, e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = job.contactPhone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
    const text = encodeURIComponent(
      `Olá ${job.contactName}! Vi a vaga de *${job.title}* (${job.landmark || job.region}) no Radar Yammá e quero me candidatar agora.`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, "_blank");
  };

  return (
    <section className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 space-y-4">
      {/* Small Clean Title Header & Navigation Controls */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-red-200/70">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
              Radar ao Vivo
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              • {vacancies.length} slots abertos hoje
            </span>
          </div>
          
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
            Vagas e Diárias Disponíveis na Região
          </h3>
        </div>

        {/* Action Controls and Arrows */}
        <div className="flex items-center gap-2">
          {onOpenRadar && (
            <button
              onClick={onOpenRadar}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200/80 transition hidden sm:inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Radar Completo</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}

          <div className="flex items-center gap-1 pl-1">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                canScrollLeft
                  ? "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 shadow-xs"
                  : "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50"
              }`}
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                canScrollRight
                  ? "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 shadow-xs"
                  : "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50"
              }`}
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Slides of Available Slots */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        className="flex items-stretch gap-3.5 overflow-x-auto scroll-smooth pb-2 pt-1 scrollbar-none snap-x snap-mandatory"
      >
        {vacancies.map((job) => {
          const isUrgent = job.category === "urgente_agora" || job.urgencyLevel.includes("AGORA");
          return (
            <div
              key={job.id}
              className={`snap-start shrink-0 w-[290px] sm:w-[320px] rounded-2xl border transition-all duration-200 bg-slate-50/70 hover:bg-white hover:shadow-md flex flex-col justify-between p-4 relative overflow-hidden group ${
                isUrgent
                  ? "border-red-200 hover:border-red-300"
                  : "border-slate-200/80 hover:border-emerald-300"
              }`}
            >
              {/* Slide Header: Slot & Urgency Badge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5 text-[10px]">
                  <span
                    className={`font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      isUrgent
                        ? "bg-red-600 text-white shadow-xs"
                        : "bg-emerald-600 text-white"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    {job.quantity}
                  </span>
                  <span className="text-slate-400 font-semibold">{job.postedAt}</span>
                </div>

                {/* Job Title & Pay */}
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight group-hover:text-emerald-700 transition">
                    {job.title}
                  </h4>
                  <div className="text-xs font-black text-emerald-700 mt-1 bg-emerald-100/60 text-emerald-900 px-2 py-0.5 rounded-md inline-block">
                    💵 {job.pay}
                  </div>
                </div>

                {/* Location & Time Info */}
                <div className="space-y-1 text-[11px] text-slate-600 pt-1">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800 line-clamp-1">
                      {job.landmark || job.region}
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1 font-medium">{job.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Recruiter and WhatsApp Apply Footer */}
              <div className="mt-3.5 pt-3 border-t border-slate-200/70 flex items-center gap-2">
                <button
                  onClick={(e) => handleWhatsAppCandidate(job, e)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Candidatar</span>
                </button>

                <button
                  onClick={(e) => handleCopyJob(job, e)}
                  className="p-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-[11px] font-bold transition cursor-pointer"
                  title="Copiar dados da vaga"
                >
                  {copiedId === job.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        job.address
                      )}`,
                      "_blank"
                    )
                  }
                  className="p-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-[11px] font-bold transition cursor-pointer"
                  title="Abrir no Google Maps"
                >
                  <Navigation className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Small Clean Footer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Vagas verificadas • Contato direto com o RH</span>
        </div>

        {onOpenGroup && (
          <button
            onClick={onOpenGroup}
            className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline transition flex items-center gap-1 cursor-pointer"
          >
            <span>Entrar no Grupo Oficial de Vagas WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </section>
  );
};
