
import React, { useState, useEffect } from 'react';
import { generateFreezerImage } from '../services/geminiService';

export const Hero: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateFreezerImage('Modern industrial chest freezer with solar panels integrated into the lid, rural Indian village setting, professional cinematography, breakthrough cooling technology')
      .then(url => {
        setHeroImage(url);
        setLoading(false);
      });
  }, []);

  const scrollToModels = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEngineering = () => {
    const el = document.getElementById('roi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        {!loading && (
          <div className="w-full h-full relative transition-opacity duration-1000 animate-power-on">
            <img 
              src={heroImage} 
              alt="ZaZen Systems Tectonic Unit" 
              className="w-full h-full object-cover grayscale brightness-[0.3] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/60 to-obsidian"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
          </div>
        )}
      </div>

      <div className="relative z-10 text-center max-w-5xl space-y-16">
        <div className="space-y-8">
          <div className="inline-block px-6 py-2 border border-brass-mid/20 bg-brass-mid/5 backdrop-blur-md animate-power-on delay-100">
             <h2 className="text-brass-bright font-mono text-[10px] tracking-[0.8em] uppercase">Revolutionary BLDC Cooling // India Sector</h2>
          </div>
          <div className="relative">
            <h1 className="text-8xl md:text-[12rem] font-black text-white tracking-tighter leading-none animate-power-on delay-200">
              ZA<span className="text-brass-mid">ZEN</span>
            </h1>
            <div className="absolute -top-4 -right-8 text-brass-mid font-mono text-[10px] opacity-40 select-none animate-pulse">SYSTEM_UPLINK_READY</div>
          </div>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed animate-power-on delay-300">
            Breakthrough tectonic cooling for India's extreme environments. <span className="text-white font-medium italic underline decoration-brass-mid/50 decoration-2">Solar-native architecture</span> for zero-drift stability.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 animate-power-on delay-500">
          <button 
            onClick={scrollToModels}
            className="px-12 py-5 bg-brass-mid text-obsidian font-black text-xs tracking-[0.4em] uppercase hover:bg-brass-bright transition-all transform hover:-translate-y-1 shadow-[0_20px_40px_rgba(0,0,0,0.5)] mechanical-hover"
          >
            Explore Array
          </button>
          <button 
            onClick={scrollToEngineering}
            className="px-12 py-5 border border-white/20 text-white font-black text-xs tracking-[0.4em] uppercase hover:bg-white hover:text-obsidian transition-all hover:scale-105 duration-500"
          >
            Engineering Protocol
          </button>
        </div>
      </div>

      {/* Decorative Gear Background Elements */}
      <div className="absolute bottom-10 left-10 w-80 h-80 opacity-[0.03] pointer-events-none select-none">
         <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_120s_linear_infinite] text-brass-mid fill-current">
           <path d="M50 0 L55 35 L90 40 L55 45 L50 80 L45 45 L10 40 L45 35 Z" />
         </svg>
      </div>
      <div className="absolute top-40 right-10 w-48 h-48 opacity-[0.02] pointer-events-none select-none">
         <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_80s_linear_infinite_reverse] text-brass-mid fill-current">
           <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" />
         </svg>
      </div>
    </section>
  );
};
