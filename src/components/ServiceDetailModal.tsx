import { X, ArrowLeft, Shield, Terminal, Zap } from "lucide-react";
import type { ServiceItem } from "../types";
import { useEffect, useMemo } from "react";
import { toSafeHtml } from "../utils/richContent";

interface Props {
  service: ServiceItem;
  isOpen: boolean;
  onClose: () => void;
  categoryColor: string;
}

export const ServiceDetailModal = ({ service, isOpen, onClose, categoryColor }: Props) => {
  const renderedContent = useMemo(() => toSafeHtml(service.details), [service.details]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-dark-bg/95 backdrop-blur-xl animate-fade-in overflow-hidden">
      {/* Premium Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-electric-blue/10 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[180px] opacity-20" style={{ backgroundColor: categoryColor }} />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/5 bg-dark-bg/40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
            <Shield className="w-3 h-3" style={{ color: categoryColor }} />
            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Secure Node: {service.id.toUpperCase()}</span>
          </div>
        </div>

        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white hover:rotate-90">
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 flex-grow overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto px-6 py-20">
          {/* Service Title Section */}
          <header className="mb-20">
            <div className="flex items-center gap-3 mb-6 animate-reveal">
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: categoryColor }}>
                Service Profile
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter animate-reveal" style={{ animationDelay: "0.1s" }}>
              {service.name}
            </h1>

            <div className="flex flex-wrap items-end gap-10 animate-reveal" style={{ animationDelay: "0.2s" }}>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold">Investment</span>
                <span className="text-3xl font-black font-mono tracking-tighter" style={{ color: categoryColor }}>
                  {service.price}
                </span>
              </div>
              {service.note && (
                <div className="max-w-md pb-1">
                  <p className="text-sm text-gray-400 italic leading-relaxed border-l-2 border-white/10 pl-6">"{service.note}"</p>
                </div>
              )}
            </div>
          </header>

          {/* Prose Content Section */}
          <div className="relative">
            {/* Subtle side decoration */}
            <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent hidden xl:block" />

            <article
              className="prose prose-invert prose-lg max-w-none 
                prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-white
                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/5
                prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-6
                prose-li:text-gray-400 prose-li:mb-2
                prose-strong:text-white prose-strong:font-bold
                prose-code:text-electric-blue prose-code:bg-electric-blue/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm
                prose-blockquote:border-l-4 prose-blockquote:border-white/20 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:italic
                prose-img:rounded-sm prose-img:shadow-2xl"
            >
              <div className="rich-content-renderer animate-reveal" style={{ animationDelay: "0.3s" }} dangerouslySetInnerHTML={{ __html: renderedContent }} />

              {!service.details && (
                <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-sm">
                  <Terminal className="w-12 h-12 mb-4 text-gray-700" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600 text-center">No additional technical documentation found for this node.</p>
                </div>
              )}
            </article>
          </div>

          {/* Requirements Section */}
          {service.requirements && (
            <section className="mt-24 p-10 bg-white/[0.02] border border-white/5 rounded-sm animate-reveal" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-3 mb-6 text-yellow-500/80">
                <Zap className="w-4 h-4 fill-current" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">Service Prerequisites</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">{service.requirements}</p>
            </section>
          )}
        </div>
      </main>

      {/* Sticky Action Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/5 bg-dark-bg/60 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-1 text-left w-full sm:w-auto">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">System Identity</span>
            <p className="text-[10px] font-mono text-gray-500 whitespace-nowrap">ANGSA CYBER CUSTODIAN // V2.0 // NODE_ACTIVE</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
