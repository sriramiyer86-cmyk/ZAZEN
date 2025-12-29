
import React, { useState, useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { ProductCard } from './components/ProductCard';
import { Overlay } from './components/Overlay';
import { MODELS, CHILLER_MODELS, TECHNICAL_DOCS, GLOBAL_FOUNDRIES, CASE_STUDIES, TESTIMONIALS, FOUNDRY_LOGS } from './constants';
import { TechnicalDoc } from './types';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  var aistudio: AIStudio;
}

const App: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<TechnicalDoc | null>(null);
  const [showPortal, setShowPortal] = useState<'build' | 'foundries' | 'support' | 'archive' | 'cases' | null>(null);
  const [activeVertical, setActiveVertical] = useState<'freezer' | 'chiller'>('freezer');
  const [scrolled, setScrolled] = useState(false);
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [roiUsage, setRoiUsage] = useState(12);

  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) setNeedsApiKey(true);
      } catch (e) {
        setNeedsApiKey(true);
      }
    };
    checkApiKey();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          entry.target.classList.remove('reveal-hidden');
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add('reveal-hidden');
        observer.observe(ref);
      }
    });

    const handleApiKeyError = (e: any) => {
      if (e.detail?.includes("Requested entity was not found") || e.detail?.includes("403")) {
        setNeedsApiKey(true);
      }
    };
    window.addEventListener('gemini-api-key-error' as any, handleApiKeyError);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('gemini-api-key-error' as any, handleApiKeyError);
      observer.disconnect();
    };
  }, []);

  const handleSelectApiKey = async () => {
    await window.aistudio.openSelectKey();
    setNeedsApiKey(false);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const calculatedSavings = Math.round(roiUsage * 1530);

  if (needsApiKey) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-8 engineering-grid">
        <div className="max-w-2xl w-full obsidian-glass p-12 border-2 border-brass-mid space-y-8 text-center relative overflow-hidden animate-power-on">
          <div className="absolute top-0 left-0 w-full h-1 bg-brass-mid animate-pulse"></div>
          <div className="space-y-4">
            <div className="w-16 h-16 border-2 border-brass-mid flex items-center justify-center mx-auto text-brass-bright font-black text-2xl">Z</div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">ZaZen Systems // Engineering Uplink</h1>
            <p className="text-gray-400 font-light leading-relaxed text-sm">Authorization required. Refer to the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-brass-mid hover:underline">billing documentation</a>.</p>
          </div>
          <button onClick={handleSelectApiKey} className="w-full py-6 bg-brass-mid text-obsidian font-black uppercase text-xs tracking-[0.4em] hover:bg-brass-bright transition-all shadow-xl mechanical-hover">Authorize Session</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-gray-200 selection:bg-brass-mid/30">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'h-16 bg-obsidian/95 border-b border-brass-mid/20 backdrop-blur-md' : 'h-24 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`w-8 h-8 flex items-center justify-center border border-brass-mid rounded transition-all duration-500 ${scrolled ? 'bg-brass-mid text-obsidian' : 'text-brass-bright'}`}>
              <span className="font-black text-xs">Z</span>
            </div>
            <span className="font-black text-lg tracking-tighter text-white uppercase transition-all group-hover:tracking-normal">ZaZen <span className="text-brass-mid">Systems</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            {['roi', 'solutions', 'products'].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-brass-bright transition-colors relative group">
                {id}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brass-mid transition-all group-hover:w-full"></span>
              </button>
            ))}
            <button onClick={() => setShowPortal('foundries')} className="hover:text-brass-bright transition-colors relative group">foundries</button>
            <button onClick={() => window.aistudio.openSelectKey()} className="px-6 py-2 border border-brass-mid/40 text-brass-bright hover:bg-brass-mid hover:text-obsidian transition-all text-[9px]">Config</button>
          </div>
        </div>
      </nav>

      <Hero />
      <Ticker />

      <main className="py-24 space-y-48">
        <section id="roi" ref={(el) => (revealRefs.current[0] = el)} className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <span className="text-verdigris font-mono text-[10px] uppercase tracking-[0.6em] block">Economic Analysis Protocol</span>
            <h2 className="text-6xl font-black text-white leading-none uppercase tracking-tighter">Savings <br/><span className="text-brass-mid">Calculated</span>.</h2>
            <p className="text-gray-400 font-light max-w-lg leading-relaxed">Estimate your annual overhead reduction based on daily operating cycles compared to conventional AC units.</p>
            <div className="space-y-6 bg-white/5 p-8 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-brass-mid/30"></div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Cycle (Hrs/Day)</span>
                <span className="text-brass-bright font-mono text-xl">{roiUsage}h</span>
              </div>
              <input type="range" min="4" max="24" value={roiUsage} onChange={(e) => setRoiUsage(parseInt(e.target.value))} className="w-full h-1 bg-white/10 accent-brass-mid cursor-pointer" />
              <div className="pt-8 border-t border-white/5 flex justify-between items-end">
                <div>
                   <span className="text-[10px] text-gray-500 font-black uppercase block mb-1 tracking-widest">Est. Annual Reduction</span>
                   <span className="text-4xl font-black text-white transition-all">₹{calculatedSavings.toLocaleString()}</span>
                </div>
                <div className="text-right">
                   <span className="text-[10px] text-verdigris font-black uppercase block mb-1 tracking-widest">Payback Period</span>
                   <span className="text-xl font-black text-verdigris">2.3 Years</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[
               { t: 'Solar Priority', d: 'DC-link bypasses inverter losses.' },
               { t: 'BLDC Control', d: 'Energy usage cut by 40%.' },
               { t: 'Thermal Mass', d: 'PCM buffer reduces active cooling.' },
               { t: 'Heat Rejection', d: 'Outdoor split saves internal AC.' }
             ].map((f, i) => (
               <div key={i} className="p-8 border border-white/5 bg-white/[0.02] space-y-2 hover:border-brass-mid/30 transition-all group cursor-default">
                 <h4 className="text-xs font-black text-white uppercase group-hover:text-brass-bright transition-colors">{f.t}</h4>
                 <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-mono">{f.d}</p>
               </div>
             ))}
          </div>
        </section>

        <section id="solutions" ref={(el) => (revealRefs.current[1] = el)} className="max-w-7xl mx-auto px-8 space-y-16">
          <div className="text-center space-y-4">
             <span className="text-brass-mid font-mono text-[10px] uppercase tracking-[0.6em] block">Modern India Architecture</span>
             <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">Specialized <br/><span className="text-brass-mid">Industry Verticals</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: 'Dairy Industry', d: 'Farm collection to retail. Solar chillers maintain 4°C despite 8hr outages.', i: '🥛' },
              { t: 'Pharmaceutical', d: 'Precise ±0.5°C accuracy for vaccine storage. Compliance ready.', i: '💉' },
              { t: 'F&B Service', d: 'Reduces food waste by 30% through Air-Based evaporation.', i: '🍔' },
              { t: 'Agriculture', d: 'Harvest preservation in remote off-grid farms with DC link.', i: '🌾' }
            ].map((v, i) => (
              <div key={i} className="p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group relative overflow-hidden hover:-translate-y-2 duration-500">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{v.i}</div>
                <h4 className="text-lg font-black text-white uppercase mb-4 tracking-tighter">{v.t}</h4>
                <p className="text-gray-500 text-xs font-light leading-relaxed">{v.d}</p>
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-brass-mid opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brass-mid/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </div>
            ))}
          </div>
        </section>

        <section ref={(el) => (revealRefs.current[2] = el)} className="bg-black py-24 border-y border-white/5 relative group">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-24 items-center">
            <div className="w-full md:w-1/3 space-y-6">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">IoT Telemetry Logs</h3>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-widest leading-relaxed">Active node tracking for predictive maintenance and zero-spoilage assurance.</p>
              <div className="flex gap-4">
                <div className="w-2.5 h-2.5 bg-verdigris rounded-full glow-status"></div>
                <span className="text-[10px] font-black text-verdigris uppercase tracking-widest">Satellite Uplink Active</span>
              </div>
            </div>
            <div className="flex-1 w-full bg-[#020202] border border-white/10 p-8 h-64 overflow-hidden relative">
              <div className="space-y-2 animate-[scroll_40s_linear_infinite]">
                {[...FOUNDRY_LOGS, ...FOUNDRY_LOGS, ...FOUNDRY_LOGS, ...FOUNDRY_LOGS].map((log, i) => (
                  <div key={i} className="font-mono text-[10px] text-gray-600 border-l border-brass-mid/30 pl-4 py-1 hover:text-brass-bright transition-colors cursor-default hover:bg-white/5">
                    {`> ${log}`}
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] pointer-events-none"></div>
              <div className="absolute inset-0 border-[0.5px] border-white/5 pointer-events-none"></div>
            </div>
          </div>
        </section>

        <section id="products" ref={(el) => (revealRefs.current[3] = el)} className="max-w-7xl mx-auto px-8 space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Hardware Array</h2>
              <div className="flex gap-4">
                <button onClick={() => setActiveVertical('freezer')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeVertical === 'freezer' ? 'bg-brass-mid text-obsidian shadow-[0_0_20px_rgba(181,166,66,0.3)]' : 'bg-white/5 text-gray-400'}`}>Freezers</button>
                <button onClick={() => setActiveVertical('chiller')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeVertical === 'chiller' ? 'bg-brass-mid text-obsidian shadow-[0_0_20px_rgba(181,166,66,0.3)]' : 'bg-white/5 text-gray-400'}`}>Chillers</button>
              </div>
            </div>
            <div className="flex gap-6 text-[10px] font-black uppercase text-gray-600 tracking-widest">
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-verdigris rounded-full glow-status"></div> Dust Proof</span>
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-verdigris rounded-full glow-status"></div> Moisture Proof</span>
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-verdigris rounded-full glow-status"></div> Voltage Guard</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeVertical === 'freezer' ? MODELS : CHILLER_MODELS).map(model => (
              <ProductCard key={model.id} model={model} />
            ))}
          </div>
        </section>

        <section ref={(el) => (revealRefs.current[4] = el)} className="max-w-7xl mx-auto px-8">
          <div className="bg-gradient-to-r from-brass-dark/20 to-obsidian border border-brass-mid/20 p-12 md:p-24 relative overflow-hidden group">
             <div className="relative z-10 max-w-2xl space-y-10">
                <h2 className="text-6xl font-black text-white tracking-tighter leading-none uppercase group-hover:text-brass-bright transition-colors duration-700">Bespoke <br/><span className="text-brass-mid">Consultation</span>.</h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed">Ready to transform your cooling infrastructure? Initiate the consultation protocol today.</p>
                <button onClick={() => setShowPortal('build')} className="px-12 py-5 bg-brass-mid text-obsidian font-black text-xs uppercase tracking-[0.3em] hover:bg-brass-bright transition-all shadow-xl mechanical-hover">Start Protocol</button>
             </div>
             <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 text-brass-mid/5 font-black text-[20vw] pointer-events-none select-none uppercase tracking-tighter italic transition-all duration-1000 group-hover:opacity-10 group-hover:scale-110">ZAZEN</div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-24 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 border border-brass-mid flex items-center justify-center font-black text-brass-mid">Z</div>
             <span className="font-black text-2xl tracking-tighter text-white uppercase">ZaZen Systems</span>
          </div>
          <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-widest text-gray-600">
             <button onClick={() => setShowPortal('archive')} className="hover:text-white transition-colors">Engineering</button>
             <button onClick={() => setShowPortal('cases')} className="hover:text-white transition-colors">Case Studies</button>
             <button onClick={() => setShowPortal('support')} className="hover:text-white transition-colors">Support</button>
          </div>
          <div className="text-right text-[10px] font-mono text-gray-700">© 2024 ZAZEN_SYSTEMS // INDIA_REFRIGERATION_GROUP</div>
        </div>
      </footer>

      <Overlay isOpen={showPortal === 'foundries'} onClose={() => setShowPortal(null)} title="GLOBAL_FOUNDRY_MAP_L2">
        <div className="grid md:grid-cols-3 gap-8">
          {GLOBAL_FOUNDRIES.map((f, i) => (
            <div key={i} className="p-8 border border-white/5 bg-white/5 space-y-6 hover:border-brass-mid/40 transition-all duration-500">
              <div className="flex justify-between items-center">
                <span className="text-brass-mid font-mono text-[9px] uppercase tracking-widest">{f.status}</span>
                <div className="w-2 h-2 bg-verdigris rounded-full glow-status"></div>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{f.location}</h3>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{f.focus}</p>
            </div>
          ))}
        </div>
      </Overlay>

      <Overlay isOpen={!!activeDoc} onClose={() => setActiveDoc(null)} title={`SPEC // ${activeDoc?.id.toUpperCase()}`}>
        <div className="space-y-8 animate-power-on">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{activeDoc?.title}</h2>
          <div className="text-lg text-gray-400 font-light whitespace-pre-wrap leading-relaxed border-l-2 border-brass-mid/30 pl-8">{activeDoc?.content}</div>
        </div>
      </Overlay>
    </div>
  );
};

export default App;
