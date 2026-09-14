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
    <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-ivory-300/80 shadow-[0_4px_20px_rgba(28,25,23,0.04)]">
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(idx)}
            className={`group relative flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
              isActive
                ? 'bg-ivory-100 text-espresso-950 border border-gold/40 shadow-xs'
                : 'text-espresso-500 hover:text-espresso-900 border border-transparent'
            }`}
            aria-label={`Select ${item.name}`}
          >
            {/* Minimal thumbnail */}
            <div className="w-5 h-5 rounded-full overflow-hidden bg-ivory-50 flex items-center justify-center p-0.5 border border-ivory-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-[11px] font-sans font-medium tracking-wider uppercase text-espresso-800">
              0{idx + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
};

