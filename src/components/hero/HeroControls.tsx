import React from 'react';

interface HeroControlsProps {
  activeIndex: number;
  onSelect: (index: number) => void;
  items: Array<{
    id: string;
    name: string;
    volume: string;
    image: string;
  }>;
}

export const HeroControls: React.FC<HeroControlsProps> = ({
  activeIndex,
  onSelect,
  items
}) => {
  return (
    <div className="flex items-center gap-3 sm:gap-6 bg-espresso-900/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-gold/30 shadow-2xl">
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(idx)}
            className={`group relative flex items-center gap-3 px-3 py-1.5 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-gold/20 text-gold border border-gold/50 shadow-[0_0_15px_rgba(197,160,89,0.2)]'
                : 'text-ivory-400 hover:text-ivory-100 hover:bg-white/5 border border-transparent'
            }`}
          >
            {/* Small bottle thumbnail */}
            <div className="w-6 h-6 rounded-full overflow-hidden bg-espresso-800/80 flex items-center justify-center p-0.5 border border-gold/20">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>

            <div className="text-left hidden md:block">
              <span className="block text-[11px] font-serif font-semibold tracking-wider leading-none">
                0{idx + 1}
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-ivory-400 mt-0.5">
                {item.name.split(' ')[1] || item.name}
              </span>
            </div>

            {/* Active animated indicator bar */}
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold rounded-full animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
};
