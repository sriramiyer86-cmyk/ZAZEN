
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Overlay: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-obsidian border-2 border-brass-mid shadow-[0_0_50px_rgba(181,166,66,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="h-12 brass-gradient border-b border-brass-mid flex items-center justify-between px-6 shrink-0">
          <h3 className="font-black text-xs tracking-widest uppercase text-brass-bright">{title}</h3>
          <button onClick={onClose} className="text-brass-bright hover:rotate-90 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-8 md:p-12 overflow-y-auto text-gray-300 font-light leading-relaxed">
          {children}
        </div>
        <div className="h-2 bg-brass-mid"></div>
      </div>
    </div>
  );
};
