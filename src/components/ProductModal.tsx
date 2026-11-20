import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, Check } from 'lucide-react';
import { Product } from '../data/products';
import { BowtieMark } from './BowtieMark';

interface ProductModalProps {
  product: Product | null;
  initialSwatchIndex: number;
  onClose: () => void;
  onAddToCart: (product: Product, swatchIndex: number, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  initialSwatchIndex,
  onClose,
  onAddToCart,
}) => {
  const [swatchIndex, setSwatchIndex] = useState(initialSwatchIndex);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    setSwatchIndex(initialSwatchIndex);
    setQuantity(1);
    setAddedFeedback(false);
  }, [product, initialSwatchIndex]);

  useEffect(() => {
    if (!product) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const activeSwatch = product.swatches[swatchIndex] ?? product.swatches[0];

  const handleAdd = () => {
    onAddToCart(product, swatchIndex, quantity);
    setAddedFeedback(true);
    window.setTimeout(() => {
      setAddedFeedback(false);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white border border-[#E5E5E5] shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 border border-[#E2E2E2] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Left Gallery Column */}
          <div className="md:col-span-6 bg-[#F3EFEA] relative min-h-[300px] md:min-h-[480px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Quiet unboxed metadata kicker */}
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.06em] text-[#666666]">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.size}</span>
                <span aria-hidden="true">·</span>
                <span>{product.inStock ? 'In Stock' : 'Made to Order'}</span>
              </div>

              <h2
                id="product-modal-title"
                className="font-serif text-[28px] sm:text-[32px] leading-[1.15] font-medium text-[#111111] mt-2"
              >
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-[20px] font-medium text-[#111111] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[12px] text-[#555555]">{product.descriptor}</span>
              </div>

              <p className="mt-5 text-[14px] leading-[1.6] text-[#333333]">
                {product.description}
              </p>

              {/* Finish Selector with Signature Bowtie Swatches */}
              <div className="mt-6 pt-5 border-t border-[#E8E8E8]">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-medium text-[#111111]">Finish</span>
                  <span className="text-[#555555]">{activeSwatch.name}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  {product.swatches.map((swatch, idx) => {
                    const selected = idx === swatchIndex;
                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => setSwatchIndex(idx)}
                        className={`px-3 py-2 border text-[12px] inline-flex items-center gap-2 transition-colors cursor-pointer ${
                          selected
                            ? 'border-[#111111] bg-[#FAF9F6] text-[#111111]'
                            : 'border-[#DCDCDC] bg-white text-[#555555] hover:border-[#888888]'
                        }`}
                      >
                        <BowtieMark className="w-4 h-2.5 shrink-0" color={swatch.hex} />
                        <span className="whitespace-nowrap">{swatch.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specifications Table */}
              <dl className="mt-6 pt-5 border-t border-[#E8E8E8] space-y-2.5 text-[12px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#666666] shrink-0">Materials</dt>
                  <dd className="text-[#1A1A1A] text-right">{product.materials}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#666666] shrink-0">Dimensions</dt>
                  <dd className="text-[#1A1A1A] text-right tabular-nums">{product.dimensions}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#666666] shrink-0">Dispatch</dt>
                  <dd className="text-[#1A1A1A] text-right">{product.leadTime}</dd>
                </div>
              </dl>
            </div>

            {/* Quantity & Primary Purchase CTA */}
            <div className="mt-8 pt-5 border-t border-[#E8E8E8] flex items-center gap-3">
              <div className="flex items-center border border-[#D4D4D4] h-11">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-full flex items-center justify-center text-[#111111] hover:bg-[#F5F5F3] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-[13px] font-medium tabular-nums select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-full flex items-center justify-center text-[#111111] hover:bg-[#F5F5F3] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 h-11 px-6 text-[13px] font-medium transition-colors cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap ${
                  addedFeedback
                    ? 'bg-[#F5F46E] text-[#111111]'
                    : 'bg-[#111111] text-white hover:bg-[#431100]'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
