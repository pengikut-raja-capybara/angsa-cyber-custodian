import { Mail, ArrowRight, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="pt-24 pb-12 border-t border-white/5 bg-dark-bg">
      <div className="container mx-auto px-4 text-center reveal-on-scroll">
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Siap Membangun <span className="cyber-gradient-text">Infrastruktur</span> Masa Depan?
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            Konsultasikan kebutuhan IT Anda sekarang. Mari diskusikan bagaimana solusi kami dapat membantu bisnis Anda menjadi lebih efisien dan aman.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="https://wa.me/your-number" className="btn-primary flex items-center justify-center gap-2 group">
              Konsultasi Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:contact@angsacyber.com" className="px-8 py-3 glass-panel border border-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Kami
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-electric-blue/50" />
            <span className="font-bold tracking-tighter text-white/80">
              ANGSA<span className="text-electric-blue/80">CYBER</span>
            </span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          
          <p>© {new Date().getFullYear()} Angsa Cyber Custodian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
