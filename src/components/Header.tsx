function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 font-bold text-white">
            JM
          </div>

          <div>
            <h1 className="text-base font-bold text-white">JobMatch IT</h1>
            <p className="text-xs text-slate-500">Smart job tracker</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-400 lg:flex">
          <a href="#analysis" className="transition hover:text-white">
            Dashboard
          </a>

          <a href="#jobs" className="transition hover:text-white">
            Empleos
          </a>

          <a href="#learning-plan" className="transition hover:text-white">
            Plan
          </a>

          <a href="#applications" className="transition hover:text-white">
            Postulaciones
          </a>
        </nav>

        <a
          href="#jobs"
          className="hidden rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 sm:inline-flex"
        >
          Buscar empleos
        </a>
      </div>
    </header>
  )
}

export default Header