import type { SavedJob } from '../types/job'
import { calculateMatchScore } from '../utils/matchCalculator'

type DashboardProps = {
  skills: string[]
  savedJobs: SavedJob[]
}

function Dashboard({ skills, savedJobs }: DashboardProps) {
  const appliedJobs = savedJobs.filter((job) => job.status === 'Postulada')
  const interviewJobs = savedJobs.filter((job) => job.status === 'Entrevista')

  const averageMatch =
    savedJobs.length === 0
      ? 0
      : Math.round(
          savedJobs.reduce((total, job) => {
            const { score } = calculateMatchScore(skills, job.requiredSkills)

            return total + score
          }, 0) / savedJobs.length,
        )

  return (
    <section id="analysis" className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
          Resumen
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Dashboard de búsqueda laboral
        </h2>

        <p className="mt-2 text-slate-400">
          Visualizá un resumen rápido de tus habilidades, ofertas guardadas y
          avance en postulaciones.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
          <p className="text-sm text-slate-400">Habilidades cargadas</p>

          <p className="mt-3 text-4xl font-bold text-white">
            {skills.length}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Stack personal cargado en la app.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
          <p className="text-sm text-slate-400">Ofertas guardadas</p>

          <p className="mt-3 text-4xl font-bold text-white">
            {savedJobs.length}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Oportunidades que te interesan.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
          <p className="text-sm text-slate-400">Postulaciones enviadas</p>

          <p className="mt-3 text-4xl font-bold text-white">
            {appliedJobs.length}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Ofertas marcadas como postuladas.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
          <p className="text-sm text-slate-400">Compatibilidad promedio</p>

          <p className="mt-3 text-4xl font-bold text-white">
            {averageMatch}%
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Promedio sobre ofertas guardadas.
          </p>
        </article>
      </div>

      <div className="mt-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
        <h3 className="text-lg font-bold text-white">
          Estado actual
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Tenés {savedJobs.length} oferta{savedJobs.length !== 1 ? 's' : ''}{' '}
          guardada{savedJobs.length !== 1 ? 's' : ''}, {appliedJobs.length}{' '}
          postulación{appliedJobs.length !== 1 ? 'es' : ''} enviada
          {appliedJobs.length !== 1 ? 's' : ''} y {interviewJobs.length}{' '}
          oportunidad{interviewJobs.length !== 1 ? 'es' : ''} en entrevista.
        </p>
      </div>
    </section>
  )
}

export default Dashboard