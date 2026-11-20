import React, { useState } from 'react';
import { ARTISAN_CHAIR_PRODUCT, Product } from '../data/products';
import { BowtieMark } from './BowtieMark';

interface ArtisanBannerProps {
  onShopNow: (product: Product) => void;
}

export const ArtisanBanner: React.FC<ArtisanBannerProps> = ({ onShopNow }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="artisan-spotlight"
      aria-label="Featured handcrafted piece: Artisan Wooden Chair"
      className="my-12 sm:my-16 bg-[#F5F46E] p-4 sm:p-5 lg:p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
        {/* Left Editorial Column */}
        <div className="lg:col-span-4 flex flex-col justify-between p-2 sm:p-4 lg:py-3 lg:pl-4 lg:pr-1">
          <div>
            <h2 className="font-serif text-[32px] sm:text-[36px] leading-[1.08] font-medium tracking-[-0.015em] text-[#111111]">
              Artisan
            </h2>
            <p className="font-sans text-[26px] sm:text-[30px] leading-[1.15] font-normal tracking-[-0.015em] text-[#111111] mt-0.5">
              Wooden Chair
            </p>
          </div>

          <div className="mt-10 lg:mt-24">
            <p className="text-[13px] leading-[1.55] font-normal text-[#1E1E1E] max-w-[295px]">
              Add a touch of handmade charm to your home with this sturdy, eco-friendly wooden
              chair. Perfect for any room, crafted with care from sustainable wood.
            </p>
            <button
              type="button"
              onClick={() => onShopNow(ARTISAN_CHAIR_PRODUCT)}
              className="mt-5 inline-flex items-center justify-center px-7 py-2.5 border border-[#1A1A1A] bg-transparent text-[#111111] text-[13px] font-normal rounded-[2px] hover:bg-[#111111] hover:text-[#F5F46E] transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Full-Bleed Artisan Photography */}
        <div
          onClick={() => onShopNow(ARTISAN_CHAIR_PRODUCT)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onShopNow(ARTISAN_CHAIR_PRODUCT);
            }
          }}
          aria-label="View Artisan Wooden Chair details"
          className="lg:col-span-8 relative overflow-hidden bg-[#E7E36A] min-h-[290px] sm:min-h-[420px] lg:min-h-[530px] cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          {!imgError ? (
            <img
              src={ARTISAN_CHAIR_PRODUCT.image}
              alt="Artisan craftswoman hand-finishing a curved wooden chair frame in natural studio light"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="lg:absolute lg:inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-[#111111]">
              <BowtieMark className="w-10 h-6 mb-3" />
              <span className="font-serif text-xl">Artisan Wooden Chair</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
