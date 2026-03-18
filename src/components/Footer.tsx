
function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-8 shrink-0">
      {/* <div className="flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-gray/40">
        <a className="hover:text-primary transition-colors" href="#">Documentation</a>
        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
        <a className="hover:text-primary transition-colors" href="#">Privacy</a>
        <a className="hover:text-primary transition-colors" href="#">Contact</a>
      </div> */}
      {/* <div className="flex items-center gap-2 text-[10px] text-warm-gray/30">
            <span className="material-symbols-outlined text-xs">keyboard</span>
            <span>Type <span className="bg-warm-gray/10 px-1 rounded">ctrl</span> + <span className="bg-warm-gray/10 px-1 rounded">k</span> to search anywhere</span>
          </div> */}
      <p className="text-[12px] text-warm-gray/50">© 2026 algo-dict — minimal algorithmic dictionary</p>
    </footer>
  )
}

export default Footer