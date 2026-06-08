import type { Job } from '../types/job'
import { calculateMatchScore } from '../utils/matchCalculator'
import MatchBadge from './MatchBadge'

type JobCardProps = {
  job: Job
  userSkills: string[]
}

function JobCard({ job, userSkills }: JobCardProps) {
  const { score, matchedSkills, missingSkills } = calculateMatchScore(
    userSkills,
    job.requiredSkills,
  )

  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{job.title}</h3>

          <p className="mt-1 text-sm text-slate-400">
            {job.company} · {job.location}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs text-slate-300">
              {job.level}
            </span>

            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs text-slate-300">
              {job.modality}
            </span>
          </div>
        </div>

        <MatchBadge score={score} />
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-300">
        {job.description}
      </p>

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-slate-200">
          Tecnologías requeridas:
        </p>

        <div className="flex flex-wrap gap-2">
          {job.requiredSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Ya cumplís:
          </p>

          {matchedSkills.length === 0 ? (
            <p className="text-sm text-slate-500">Todavía no hay coincidencias.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="mb-3 text-sm font-semibold text-red-300">
            Te faltaría reforzar:
          </p>

          {missingSkills.length === 0 ? (
            <p className="text-sm text-slate-400">
              Tenés todas las tecnologías pedidas.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default JobCard