import React from 'react';

type Props = {
  pages: number;
  page: number;
  onPageChange: (p: number) => void;
  siblingCount?: number;
};

const DOTS = 'DOTS';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

function getPaginationRange(pages: number, page: number, siblingCount = 1): Array<number | string> {
  const totalPageNumbers = siblingCount * 2 + 5; // first, last, current, two DOTS

  if (pages <= totalPageNumbers) {
    return range(1, pages);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 2);
  const rightSiblingIndex = Math.min(page + siblingCount, pages - 1);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < pages - 1;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, DOTS, pages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(pages - rightItemCount + 1, pages);
    return [1, DOTS, ...rightRange];
  }

  // both sides have dots
  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [1, DOTS, ...middleRange, DOTS, pages];
}

const Pagination: React.FC<Props> = ({ pages, page, onPageChange, siblingCount = 1 }) => {
  if (pages <= 1) return null;

  const paginationRange = getPaginationRange(pages, page, siblingCount);

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded hover:bg-primary/20 text-sm text-warm-gray/60 disabled:opacity-40"
        disabled={page === 1}
      >
        Prev
      </button>

      {paginationRange.map((p, idx) => {
        if (p === DOTS) {
          return (
            <span key={`dots-${idx}`} className="px-3 py-1 text-sm text-warm-gray/60">
              …
            </span>
          );
        }

        const num = p as number;
        const isActive = num === page;
        return (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 rounded text-sm ${isActive ? 'bg-primary text-slate-900' : 'hover:bg-primary/10 text-warm-gray/60'}`}
          >
            {num}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded hover:bg-primary/20 text-sm text-warm-gray/60 disabled:opacity-40"
        disabled={page === pages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
