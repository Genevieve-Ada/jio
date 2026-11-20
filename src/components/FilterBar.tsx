import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import { CategoryKey, ColorFamily, ProductSize } from '../data/products';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
export type PriceRange = 'all' | 'under-35' | '35-65' | 'over-65';

interface FilterBarProps {
  activeCategory: CategoryKey;
  onCategoryChange: (cat: CategoryKey) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  colorFilter: ColorFamily;
  onColorChange: (color: ColorFamily) => void;
  sizeFilter: ProductSize | 'All';
  onSizeChange: (size: ProductSize | 'All') => void;
  priceRange: PriceRange;
  onPriceRangeChange: (range: PriceRange) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  resultCount: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

const CATEGORIES: { key: CategoryKey; prefix?: string; label: string }[] = [
  { key: 'All', label: 'All' },
  { key: 'Lighting', prefix: 'BY', label: 'Lighting' },
  { key: 'Furniture', prefix: 'BY', label: 'Furniture' },
  { key: 'Wall Art', prefix: 'BY', label: 'Wall Art' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

const COLOR_OPTIONS: { value: ColorFamily; label: string; dot?: string }[] = [
  { value: 'All', label: 'All Colors' },
  { value: 'Terracotta & Clay', label: 'Terracotta & Clay', dot: '#853318' },
  { value: 'Natural Wood', label: 'Natural Wood', dot: '#9d775b' },
  { value: 'Warm Sand', label: 'Warm Sand', dot: '#c8b8a2' },
  { value: 'Charcoal & Stone', label: 'Charcoal & Stone', dot: '#2d3434' },
  { value: 'Mineral Slate', label: 'Mineral Slate', dot: '#577d80' },
];

const SIZE_OPTIONS: { value: ProductSize | 'All'; label: string }[] = [
  { value: 'All', label: 'All Sizes' },
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' },
];

const PRICE_OPTIONS: { value: PriceRange; label: string }[] = [
  { value: 'all', label: 'All Prices' },
  { value: 'under-35', label: 'Under $35' },
  { value: '35-65', label: '$35 – $65' },
  { value: 'over-65', label: 'Over $65' },
];

type OpenMenu = 'sort' | 'color' | 'size' | 'price' | null;

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  colorFilter,
  onColorChange,
  sizeFilter,
  onSizeChange,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onToggleInStock,
  resultCount,
  hasActiveFilters,
  onResetFilters,
}) => {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const toggleMenu = (menu: OpenMenu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const activeSortLabel =
    sortBy === 'featured'
      ? 'Sort by'
      : SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Sort by';

  return (
    <section aria-label="Catalog categories and filters" className="pt-8 sm:pt-10">
      {/* Main Editorial H1 */}
      <h1 className="font-serif text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.14] font-normal tracking-[-0.015em] text-[#111111] text-center text-balance mb-7 sm:mb-9">
        Shop All Home Decor Items
      </h1>

      {/* 4-Column Category Navigation Tabs */}
      <div
        role="tablist"
        aria-label="Product categories"
        className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#DCDCDC]"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => onCategoryChange(cat.key)}
              className="group relative pb-3.5 pt-2 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
            >
              <span className="inline-flex items-start gap-1">
                {cat.prefix && (
                  <span className="font-sans text-[9px] font-medium uppercase tracking-[0.04em] text-[#555555] mt-1 sm:mt-1.5 leading-none">
                    {cat.prefix}
                  </span>
                )}
                <span
                  className={`font-serif text-[22px] sm:text-[26px] lg:text-[29px] leading-[1.15] tracking-[-0.01em] transition-colors whitespace-nowrap ${
                    isActive
                      ? 'font-semibold text-[#111111]'
                      : 'font-medium text-[#1F1F1F] group-hover:text-[#111111]'
                  }`}
                >
                  {cat.label}
                </span>
              </span>

              {/* Crisp dark bottom bar under active category */}
              <span
                aria-hidden="true"
                className={`absolute left-0 bottom-[-1px] h-[2px] bg-[#111111] transition-all duration-200 ${
                  isActive ? 'w-[70%] sm:w-[68%] opacity-100' : 'w-0 opacity-0 group-hover:w-12 group-hover:opacity-30'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Filter & Sort Controls Row */}
      <div
        ref={toolbarRef}
        className="pt-5 pb-5 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex flex-wrap items-center gap-2">
          {/* Sliders / Quick Filter Drawer Toggle */}
          <button
            type="button"
            onClick={() => setShowFilterPanel((prev) => !prev)}
            aria-expanded={showFilterPanel}
            aria-label="Toggle filter overview panel"
            className={`w-8 h-8 rounded-[3px] border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
              showFilterPanel
                ? 'border-[#111111] bg-[#111111] text-white'
                : 'border-[#D4D4D4] bg-white text-[#1A1A1A] hover:border-[#111111]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Sort By (Solid Black Button matching reference) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu('sort')}
              aria-expanded={openMenu === 'sort'}
              className="h-8 px-3 rounded-[3px] bg-[#111111] border border-[#111111] text-white text-[12px] font-normal inline-flex items-center gap-1.5 hover:bg-[#262626] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{activeSortLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openMenu === 'sort' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openMenu === 'sort' && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-1.5 w-48 bg-white border border-[#DCDCDC] shadow-lg py-1 z-30"
              >
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      onSortChange(option.value);
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left text-[12px] text-[#1A1A1A] hover:bg-[#F5F5F3] flex items-center justify-between cursor-pointer"
                  >
                    <span>{option.label}</span>
                    {sortBy === option.value && <Check className="w-3.5 h-3.5 text-[#111111]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu('color')}
              aria-expanded={openMenu === 'color'}
              className={`h-8 px-3 rounded-[3px] border text-[12px] font-normal inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                colorFilter !== 'All'
                  ? 'border-[#111111] bg-[#F7F6F2] text-[#111111]'
                  : 'border-[#D4D4D4] bg-white text-[#1A1A1A] hover:border-[#111111]'
              }`}
            >
              <span>{colorFilter === 'All' ? 'Color' : colorFilter}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openMenu === 'color' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openMenu === 'color' && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-1.5 w-52 bg-white border border-[#DCDCDC] shadow-lg py-1 z-30"
              >
                {COLOR_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      onColorChange(option.value);
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left text-[12px] text-[#1A1A1A] hover:bg-[#F5F5F3] flex items-center justify-between cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2">
                      {option.dot && (
                        <span
                          className="w-2.5 h-2.5 inline-block shrink-0 border border-black/15"
                          style={{ backgroundColor: option.dot }}
                          aria-hidden="true"
                        />
                      )}
                      <span>{option.label}</span>
                    </span>
                    {colorFilter === option.value && <Check className="w-3.5 h-3.5 text-[#111111]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Size Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu('size')}
              aria-expanded={openMenu === 'size'}
              className={`h-8 px-3 rounded-[3px] border text-[12px] font-normal inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                sizeFilter !== 'All'
                  ? 'border-[#111111] bg-[#F7F6F2] text-[#111111]'
                  : 'border-[#D4D4D4] bg-white text-[#1A1A1A] hover:border-[#111111]'
              }`}
            >
              <span>{sizeFilter === 'All' ? 'Size' : `Size: ${sizeFilter}`}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openMenu === 'size' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openMenu === 'size' && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-1.5 w-40 bg-white border border-[#DCDCDC] shadow-lg py-1 z-30"
              >
                {SIZE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      onSizeChange(option.value);
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left text-[12px] text-[#1A1A1A] hover:bg-[#F5F5F3] flex items-center justify-between cursor-pointer"
                  >
                    <span>{option.label}</span>
                    {sizeFilter === option.value && <Check className="w-3.5 h-3.5 text-[#111111]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu('price')}
              aria-expanded={openMenu === 'price'}
              className={`h-8 px-3 rounded-[3px] border text-[12px] font-normal inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                priceRange !== 'all'
                  ? 'border-[#111111] bg-[#F7F6F2] text-[#111111]'
                  : 'border-[#D4D4D4] bg-white text-[#1A1A1A] hover:border-[#111111]'
              }`}
            >
              <span>
                {priceRange === 'all'
                  ? 'Price'
                  : PRICE_OPTIONS.find((o) => o.value === priceRange)?.label}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openMenu === 'price' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openMenu === 'price' && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-[#DCDCDC] shadow-lg py-1 z-30"
              >
                {PRICE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      onPriceRangeChange(option.value);
                      setOpenMenu(null);
                    }}
                    className="w-full px-3.5 py-2 text-left text-[12px] text-[#1A1A1A] hover:bg-[#F5F5F3] flex items-center justify-between cursor-pointer"
                  >
                    <span>{option.label}</span>
                    {priceRange === option.value && <Check className="w-3.5 h-3.5 text-[#111111]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* In-stock Toggle */}
          <button
            type="button"
            onClick={onToggleInStock}
            aria-pressed={inStockOnly}
            className={`h-8 px-3 rounded-[3px] border text-[12px] font-normal transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              inStockOnly
                ? 'border-[#111111] bg-[#111111] text-white'
                : 'border-[#D4D4D4] bg-white text-[#1A1A1A] hover:border-[#111111]'
            }`}
          >
            In-stock
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-[12px] text-[#555555] hover:text-[#111111] underline underline-offset-4 ml-1 cursor-pointer whitespace-nowrap"
            >
              Reset all
            </button>
          )}
        </div>

        {/* Right-aligned quiet result count */}
        <p className="text-[12px] font-normal text-[#262626] tabular-nums whitespace-nowrap">
          {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </p>
      </div>

      {/* Optional Expandable Quick-Filter Overview Strip when Sliders Icon is toggled */}
      {showFilterPanel && (
        <div className="mb-5 px-4 py-3.5 bg-[#F8F7F4] border border-[#E5E3DD] flex flex-wrap items-center justify-between gap-4 text-[12px]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#333333]">
            <span>
              <strong className="font-medium text-[#111111]">Category:</strong> {activeCategory}
            </span>
            <span>
              <strong className="font-medium text-[#111111]">Color:</strong> {colorFilter}
            </span>
            <span>
              <strong className="font-medium text-[#111111]">Size:</strong> {sizeFilter}
            </span>
            <span>
              <strong className="font-medium text-[#111111]">Availability:</strong>{' '}
              {inStockOnly ? 'Ready to ship only' : 'In-stock & Made to order'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onResetFilters();
              setShowFilterPanel(false);
            }}
            className="text-[12px] font-medium text-[#111111] underline underline-offset-4 hover:opacity-70 cursor-pointer whitespace-nowrap"
          >
            Clear &amp; close
          </button>
        </div>
      )}
    </section>
  );
};
