import React, { useState } from 'react';
import { ArrowUp, Check } from 'lucide-react';
import { BrandWordmark } from './BowtieMark';
import { CategoryKey } from '../data/products';

interface FooterProps {
  onSelectCategory: (cat: CategoryKey) => void;
  onFilterNewArrivals: () => void;
  onFilterEcoFinds: () => void;
  onOpenStory: () => void;
  onOpenJournal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onFilterNewArrivals,
  onFilterEcoFinds,
  onOpenStory,
  onOpenJournal,
}) => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!agreed) {
      setFormError('Please confirm newsletter consent to subscribe.');
      return;
    }
    setFormError('');
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#431100] text-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-10 lg:px-14 pt-16 sm:pt-20 pb-8">
        {/* Top 3-Column Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-10 pb-16 sm:pb-20">
          {/* Column 1: Stay Inspired Newsletter */}
          <div className="md:col-span-5">
            <h2 className="font-serif text-[30px] sm:text-[34px] leading-[1.1] font-semibold tracking-[-0.01em] text-white">
              Stay Inspired
            </h2>
            <p className="text-[14px] text-white/85 mt-2 font-normal">
              Discover Unique Home Decor Ideas
            </p>

            {subscribed ? (
              <div className="mt-7 p-4 border border-white/25 bg-white/5 max-w-[340px]">
                <div className="flex items-center gap-2 text-[13px] font-medium text-white">
                  <Check className="w-4 h-4 text-[#F5F46E] shrink-0" />
                  <span>You&apos;re subscribed to Home Decor</span>
                </div>
                <p className="text-[12px] text-white/75 mt-1.5 leading-relaxed">
                  Seasonal releases, artisan stories, and studio previews will arrive in your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="mt-6 max-w-[340px]">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError('');
                  }}
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-white/40 focus:border-white py-2 text-[13px] text-white placeholder:text-white/65 outline-none transition-colors"
                />

                <label className="mt-3.5 flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (formError) setFormError('');
                    }}
                    className="w-3.5 h-3.5 accent-[#F5F46E] bg-transparent border border-white/60 rounded-[1px] cursor-pointer"
                  />
                  <span className="text-[11px] text-white/75">
                    I agree to receive newsletters and promotions
                  </span>
                </label>

                {formError && (
                  <p role="alert" className="mt-2 text-[11px] text-[#F5F46E]">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-5 px-9 py-2.5 border border-white/55 text-[12px] font-normal text-white hover:bg-white hover:text-[#431100] transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Column 2: Contact Us */}
          <div className="md:col-span-4 md:pl-6">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.04em] text-white">
              CONTACT US
            </h3>
            <p className="text-[11px] text-white/65 mt-2">Open daily from 9:00 to 18:00</p>

            <div className="mt-4 space-y-1.5 text-[13px] text-white/90">
              <a
                href="tel:+15551234567"
                className="block hover:text-white transition-colors tabular-nums"
              >
                +1 (555) 123-45-67
              </a>
              <a
                href="mailto:hello@homedecor.com"
                className="block hover:text-white transition-colors"
              >
                hello@homedecor.com
              </a>
            </div>

            {/* Social Media Vector Marks */}
            <div className="mt-5 flex items-center gap-4 text-white/90">
              <a
                href="#social-twitter"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenJournal();
                }}
                aria-label="Home Decor on Twitter"
                className="hover:text-[#F5F46E] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="#social-instagram"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenJournal();
                }}
                aria-label="Home Decor on Instagram"
                className="hover:text-[#F5F46E] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>
              <a
                href="#social-linkedin"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenStory();
                }}
                aria-label="Home Decor on LinkedIn"
                className="hover:text-[#F5F46E] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Catalog & Brand Links */}
          <div className="md:col-span-3">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.04em] text-white">
              CATALOG
            </h3>
            <ul className="mt-2.5 space-y-1.5 text-[12px] text-white/75">
              <li>
                <button
                  type="button"
                  onClick={onFilterNewArrivals}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  New Arrivals 2025
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Furniture')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Living Room Decor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onFilterEcoFinds}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Eco-Friendly Finds
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Wall Art')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Handmade Art
                </button>
              </li>
            </ul>

            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={onOpenStory}
                className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-white hover:text-[#F5F46E] transition-colors cursor-pointer"
              >
                OUR STORY
              </button>
              <button
                type="button"
                onClick={onOpenJournal}
                className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-white hover:text-[#F5F46E] transition-colors cursor-pointer"
              >
                BLOG
              </button>
            </div>
          </div>
        </div>

        {/* Middle Monumental Brand Lockup & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 sm:py-9">
          <div className="lg:col-span-6">
            <BrandWordmark
              size="footer"
              className="text-white text-[40px] sm:text-[54px] lg:text-[62px]"
            />
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-white/85 max-w-[490px] lg:ml-auto">
              Discover unique, handpicked decor reflecting your personal style, crafted from
              sustainable materials to protect the planet you love while adding lasting beauty to
              your home.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Go All The Way Up Bar */}
        <div className="border-t border-white/15 pt-6 mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/70">
          <span className="tabular-nums">© 2025</span>
          <span className="uppercase tracking-[0.05em] text-white/60">HOME DECOR STUDIO</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-white hover:text-[#F5F46E] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>GO ALL THE WAY UP</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
