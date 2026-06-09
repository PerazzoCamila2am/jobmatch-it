import type { Job } from '../types/job'
import { calculateMatchScore } from '../utils/matchCalculator'
import { getJobSkills } from '../utils/skillDetector'
import { calculateJobTrust } from '../utils/trustCalculator'
import MatchBadge from './MatchBadge'

type JobCardProps = {
  job: Job
  userSkills: string[]
  isSaved: boolean
  onSaveJob: (job: Job) => void
}

function JobCard({ job, userSkills, isSaved, onSaveJob }: JobCardProps) {
  const finalRequiredSkills = getJobSkills(job.requiredSkills, job.description)

  const { score, matchedSkills, missingSkills, recommendation } =
    calculateMatchScore(userSkills, finalRequiredSkills)

  const trust = calculateJobTrust(job)

  const visibleSkills = finalRequiredSkills.slice(0, 8)
  const hiddenSkillsCount = finalRequiredSkills.length - visibleSkills.length

  const getTrustClasses = () => {
    if (trust.level === 'Alta') {
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
    }

    if (trust.level === 'Media') {
      return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300'
    }

    return 'border-red-500/30 bg-red-500/10 text-red-300'
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/85 shadow-xl shadow-black/20 transition hover:border-slate-700">
      <div className="border-b border-slate-800 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-medium text-slate-300">
                {job.level}
              </span>

              <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-medium text-slate-300">
                {job.modality}
              </span>

              {job.source && (
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                  {job.source}
                </span>
              )}

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getTrustClasses()}`}
              >
                Confianza {trust.level}
              </span>
            </div>

            <h3 className="text-xl font-bold leading-snug text-white">
              {job.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {job.company || 'Empresa no informada'} · {job.location}
            </p>
          </div>

          <div className="shrink-0">
            <MatchBadge score={score} />
          </div>
        </div>

        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">
          {job.description}
        </p>
      </div>

      <div className="space-y-5 p-6">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-200">
              Tecnologías detectadas
            </p>

            <p className="text-xs text-slate-500">
              {finalRequiredSkills.length} skill
              {finalRequiredSkills.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300"
              >
                {skill}
              </span>
            ))}

            {hiddenSkillsCount > 0 && (
              <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-500">
                +{hiddenSkillsCount} más
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-emerald-300">
                Coincidencias
              </p>

              <span className="text-xs text-emerald-300/70">
                {matchedSkills.length}
              </span>
            </div>

            {matchedSkills.length === 0 ? (
              <p className="text-sm text-slate-500">
                No hay coincidencias todavía.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {matchedSkills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200"
                  >
                    {skill}
                  </span>
                ))}

                {matchedSkills.length > 6 && (
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200/70">
                    +{matchedSkills.length - 6}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-red-500/15 bg-red-500/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-red-300">A reforzar</p>

              <span className="text-xs text-red-300/70">
                {missingSkills.length}
              </span>
            </div>

            {missingSkills.length === 0 ? (
              <p className="text-sm text-slate-400">
                Cubrís todas las tecnologías detectadas.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {missingSkills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-200"
                  >
                    {skill}
                  </span>
                ))}

                {missingSkills.length > 6 && (
                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-200/70">
                    +{missingSkills.length - 6}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-4">
          <p className="text-sm font-semibold text-blue-300">Recomendación</p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            {recommendation}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Confianza de la oferta
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Score interno: {trust.score}%
              </p>
            </div>

            <span
              className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${getTrustClasses()}`}
            >
              {trust.level}
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300/80">
                Señales positivas
              </p>

              {trust.reasons.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No se detectaron señales positivas fuertes.
                </p>
              ) : (
                <ul className="space-y-1 text-sm text-slate-400">
                  {trust.reasons.slice(0, 4).map((reason) => (
                    <li key={reason}>• {reason}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-yellow-300/80">
                Alertas
              </p>

              {trust.warnings.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No se detectaron alertas relevantes.
                </p>
              ) : (
                <ul className="space-y-1 text-sm text-slate-400">
                  {trust.warnings.slice(0, 4).map((warning) => (
                    <li key={warning}>• {warning}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Ver oferta
              </a>
            )}

            <button
              type="button"
              onClick={() => onSaveJob(job)}
              disabled={isSaved}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isSaved
                  ? 'cursor-not-allowed border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isSaved ? 'Guardada' : 'Guardar'}
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Match calculado según tu stack actual
          </p>
        </div>
      </div>
    </article>
  )
}

export default JobCard