import { Cpu, Zap, Eye } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-dark-surface/30 reveal-on-scroll">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Filosofi <span className="text-electric-blue">Transparansi</span> & <span className="text-cyber-lime">Kedaulatan Digital</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Angsa Cyber Custodian hadir untuk memastikan infrastruktur digital Anda berjalan efisien. Kami percaya bahwa teknologi seharusnya mempermudah, bukan membebani klien dengan biaya langganan cloud yang tidak perlu.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Kami memprioritaskan penggunaan teknologi <strong>open-source</strong> dan sistem <strong>stand-alone</strong> untuk membantu Anda menghindari jebakan biaya bulanan yang membengkak.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-electric-blue/10 flex items-center justify-center border border-electric-blue/20">
                  <Zap className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Tanpa Biaya Tersembunyi</h4>
                  <p className="text-sm text-gray-500">Model bisnis transparan dengan estimasi biaya yang presisi sejak awal.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyber-lime/10 flex items-center justify-center border border-cyber-lime/20">
                  <Cpu className="w-6 h-6 text-cyber-lime" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Kedaulatan Data</h4>
                  <p className="text-sm text-gray-500">Membangun sistem mandiri di mana Anda memegang kendali penuh atas infrastruktur Anda.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Pendekatan Agnostik</h4>
                  <p className="text-sm text-gray-500">Rekomendasi objektif berdasarkan kebutuhan teknis, bukan kepentingan vendor.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square glass-panel rounded-2xl border border-white/10 p-2 overflow-hidden">
               <div className="w-full h-full bg-dark-bg rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                  {/* Pseudo-code illustration */}
                  <pre className="text-[10px] text-electric-blue/40 leading-tight select-none">
                    {`
class CyberCustodian {
  constructor(client) {
    this.client = client;
    this.philosophy = "transparency";
  }

  async buildShield() {
    const infrastructure = await OpenSource.init();
    return infrastructure.secure();
  }

  analyzeCost() {
    return "SaaS" > "Stand-alone" ? "Inefficient" : "Optimal";
  }
}

// Initializing secure bridge...
const bridge = new CyberCustodian("You");
bridge.buildShield();
                    `}
                  </pre>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
               </div>
            </div>
            {/* Accent lines */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-electric-blue/30" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-cyber-lime/30" />
          </div>
        </div>
      </div>
    </section>
  );
};
