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
  if (count >= 4) {
    return 'Alta'
  }

  if (count >= 2) {
    return 'Media'
  }

  return 'Baja'
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
    <section id="learning-plan" className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
          Paso 6
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Plan de aprendizaje recomendado
        </h2>

        <p className="mt-2 text-slate-400">
          La app analiza las tecnologías que más te faltan en las ofertas y te
          sugiere qué reforzar primero.
        </p>
      </div>

      {missingSkillItems.length === 0 ? (
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
          <h3 className="text-xl font-bold text-emerald-200">
            Tu perfil coincide muy bien
          </h3>

          <p className="mt-2 text-slate-300">
            No detectamos tecnologías faltantes en las ofertas analizadas.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {missingSkillItems.map((item) => (
            <article
              key={item.skill}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {item.skill}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Aparece como faltante en {item.count} oferta
                    {item.count !== 1 ? 's' : ''}.
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.priority === 'Alta'
                      ? 'bg-red-500/10 text-red-300'
                      : item.priority === 'Media'
                        ? 'bg-yellow-500/10 text-yellow-300'
                        : 'bg-blue-500/10 text-blue-300'
                  }`}
                >
                  Prioridad {item.priority}
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-300">
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