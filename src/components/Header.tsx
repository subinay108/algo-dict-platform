
import { useEffect, useState } from 'react';

const Header = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved as 'light' | 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  return (
    <header className="flex items-center justify-between py-8 shrink-0">
      <div className="flex items-center gap-2 group cursor-pointer">
        <span className="material-symbols-outlined text-primary text-3xl!">terminal</span>
        <h1 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight lowercase">algo-dict</h1>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="flex items-center justify-center p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
        >
          <span className="material-symbols-outlined text-warm-gray hover:text-primary">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button className="flex items-center justify-center p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200">
          <span className="material-symbols-outlined text-warm-gray hover:text-primary">settings</span>
        </button>
        <a className="flex items-center justify-center p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200" href="https://github.com/subinay108/algo-dict-platform" target="_blank">
          <svg className="w-6 h-6 fill-warm-gray hover:fill-primary" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
          </svg>
        </a>
      </div>
    </header>
  )
}

export default Header