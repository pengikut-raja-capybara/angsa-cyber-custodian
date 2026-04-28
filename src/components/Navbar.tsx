import { Shield } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-electric-blue" />
            <span className="text-xl font-bold tracking-tighter text-white">
              ANGSA<span className="text-electric-blue">CYBER</span>
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="relative group hover:text-electric-blue transition-colors text-sm uppercase tracking-widest py-2">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#catalog" className="relative group hover:text-electric-blue transition-colors text-sm uppercase tracking-widest py-2">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="btn-primary py-2 px-4 text-xs ml-4">
                Consult Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
