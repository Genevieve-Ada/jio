import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { BrandWordmark } from './BowtieMark';

interface HeaderProps {
  cartCount: number;
  searchQuery: string;
  searchOpen: boolean;
  onToggleSearch: () => void;
  onSearchChange: (value: string) => void;
  onOpenCart: () => void;
  onNavigateShop: () => void;
  onOpenAbout: () => void;
  onOpenInspiration: () => void;
  onBrandClick: () => void;
}

const SUGGESTED_TERMS = ['Lamp', 'Ceramic Vase', 'Wooden', 'Rug', 'Print', 'Stool'];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  searchQuery,
  searchOpen,
  onToggleSearch,
  onSearchChange,
  onOpenCart,
  onNavigateShop,
  onOpenAbout,
  onOpenInspiration,
  onBrandClick,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E8E8E8]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-10 lg:px-14 h-16 grid grid-cols-3 items-center gap-4">
        {/* Zone 1: Left editorial nav links */}
        <nav aria-label="Primary navigation" className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onNavigateShop}
            className="text-[13px] font-normal text-[#141414] hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
          >
            Shop
          </button>
          <button
            type="button"
            onClick={onOpenAbout}
            className="text-[13px] font-normal text-[#141414] hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
          >
            About
          </button>
          <button
            type="button"
            onClick={onOpenInspiration}
            className="hidden sm:inline-block text-[13px] font-normal text-[#141414] hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
          >
            Inspiration
          </button>
        </nav>

        {/* Zone 2: Centered Brand Wordmark */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onBrandClick}
            aria-label="Home Decor — return to full catalog"
            className="text-[#111111] hover:opacity-80 transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
          >
            <BrandWordmark size="nav" />
          </button>
        </div>

        {/* Zone 3: Right actions (Search & Cart) */}
        <div className="flex items-center justify-end gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onToggleSearch}
            aria-expanded={searchOpen}
            className={`text-[13px] font-normal transition-opacity cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] ${
              searchOpen || searchQuery
                ? 'text-[#111111] underline underline-offset-4'
                : 'text-[#141414] hover:opacity-60'
            }`}
          >
            Search
          </button>
          <button
            type="button"
            onClick={onOpenCart}
            className="text-[13px] font-normal text-[#141414] hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
          >
            {cartCount > 0 ? `Cart (${cartCount})` : 'Cart'}
          </button>
        </div>
      </div>

      {/* Expandable Minimal Search Strip */}
      {searchOpen && (
        <div className="border-t border-[#ECECEC] bg-white">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-10 lg:px-14 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 max-w-xl border-b border-[#111111] pb-1.5">
              <Search className="w-4 h-4 text-[#555555] shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search lamps, vases, handcrafted wood, rugs..."
                aria-label="Search home decor catalog"
                className="w-full bg-transparent text-[14px] text-[#111111] placeholder:text-[#777777] outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="text-[#555555] hover:text-[#111111] cursor-pointer p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[11px] text-[#737373] whitespace-nowrap">Popular:</span>
              {SUGGESTED_TERMS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onSearchChange(term)}
                  className="text-[12px] text-[#262626] hover:text-[#111111] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
                >
                  {term}
                </button>
              ))}
              <button
                type="button"
                onClick={onToggleSearch}
                aria-label="Close search bar"
                className="ml-1 text-[#555555] hover:text-[#111111] cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
