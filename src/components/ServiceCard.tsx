import type { ServiceItem } from "../types";
import { Tag, AlertCircle, Info, Search, ShieldCheck, Code2, MessageSquare, GraduationCap, ExternalLink } from "lucide-react";

interface Props {
  service: ServiceItem;
  categoryColor: string;
  isCyber?: boolean;
  onViewDetail: () => void;
}

export const ServiceCard = ({ service, categoryColor, isCyber, onViewDetail }: Props) => {
  const isMahasiswa = service.name.toLowerCase().includes("mahasiswa");

  const getServiceIcon = () => {
    const id = service.id.toLowerCase();

    if (id.includes("osint")) return <Search className="w-5 h-5" />;
    if (id.includes("opsec")) return <ShieldCheck className="w-5 h-5" />;
    if (id.includes("web") || id.includes("jamstack") || id.includes("fullstack")) return <Code2 className="w-5 h-5" />;
    if (id.includes("consulting")) return <MessageSquare className="w-5 h-5" />;
    if (id.includes("training")) return <GraduationCap className="w-5 h-5" />;
    return <Tag className="w-5 h-5" />;
  };

  return (
    <div
      className={`relative flex flex-col h-full glass-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-electric-blue/5 ${isCyber ? "border-t-2 border-dashed" : "border-t-2 border-solid"}`}
      style={{ borderTopColor: categoryColor }}
    >
      {isMahasiswa && (
        <div className="absolute -top-3 left-6 px-2 py-0.5 bg-cyber-lime text-dark-bg text-[9px] font-bold uppercase tracking-widest rounded-sm shadow-lg shadow-cyber-lime/20">Student Special</div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold text-white leading-tight pr-4 whitespace-pre-line">{service.name}</h4>
        </div>
        <div className="bg-white/5 px-2 py-1 rounded text-[10px] font-mono text-gray-400 whitespace-nowrap">ID: {service.id.split("-")[0].toUpperCase()}</div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div style={{ color: categoryColor }}>{getServiceIcon()}</div>
        <span className="text-sm font-bold tracking-tight" style={{ color: categoryColor }}>
          {service.price}
        </span>
      </div>

      <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed">{service.description}</p>

      {service.note && (
        <div className="mb-4 p-3 bg-white/5 rounded text-xs text-gray-500 italic flex gap-3">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>{service.note}</span>
        </div>
      )}

      {service.requirements && (
        <div className="mb-4 p-3 border border-yellow-500/20 bg-yellow-500/5 rounded text-xs text-yellow-200/70 flex gap-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{service.requirements}</span>
        </div>
      )}

      <div className="space-y-3 mt-auto">
        {service.details && (
          <button
            onClick={onViewDetail}
            className="w-full py-2 flex items-center justify-center gap-2 border border-white/5 bg-white/5 hover:bg-white/10 transition-all uppercase text-[9px] tracking-widest font-bold text-gray-300"
          >
            <ExternalLink className="w-3 h-3" />
            View Details
          </button>
        )}
        {/* <button className="w-full py-2 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all uppercase text-[10px] tracking-widest font-bold">
          Select Package
        </button> */}
      </div>
    </div>
  );
};
