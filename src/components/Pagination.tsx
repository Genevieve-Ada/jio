import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Catalog pagination"
      className="mt-14 sm:mt-16 mb-16 sm:mb-20 flex items-center justify-center gap-4 sm:gap-5"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-7 h-7 bg-[#0A0A0A] text-white flex items-center justify-center rounded-[2px] hover:bg-[#431100] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-center gap-1 sm:gap-2 border-b border-[#EAEAEA]">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative px-2.5 pb-2 pt-1 text-[12px] tabular-nums transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] ${
                isActive
                  ? 'text-[#111111] font-semibold'
                  : 'text-[#666666] font-normal hover:text-[#111111]'
              }`}
            >
              {page}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute left-1 right-1 bottom-[-1px] h-[1.5px] bg-[#111111]"
                />
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-7 h-7 bg-[#0A0A0A] text-white flex items-center justify-center rounded-[2px] hover:bg-[#431100] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
};
