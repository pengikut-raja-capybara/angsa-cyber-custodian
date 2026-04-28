import { services } from '../data/services';
import { ServiceCard } from './ServiceCard';
import { ShieldAlert, MessageSquare, Code2, ShieldCheck, Search, GraduationCap } from 'lucide-react';

export const Catalog = () => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'it-consulting': return <MessageSquare className="w-6 h-6" />;
      case 'web-dev': return <Code2 className="w-6 h-6" />;
      case 'cybersecurity': return <ShieldCheck className="w-6 h-6" />;
      case 'it-training': return <GraduationCap className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (id: string) => {
    switch (id) {
      case 'it-consulting': return '#00E5FF'; // Electric Blue
      case 'web-dev': return '#CCFF00'; // Cyber Lime
      case 'cybersecurity': return '#FF3D00'; // Deep Orange/Red for Cyber
      case 'education': return '#FFFFFF';
      default: return '#00E5FF';
    }
  };

  return (
    <section id="catalog" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 reveal-on-scroll">
          <h2 className="text-4xl font-bold mb-4">Katalog <span className="text-electric-blue">Layanan</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Solusi IT komprehensif yang dirancang untuk berbagai kebutuhan, dari edukasi hingga arsitektur kompleks.
          </p>
        </div>

        <div className="space-y-32">
          {services.map((category) => (
            <div key={category.id} className="relative reveal-on-scroll">
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                  <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4">
                    Category: {category.title}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div style={{ color: getCategoryColor(category.id) }}>
                      {getCategoryIcon(category.id)}
                    </div>
                    <h3 className="text-3xl font-bold">{category.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{category.description}</p>
                </div>
              </div>

              {/* Cybersecurity Disclaimer */}
              {category.disclaimer && (
                <div className="mb-12 p-6 border-2 border-red-900/50 bg-red-950/20 rounded-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ShieldAlert className="w-24 h-24 text-red-500" />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
                     <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/40">
                        <ShieldAlert className="w-6 h-6 text-red-500" />
                     </div>
                     <div className="flex-grow text-center md:text-left">
                        <h4 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">Legal Disclaimer & Limitation of Liability</h4>
                        <p className="text-gray-400 text-sm italic leading-relaxed">
                          {/* Formal disclaimer logic for legal prominence */}
                          {category.disclaimer}
                        </p>
                        <p className="mt-4 text-[10px] text-gray-600 uppercase tracking-tighter">
                          // SECTION 402 - AGNOSTIC SERVICE PROVISION CLAUSE
                        </p>
                     </div>
                  </div>
                </div>
              )}

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service) => (
                  <div 
                    key={service.id} 
                    className={`${category.id === 'cybersecurity' ? 'opacity-80 grayscale hover:grayscale-0 transition-all duration-500' : ''}`}
                  >
                    {category.id === 'cybersecurity' && (
                      <div className="text-[10px] text-red-500 font-mono mb-2 animate-pulse">
                        [ AKSES TERBATAS ]
                      </div>
                    )}
                    <ServiceCard 
                      service={service} 
                      categoryColor={getCategoryColor(category.id)} 
                      isCyber={category.id === 'cybersecurity'}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
