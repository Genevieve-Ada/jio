import React from 'react';

interface BowtieMarkProps {
  className?: string;
  color?: string;
}

/**
 * Concave architectural bowtie emblem used across the HOME DECOR wordmark
 * and miniature product finish swatches.
 */
export const BowtieMark: React.FC<BowtieMarkProps> = ({ className = 'w-5 h-3', color }) => (
  <svg
    viewBox="0 0 40 24"
    fill={color ?? 'currentColor'}
    className={className}
    aria-hidden="true"
  >
    <path d="M0 0 C11 5.5, 29 5.5, 40 0 L40 24 C29 18.5, 11 18.5, 0 24 Z" />
  </svg>
);

interface BrandWordmarkProps {
  size?: 'nav' | 'footer';
  className?: string;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({ size = 'nav', className = '' }) => {
  if (size === 'footer') {
    return (
      <span
        className={`inline-flex items-center gap-2.5 sm:gap-3.5 font-serif uppercase tracking-[-0.02em] leading-none font-medium select-none whitespace-nowrap ${className}`}
      >
        <span>HOME</span>
        <BowtieMark className="w-[0.92em] h-[0.58em] shrink-0 translate-y-[0.02em]" />
        <span>DECOR</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-serif uppercase tracking-[0.02em] leading-none font-semibold text-[18px] sm:text-[20px] select-none whitespace-nowrap ${className}`}
    >
      <span>HOME</span>
      <BowtieMark className="w-[18px] h-[11px] shrink-0" />
      <span>DECOR</span>
    </span>
  );
};
