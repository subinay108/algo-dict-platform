import { useEffect, useMemo, useState } from 'react';

import Footer from './Footer';
import Header from './Header';
import ResultsList, { type Result } from './ResultsList';

function Home() {
  const [items, setItems] = useState<Result[]>([]);
    const [query, setQuery] = useState('');
    const [activeLetter, setActiveLetter] = useState<string>('All');

    useEffect(() => {
      fetch('/data/search-index.json')
        .then((res) => res.json())
        .then((data) => {
          const mapped: Result[] = (data || []).map((d: any) => ({
            id: d.slug,
            title: d.name,
            description: d.description,
            badge: d.time_complexity,
          }));
          setItems(mapped);
        })
        .catch(() => setItems([]));
    }, []);

    const letters = useMemo(() => ['All', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))], []);

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      let res = items;
      if (activeLetter !== 'All') {
        const letter = activeLetter.toLowerCase();
        res = res.filter((it) => (it.title || '').charAt(0).toLowerCase() === letter);
      }
      if (!q) return res;
      return res.filter((it) =>
        it.title.toLowerCase().includes(q) || (it.description || '').toLowerCase().includes(q)
      );
    }, [items, query, activeLetter]);

    return (
      <>
        <div className="relative flex flex-col h-full w-full max-w-5xl mx-auto px-6 lg:px-10">
          {/* <!-- Header --> */}
          <Header />
          {/* <!-- Main Content Area --> */}
          <main className="flex flex-1 flex-col justify-between items-center">
            {/* <!-- Search Container --> */}
            <div className="w-full max-w-3xl space-y-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-warm-gray/40 group-focus-within:text-primary transition-colors">search</span>
                </div>
                <input
                  id='search'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="block w-full bg-transparent border-none outline-none focus:ring-0 text-3xl md:text-4xl leading-none font-light text-slate-800 dark:text-slate-200 placeholder-warm-gray/20 pl-14 py-4"
                  placeholder="Search algorithms..."
                  type="text"
                  autoComplete='off'
                />
                <div className="h-0.5 w-full bg-warm-gray/10 group-focus-within:bg-primary transition-all duration-300"></div>
              </div>
              {/* <!-- Alphabet Filter --> */}
              <div className="flex flex-wrap justify-center gap-1 md:gap-2 px-2 no-scrollbar overflow-x-auto">
                {letters.map((letter) => {
                  const isActive = activeLetter === letter;
                  return (
                    <button
                      key={letter}
                      onClick={() => setActiveLetter(letter)}
                      aria-pressed={isActive}
                      className={`px-3 py-1 rounded transition-all text-xs font-medium uppercase tracking-widest ${
                        isActive
                          ? 'bg-primary text-slate-900'
                          : 'hover:bg-primary/20 hover:text-slate-900 text-warm-gray/60'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* <!-- Results Section (Scrollable container within flex) --> */}
            <ResultsList
              items={filtered}
              pageSize={5}
            />
          </main>
          {/* <!-- Footer --> */}
          <Footer />
        </div>
        {/* <!-- Hidden Background Asset for Consistency --> */}
        <div className="hidden">
          <img data-alt="Subtle geometric pattern in warm yellow tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3CN-pBDOF3I6qxfMpat58mt82nzOV17vxsonJ4NitWTyqM9Vy7D5qS1HQlbmkF3adxloBdsWmeAL8uqupLMkyNZkDYGZ1q5zt9q33zTdbhhKlMDNs5iOzIyW2vTdAS3Rz-ySJmuG23lOZovaOqSEDsYVfwh0tKtIwqSIX7oH5qltBvPv96EfcHQraL1wqZwuMkUspeuU7LPVMBICKyARt0uwoZ5mffSR6XTVfLkr7l30EaNf05yKqLeUyxquo9pSAf2NPajUkZw" />
        </div>
      </>
    );
}

export default Home