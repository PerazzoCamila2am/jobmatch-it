import type { Job } from '../types/job'
import { calculateMatchScore } from '../utils/matchCalculator'
import { getJobSkills } from '../utils/skillDetector'

type LearningPlanProps = {
  jobs: Job[]
  userSkills: string[]
}

type MissingSkillItem = {
  skill: string
  count: number
  priority: 'Alta' | 'Media' | 'Baja'
  recommendation: string
}

function getSkillRecommendation(skill: string) {
  const normalizedSkill = skill.toLowerCase()

  if (normalizedSkill === 'typescript') {
    return 'Practicá tipos básicos, interfaces, props en React y funciones tipadas.'
  }

  if (normalizedSkill === 'react') {
    return 'Reforzá componentes, props, estado, eventos, hooks y renderizado de listas.'
  }

  if (normalizedSkill === 'next.js') {
    return 'Aprendé routing, layouts, server/client components y deploy en Vercel.'
  }

  if (normalizedSkill === 'tailwind') {
    return 'Practicá layouts responsive, spacing, grids, flexbox y componentes reutilizables.'
  }

  if (normalizedSkill === 'rest api') {
    return 'Practicá fetch, async/await, manejo de loading, errores y renderizado de datos.'
  }

  if (normalizedSkill === 'node.js') {
    return 'Aprendé a crear servidores simples, rutas, middlewares y conexión con base de datos.'
  }

  if (normalizedSkill === 'sql') {
    return 'Practicá SELECT, INSERT, UPDATE, DELETE, filtros, joins y relaciones entre tablas.'
  }

  if (normalizedSkill === 'testing' || normalizedSkill === 'cypress') {
    return 'Practicá testing de interfaces, flujos de usuario y validaciones.'
  }

  return 'Buscá un proyecto pequeño donde puedas aplicar esta tecnología de forma práctica.'
}

function getPriority(count: number): MissingSkillItem['priority'] {
  if (count >= 4) return 'Alta'
  if (count >= 2) return 'Media'
  return 'Baja'
}

function getPriorityClasses(priority: MissingSkillItem['priority']) {
  if (priority === 'Alta') {
    return 'border-red-500/20 bg-red-500/10 text-red-300'
  }

  if (priority === 'Media') {
    return 'border-yellow-500/20 bg-yellow-500/10 text-yellow-300'
  }

  return 'border-blue-500/20 bg-blue-500/10 text-blue-300'
}

function LearningPlan({ jobs, userSkills }: LearningPlanProps) {
  const missingSkillMap = jobs.reduce<Record<string, number>>((acc, job) => {
    const finalRequiredSkills = getJobSkills(job.requiredSkills, job.description)

    const { missingSkills } = calculateMatchScore(
      userSkills,
      finalRequiredSkills,
    )

    missingSkills.forEach((skill) => {
      acc[skill] = (acc[skill] || 0) + 1
    })

    return acc
  }, {})

  const missingSkillItems: MissingSkillItem[] = Object.entries(missingSkillMap)
    .map(([skill, count]) => ({
      skill,
      count,
      priority: getPriority(count),
      recommendation: getSkillRecommendation(skill),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)

  return (
    <section id="learning-plan" className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            Plan recomendado
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white">
            Qué reforzar primero
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Priorizamos las tecnologías que más aparecen como faltantes en las
            ofertas analizadas.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-right">
          <p className="text-3xl font-bold text-white">{missingSkillItems.length}</p>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            prioridades
          </p>
        </div>
      </div>

      {missingSkillItems.length === 0 ? (
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-10 text-center shadow-xl shadow-black/20">
          <h3 className="text-xl font-bold text-emerald-200">
            Tu perfil está muy bien alineado
          </h3>

          <p className="mt-2 text-sm text-slate-300">
            No detectamos tecnologías faltantes en las ofertas analizadas.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {missingSkillItems.map((item, index) => (
            <article
              key={item.skill}
              className="rounded-3xl border border-slate-800 bg-slate-900/85 p-6 shadow-xl shadow-black/20 transition hover:border-slate-700"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Prioridad #{index + 1}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {item.skill}
                  </h3>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityClasses(
                    item.priority,
                  )}`}
                >
                  {item.priority}
                </span>
              </div>

              <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">
                  Aparece como faltante en
                </p>

                <p className="mt-1 text-3xl font-bold text-white">
                  {item.count}
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    oferta{item.count !== 1 ? 's' : ''}
                  </span>
                </p>
              </div>

              <p className="text-sm leading-6 text-slate-300">
                {item.recommendation}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default LearningPlan