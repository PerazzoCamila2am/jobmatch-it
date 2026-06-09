function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div>
          <h1 className="text-xl font-bold text-white">JobMatch IT</h1>
          <p className="text-sm text-slate-400">
            Buscador inteligente de empleos IT
          </p>
        </div>

        <nav className="hidden gap-6 text-sm text-slate-300 sm:flex">
            <a href="#skills" className="transition hover:text-white">
                Mis habilidades
            </a>

            <a href="#analysis" className="transition hover:text-white">
                Dashboard
            </a>

            <a href="#skill-analyzer" className="transition hover:text-white">
                Analizador
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
      </div>
    </header>
  )
}

export default Header