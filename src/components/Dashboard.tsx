import type { SavedJob } from '../types/job'
import { calculateMatchScore } from '../utils/matchCalculator'
import { getJobSkills } from '../utils/skillDetector'

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
            const finalRequiredSkills = getJobSkills(
              job.requiredSkills,
              job.description,
            )

            const { score } = calculateMatchScore(skills, finalRequiredSkills)

            return total + score
          }, 0) / savedJobs.length,
        )

  const stats = [
    {
      label: 'Skills cargadas',
      value: skills.length,
      description: 'Stack actual',
    },
    {
      label: 'Ofertas guardadas',
      value: savedJobs.length,
      description: 'Oportunidades activas',
    },
    {
      label: 'Postulaciones',
      value: appliedJobs.length,
      description: 'Marcadas como enviadas',
    },
    {
      label: 'Match promedio',
      value: `${averageMatch}%`,
      description: 'Sobre ofertas guardadas',
    },
  ]

  return (
    <section id="analysis" className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            Dashboard
          </span>

          <h2 className="mt-4 text-2xl font-bold text-white">
            Resumen de búsqueda
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Métricas principales de tu perfil, ofertas guardadas y avance en el
          proceso de postulación.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20"
          >
            <p className="text-sm text-slate-400">{stat.label}</p>

            <p className="mt-3 text-4xl font-bold text-white">{stat.value}</p>

            <p className="mt-2 text-sm text-slate-500">{stat.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
        <p className="text-sm leading-6 text-slate-400">
          Tenés{' '}
          <span className="font-semibold text-white">{savedJobs.length}</span>{' '}
          oferta{savedJobs.length !== 1 ? 's' : ''} guardada
          {savedJobs.length !== 1 ? 's' : ''},{' '}
          <span className="font-semibold text-white">{appliedJobs.length}</span>{' '}
          postulación{appliedJobs.length !== 1 ? 'es' : ''} enviada
          {appliedJobs.length !== 1 ? 's' : ''} y{' '}
          <span className="font-semibold text-white">{interviewJobs.length}</span>{' '}
          oportunidad{interviewJobs.length !== 1 ? 'es' : ''} en entrevista.
        </p>
      </div>
    </section>
  )
}

export default Dashboard