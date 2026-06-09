import type { Job } from '../types/job'
import { calculateMatchScore } from '../utils/matchCalculator'
import { calculateOpportunityScore } from '../utils/opportunityScore'
import { getJobSkills } from '../utils/skillDetector'
import { calculateJobTrust } from '../utils/trustCalculator'

type FeaturedOpportunityProps = {
  jobs: Job[]
  userSkills: string[]
  onSaveJob: (job: Job) => void
  savedJobIds: number[]
}

function FeaturedOpportunity({
  jobs,
  userSkills,
  onSaveJob,
  savedJobIds,
}: FeaturedOpportunityProps) {
  if (jobs.length === 0) {
    return null
  }

  const bestJob = [...jobs].sort((a, b) => {
    const opportunityA = calculateOpportunityScore(a, userSkills)
    const opportunityB = calculateOpportunityScore(b, userSkills)

    return opportunityB.score - opportunityA.score
  })[0]

  const finalRequiredSkills = getJobSkills(
    bestJob.requiredSkills,
    bestJob.description,
  )

  const match = calculateMatchScore(userSkills, finalRequiredSkills)
  const trust = calculateJobTrust(bestJob)
  const opportunity = calculateOpportunityScore(bestJob, userSkills)
  const isSaved = savedJobIds.includes(bestJob.id)

  return (
    <div className="mb-6 overflow-hidden rounded-3xl border border-blue-500/20 bg-blue-500/10 shadow-2xl shadow-black/20">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
              Mejor oportunidad
            </span>

            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              {opportunity.label}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white">{bestJob.title}</h3>

          <p className="mt-2 text-sm text-slate-300">
            {bestJob.company || 'Empresa no informada'} · {bestJob.location}
          </p>

          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">
            {bestJob.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {bestJob.url && (
              <a
                href={bestJob.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900"
              >
                Ver oferta
              </a>
            )}

            <button
              type="button"
              onClick={() => onSaveJob(bestJob)}
              disabled={isSaved}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isSaved
                  ? 'cursor-not-allowed border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isSaved ? 'Guardada' : 'Guardar oportunidad'}
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">Opportunity Score</p>
            <p className="mt-2 text-4xl font-bold text-white">
              {opportunity.score}%
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">Match técnico</p>
            <p className="mt-2 text-4xl font-bold text-white">
              {match.score}%
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">Confianza</p>
            <p className="mt-2 text-4xl font-bold text-white">
              {trust.score}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedOpportunity