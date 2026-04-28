import { Terminal, ShieldCheck, Globe } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-lime/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-blue/30 bg-electric-blue/5 text-electric-blue text-xs mb-8 animate-reveal">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
          </span>
          SECURE • STRATEGIC • SCALABLE
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-reveal-delay-1">
          Solusi IT Tepat Guna,
          <br />
          <span className="cyber-gradient-text">Tanpa Jebakan</span> Biaya Langganan.
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed animate-reveal-delay-2">
          Dari bimbingan teknis mahasiswa hingga arsitektur web modern untuk UMKM. Fokus pada efisiensi, teknologi open-source, dan hasil yang reliabel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal-delay-2">
          <a href="#catalog" className="btn-primary w-full sm:w-auto">
            Explore Services
          </a>
          <a href="#about" className="px-8 py-3 border border-white/10 hover:border-white/30 transition-all w-full sm:w-auto uppercase text-sm tracking-widest font-bold">
            Our Philosophy
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left animate-reveal-delay-2">
          <div className="p-6 glass-panel border-l-2 border-l-electric-blue">
            <Globe className="w-6 h-6 text-electric-blue mb-4" />
            <h3 className="text-sm font-bold uppercase mb-2">Modern Web</h3>
            <p className="text-xs text-gray-500">Jamstack & Fullstack solutions with zero maintenance overhead.</p>
          </div>
          <div className="p-6 glass-panel border-l-2 border-l-cyber-lime">
            <ShieldCheck className="w-6 h-6 text-cyber-lime mb-4" />
            <h3 className="text-sm font-bold uppercase mb-2">OpSec/OSINT</h3>
            <p className="text-xs text-gray-500">Agnostic security services protecting your digital footprint.</p>
          </div>
          <div className="p-6 glass-panel border-l-2 border-l-white/20">
            <Terminal className="w-6 h-6 text-white mb-4" />
            <h3 className="text-sm font-bold uppercase mb-2">IT Strategy</h3>
            <p className="text-xs text-gray-500">Objective consulting prioritizing open-source efficiency.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
