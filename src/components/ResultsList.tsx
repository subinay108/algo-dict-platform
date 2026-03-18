import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

export type Result = {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  highlighted?: boolean;
};

type Props = {
  items: Result[];
  pageSize?: number;
};

const ResultsList: React.FC<Props> = ({ items, pageSize = 4 }) => {
  const [page, setPage] = useState(1);

  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const countText = useMemo(() => {
    if (total === 0) return 'No result found';
    if (total === 1) return '1 result found';
    return `${total} results found`;
  }, [total]);

  const go = (p: number) => setPage(Math.min(pages, Math.max(1, p)));

  // Reset page when the items or pageSize change (e.g. new search results)
  useEffect(() => {
    setPage(1);
  }, [items, pageSize]);

  return (
    <div className="w-full max-w-3xl mt-12">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-warm-gray/60">{countText}</div>
        <div className="text-xs text-warm-gray/40">Page {page} / {pages}</div>
      </div>

      <div className="h-64 overflow-y-auto no-scrollbar space-y-1">
        {paged.map((it) => (
          <Link key={it.id} to={`/algodeck/${it.id}`} className={`flex items-center justify-between p-4 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer group transition-colors ${it.highlighted ? 'border-l-4 border-primary bg-primary/5' : ''}`}>
            <div className="flex flex-1 flex-col items-start">
              <span className="text-xl font-medium text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">{it.title}</span>
              {it.description && <span className="text-xs text-left text-warm-gray/60 text-ellipsis">{it.description}</span>}
            </div>
            <div className="flex items-center gap-4">
              {it.badge && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent-pink/10 text-accent-pink uppercase">{it.badge}</span>}
              <span className="material-symbols-outlined text-warm-gray/20 group-hover:text-primary">arrow_forward_ios</span>
            </div>
          </Link>
        ))}

        {total === 0 && (
          <div className="p-6 text-center text-warm-gray/60">No algorithms match your search.</div>
        )}
      </div>

      <Pagination pages={pages} page={page} onPageChange={go} siblingCount={1} />
    </div>
  );
};

export default ResultsList;
