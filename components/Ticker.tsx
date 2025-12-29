
import React, { useState, useEffect } from 'react';
import { INITIAL_TICKER_DATA } from '../constants';
import { TickerData } from '../types';

export const Ticker: React.FC = () => {
  const [tickerItems, setTickerItems] = useState<TickerData[]>(INITIAL_TICKER_DATA);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const tickerTimer = setInterval(() => {
      setTickerItems(prev => prev.map(item => {
        if (item.label === 'CORE_TEMP') {
          const current = parseFloat(item.value.replace('°C', ''));
          const next = (current + (Math.random() - 0.5) * 0.1).toFixed(1);
          return { ...item, value: `${next}°C` };
        }
        if (item.label === 'SYS_VOLTAGE') {
          const next = (24 + (Math.random() - 0.5) * 0.4).toFixed(1);
          return { ...item, value: `${next}V` };
        }
        return item;
      }));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(tickerTimer);
    };
  }, []);

  const timeStr = currentTime.toISOString().split('T')[1].split('.')[0] + ' UTC';

  return (
    <div className="w-full h-[160px] bg-obsidian border-y border-brass-dark/30 relative overflow-hidden flex flex-col z-20">
      <div className="h-8 brass-gradient border-b border-brass-mid/20 flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-1.5 bg-ruby rounded-full shadow-[0_0_8px_#ff3e3e] animate-tick"></div>
          <span className="text-[8px] tracking-[0.5em] font-black text-brass-mid uppercase">Telemetry Stream: ACTIVE</span>
        </div>
        <div className="font-mono text-[9px] text-brass-mid font-bold tracking-[0.2em]">{timeStr}</div>
      </div>

      <div className="flex-1 relative flex items-center overflow-hidden bg-black/40">
        <div className="flex whitespace-nowrap animate-ticker-track">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="inline-flex items-center px-20 border-r border-white/5 h-20">
              <div className="mr-8">
                <span className="block text-[8px] text-gray-600 font-mono mb-1 uppercase tracking-widest">{item.label}</span>
                <span className="block text-2xl font-black tracking-tighter text-white font-outfit">{item.value}</span>
              </div>
              <div className="flex flex-col justify-center gap-1">
                <span className={`text-[7px] font-mono font-bold uppercase tracking-widest ${item.status === 'alert' ? 'text-ruby' : 'text-verdigris'}`}>
                  {item.sub}
                </span>
                <div className={`h-[2px] w-4 rounded-full ${item.status === 'alert' ? 'bg-ruby' : 'bg-verdigris'}`}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none vignette opacity-40"></div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-obsidian via-transparent to-obsidian"></div>
      </div>
    </div>
  );
};
