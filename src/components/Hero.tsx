function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div>
        <div className="mb-5 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
          Plataforma inteligente para búsqueda laboral IT
        </div>

        <h2 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Encontrá ofertas que realmente coincidan con tu perfil.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Analizá empleos IT, medí tu compatibilidad, guardá oportunidades y
          descubrí qué tecnologías reforzar para mejorar tus postulaciones.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#jobs"
            className="rounded-xl bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
          >
            Ver empleos
          </a>

          <a
            href="#learning-plan"
            className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            Ver plan recomendado
          </a>
        </div>
      </div>

      <div className="rounded-4x1 border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <p className="text-sm text-slate-500">Match estimado</p>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-5xl font-bold text-white">82%</p>
              <p className="mt-2 text-sm text-emerald-300">Muy compatible</p>
            </div>

            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Frontend Junior
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div>
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>React</span>
                <span>Completado</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div className="h-2 w-full rounded-full bg-blue-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>TypeScript</span>
                <span>En progreso</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div className="h-2 w-2/3 rounded-full bg-blue-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>APIs REST</span>
                <span>Recomendado</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div className="h-2 w-1/2 rounded-full bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero