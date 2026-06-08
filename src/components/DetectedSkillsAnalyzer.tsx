import { useState } from 'react'
import { detectSkillsFromText } from '../utils/skillDetector'

function DetectedSkillsAnalyzer() {
  const [jobDescription, setJobDescription] = useState('')
  const detectedSkills = detectSkillsFromText(jobDescription)

  return (
    <section id="skill-analyzer" className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            Paso 4
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Analizador inteligente de ofertas
          </h2>

          <p className="mt-2 text-slate-400">
            Pegá la descripción de una oferta laboral y la app va a detectar
            automáticamente las tecnologías mencionadas.
          </p>
        </div>

        <textarea
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          placeholder="Ej: Buscamos Junior Frontend Developer con React, TypeScript, Tailwind CSS, Git y consumo de APIs REST..."
          className="min-h-40 w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
        />

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-slate-200">
            Tecnologías detectadas:
          </p>

          {detectedSkills.length === 0 ? (
            <p className="text-sm text-slate-500">
              Todavía no se detectaron tecnologías. Pegá una descripción para
              analizarla.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {detectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-sm font-semibold text-slate-300">
            Ejemplo para probar:
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Buscamos Junior Frontend Developer con conocimientos en HTML, CSS,
            JavaScript, React, TypeScript, Tailwind CSS, Git y consumo de APIs
            REST. Se valoran conocimientos de testing y metodologías ágiles como
            Scrum.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DetectedSkillsAnalyzer