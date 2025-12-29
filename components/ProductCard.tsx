
import React, { useState, useEffect } from 'react';
import { ModelSpec } from '../types';
import { generateFreezerImage } from '../services/geminiService';
import { Overlay } from './Overlay';
import { STANDARD_CHEST_SPECS } from '../constants';

interface Props {
  model: ModelSpec;
}

export const ProductCard: React.FC<Props> = ({ model }) => {
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    generateFreezerImage(model.imagePrompt)
      .then(url => {
        setImage(url);
        setLoading(false);
      });
  }, [model.imagePrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 3000);
  };

  return (
    <>
      <div 
        className="group relative bg-[#0a0a0a] border border-white/5 hover:border-brass-mid/50 transition-all duration-700 flex flex-col h-full transform hover:-translate-y-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="aspect-square relative overflow-hidden bg-black border-b border-white/5">
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-2 border-brass-mid/20 border-t-brass-mid rounded-full animate-spin"></div>
              <span className="font-mono text-[8px] text-gray-600 tracking-widest uppercase animate-pulse">Uplink Rendering...</span>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img 
                src={image} 
                alt={model.name} 
                className={`w-full h-full object-cover transition-all duration-1000 ${hovered ? 'scale-110 brightness-110' : 'scale-100 brightness-75'}`}
              />
              {hovered && <div className="animate-scanline"></div>}
            </div>
          )}
          
          <div className="absolute top-4 left-4 z-10">
             <div className="bg-obsidian/90 border border-white/10 text-white text-[9px] font-black px-4 py-1.5 uppercase tracking-widest backdrop-blur-sm">
              {model.capacity}
            </div>
          </div>
        </div>

        <div className="p-10 space-y-8 flex-1 flex flex-col">
          <div className="space-y-3">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-brass-bright transition-all duration-500">{model.name}</h3>
            <div className={`h-0.5 bg-brass-mid transition-all duration-700 ${hovered ? 'w-16' : 'w-8'}`}></div>
          </div>
          
          <p className="text-gray-500 text-sm leading-relaxed font-light">{model.description}</p>
          
          <div className="space-y-3 py-6 border-y border-white/5">
            {model.specs.slice(0, 3).map((spec, i) => (
              <div key={i} className="flex items-center gap-3 group/item">
                <div className={`w-1 h-1 bg-brass-mid transition-all duration-300 ${hovered ? 'scale-150' : 'scale-100'}`}></div>
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest group-hover/item:text-white transition-colors">{spec}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/5 mt-auto border border-white/10 overflow-hidden">
            <button 
              onClick={() => setShowSpecs(true)}
              className="py-5 bg-obsidian text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all relative overflow-hidden group/btn"
            >
              <span className="relative z-10">Details</span>
              <div className="absolute inset-0 bg-white/5 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
              onClick={() => setShowForm(true)}
              className="py-5 bg-obsidian text-[9px] font-black uppercase tracking-[0.2em] text-brass-mid hover:text-obsidian transition-all relative overflow-hidden group/btn"
            >
              <span className="relative z-10">Commission</span>
              <div className="absolute inset-0 bg-brass-mid transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      <Overlay 
        isOpen={showSpecs} 
        onClose={() => setShowSpecs(false)} 
        title={`${model.name.toUpperCase()} // FULL_SPEC`}
      >
        <div className="space-y-12 animate-power-on">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-verdigris font-mono text-[9px] uppercase tracking-widest block">Core Architecture</span>
                <h4 className="text-4xl font-black text-white uppercase tracking-tighter">{model.name}</h4>
              </div>
              <p className="text-gray-400 leading-relaxed font-light text-lg">
                Engineered for massive thermal inertia. Built on a multi-stage tectonic chassis, it maintains zero drift during 72-hour interruptions.
              </p>
              
              <div className="space-y-6">
                <h5 className="text-[10px] font-black uppercase text-white tracking-[0.3em] border-b border-white/10 pb-3">Unit Configuration</h5>
                <div className="space-y-4">
                  {model.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-mono uppercase group/spec">
                      <span className="text-gray-600 group-hover/spec:text-brass-mid transition-colors">Protocol_{i+1}</span>
                      <span className="text-brass-bright font-black">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] font-black uppercase text-white tracking-[0.3em] border-b border-white/10 pb-3">Engineering Matrix</h5>
              <div className="grid grid-cols-1 gap-4">
                {STANDARD_CHEST_SPECS.map((spec, i) => (
                  <div key={i} className="flex justify-between p-5 bg-white/5 border border-white/5 hover:border-brass-mid/40 transition-all duration-500 group/metric">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest group-hover/metric:text-gray-300">{spec.label}</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => { setShowSpecs(false); setShowForm(true); }} className="w-full py-6 bg-brass-mid text-obsidian font-black uppercase text-xs tracking-[0.5em] hover:bg-brass-bright transition-all shadow-2xl mechanical-hover">Begin Fabrication Protocol</button>
        </div>
      </Overlay>

      <Overlay isOpen={showForm} onClose={() => setShowForm(false)} title={`FORM // ${model.id.toUpperCase()}`}>
        {submitted ? (
          <div className="py-24 text-center space-y-8 animate-power-on">
            <div className="w-24 h-24 border-2 border-verdigris rounded-full mx-auto flex items-center justify-center glow-status">
              <svg className="w-12 h-12 text-verdigris" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Transmission Successful</h2>
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">Encrypted packet received // Link active</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-12 pb-10 animate-power-on">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Commission Inquiry</h2>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-mono italic">Initiating industrial project specification protocol...</p>
            </div>
            <div className="space-y-12">
              <div className="grid md:grid-cols