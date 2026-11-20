import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { CategoryKey } from '../data/products';

export type EditorialTopic = 'about' | 'inspiration' | null;

interface EditorialSheetProps {
  topic: EditorialTopic;
  onClose: () => void;
  onExploreCategory: (cat: CategoryKey) => void;
}

export const EditorialSheet: React.FC<EditorialSheetProps> = ({
  topic,
  onClose,
  onExploreCategory,
}) => {
  useEffect(() => {
    if (!topic) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [topic, onClose]);

  if (!topic) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={topic === 'about' ? 'About Home Decor' : 'Home Decor Inspiration Journal'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white border border-[#E5E5E5] shadow-2xl max-h-[88vh] overflow-y-auto p-7 sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-[#111111] hover:bg-[#F5F5F3] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {topic === 'about' ? (
          <div>
            <p className="text-[11px] uppercase tracking-[0.06em] text-[#666666]">
              Our Story · Crafted to Endure
            </p>
            <h2 className="font-serif text-[32px] leading-[1.15] font-medium text-[#111111] mt-2">
              Honest materials, shaped by human hands.
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#333333]">
              Every piece in the Home Decor collection begins in a small independent workshop. We
              partner directly with ceramicists, woodturners, and textile cooperatives who source
              FSC-certified hardwoods, reclaimed barn oak, raw mineral clays, and unbleached organic
              cotton.
            </p>
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-b border-[#E5E5E5] py-5">
              <div>
                <p className="font-serif text-[26px] text-[#431100] tabular-nums">100%</p>
                <p className="text-[12px] text-[#555555] mt-1">
                  Plastic-free compostable studio packaging across all orders
                </p>
              </div>
              <div>
                <p className="font-serif text-[26px] text-[#431100] tabular-nums">38</p>
                <p className="text-[12px] text-[#555555] mt-1">
                  Independent maker studios across 11 craft disciplines
                </p>
              </div>
              <div>
                <p className="font-serif text-[26px] text-[#431100] tabular-nums">121</p>
                <p className="text-[12px] text-[#555555] mt-1">
                  Small-batch objects curated for timeless domestic spaces
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onExploreCategory('All');
                onClose();
              }}
              className="mt-7 inline-flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white text-[13px] hover:bg-[#431100] transition-colors cursor-pointer"
            >
              <span>Shop All Home Decor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div>
            <p className="text-[11px] uppercase tracking-[0.06em] text-[#666666]">
              Inspiration · Studio Journal
            </p>
            <h2 className="font-serif text-[32px] leading-[1.15] font-medium text-[#111111] mt-2">
              Warm minimalism for quiet rooms.
            </h2>

            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center border-t border-[#E8E8E8] pt-5">
                <img
                  src="/images/sculptural-wooden-lamp.jpg"
                  alt="Sculptural Wooden Lamp warm ambient glow"
                  referrerPolicy="no-referrer"
                  className="sm:col-span-4 w-full h-36 object-cover bg-[#F3EFEA]"
                />
                <div className="sm:col-span-8">
                  <p className="text-[11px] text-[#666666]">01. Lighting &amp; Atmosphere</p>
                  <h3 className="font-serif text-[20px] text-[#111111] mt-1">
                    Layering warm timber and diffused linen light
                  </h3>
                  <p className="text-[13px] text-[#555555] mt-1.5 leading-relaxed">
                    Pair sculptural steam-bent table lamps with low brass taper holders to turn harsh
                    evening glare into soft architectural shadows.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onExploreCategory('Lighting');
                      onClose();
                    }}
                    className="mt-3 text-[12px] font-medium text-[#111111] underline underline-offset-4 hover:text-[#431100] cursor-pointer"
                  >
                    Explore Lighting
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center border-t border-[#E8E8E8] pt-5">
                <img
                  src="/images/ceramic-vase.jpg"
                  alt="Dark stoneware ceramic vase with dried botanicals"
                  referrerPolicy="no-referrer"
                  className="sm:col-span-4 w-full h-36 object-cover bg-[#F3EFEA]"
                />
                <div className="sm:col-span-8">
                  <p className="text-[11px] text-[#666666]">02. Material Contrast</p>
                  <h3 className="font-serif text-[20px] text-[#111111] mt-1">
                    Raw clay vessels beside weathered oak grain
                  </h3>
                  <p className="text-[13px] text-[#555555] mt-1.5 leading-relaxed">
                    Balance smooth glazed necks and matte hand-coiled stoneware against reclaimed
                    wooden stools and botanical rag prints.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onExploreCategory('Wall Art');
                      onClose();
                    }}
                    className="mt-3 text-[12px] font-medium text-[#111111] underline underline-offset-4 hover:text-[#431100] cursor-pointer"
                  >
                    Explore Wall Art &amp; Vessels
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
