import React, { useState } from 'react';
import { Product } from '../data/products';
import { BowtieMark } from './BowtieMark';

interface ProductCardProps {
  product: Product;
  variant?: 'standard' | 'featured';
  selectedSwatchIndex: number;
  onSelectSwatch: (productId: string, swatchIndex: number) => void;
  onOpenProduct: (product: Product) => void;
  onQuickAdd: (product: Product, swatchIndex: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'standard',
  selectedSwatchIndex,
  onSelectSwatch,
  onOpenProduct,
  onQuickAdd,
}) => {
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedSwatchIndex);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  };

  const isFeatured = variant === 'featured';

  return (
    <article
      className={`group flex flex-col ${isFeatured ? 'h-full' : ''}`}
    >
      {/* Image Frame */}
      <div
        onClick={() => onOpenProduct(product)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenProduct(product);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Inspect ${product.name}, $${product.price.toFixed(2)}`}
        className={`relative w-full overflow-hidden bg-[#F2EFEA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] ${
          isFeatured ? 'flex-1 min-h-[380px] sm:min-h-[460px] lg:min-h-0' : 'aspect-[284/272]'
        }`}
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={`${product.name} — ${product.descriptor}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`${
              isFeatured ? 'lg:absolute lg:inset-0 ' : ''
            }w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F3EFE9] to-[#E5DDD2] text-[#431100]">
            <BowtieMark className="w-8 h-5 mb-3 opacity-60" />
            <span className="font-serif text-base">{product.name}</span>
          </div>
        )}

        {/* Hover-only Quick Add Action (clean zero-clutter at rest) */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className={`absolute bottom-3 right-3 px-3 py-1.5 text-[11px] font-medium tracking-[0.02em] transition-all duration-200 cursor-pointer whitespace-nowrap ${
            justAdded
              ? 'opacity-100 bg-[#F5F46E] text-[#111111]'
              : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 bg-[#111111] text-white hover:bg-[#431100]'
          }`}
        >
          {justAdded ? 'Added to Cart' : '+ Add to Cart'}
        </button>
      </div>

      {/* Editorial Product Title */}
      <div className="pt-3 pb-2.5 flex items-baseline justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenProduct(product)}
          className="text-left text-[15px] sm:text-[16px] leading-[1.3] font-normal text-[#141414] group-hover:text-[#431100] transition-colors truncate cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          {product.name}
        </button>
      </div>

      {/* Hairline Divider & Bottom Price / Descriptor / Dual Bowtie Swatches */}
      <div className="border-t border-[#E5E5E5] pt-2.5 flex items-center justify-between gap-2">
        <span className="text-[12px] leading-none font-normal text-[#141414] tabular-nums whitespace-nowrap shrink-0">
          ${product.price.toFixed(2)}
        </span>

        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] leading-none font-normal text-[#525252] truncate">
            {product.descriptor}
          </span>

          {/* Signature Dual-Bowtie Finish Swatches */}
          <div className="inline-flex items-center gap-[4px] shrink-0" role="group" aria-label={`Finishes for ${product.name}`}>
            {product.swatches.map((swatch, idx) => {
              const isSelected = selectedSwatchIndex === idx;
              return (
                <button
                  key={swatch.name}
                  type="button"
                  title={swatch.name}
                  aria-label={`Select ${swatch.name} finish`}
                  aria-pressed={isSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSwatch(product.id, idx);
                  }}
                  className={`p-[1px] transition-transform duration-150 cursor-pointer focus-visible:outline-1 focus-visible:outline-[#111111] ${
                    isSelected ? 'scale-110' : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <BowtieMark className="w-[11px] h-[7px] block" color={swatch.hex} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
};
