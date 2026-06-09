import { useState } from 'react'
import { detectSkillsFromText } from '../utils/skillDetector'

function DetectedSkillsAnalyzer() {
  const [jobDescription, setJobDescription] = useState('')
  const detectedSkills = detectSkillsFromText(jobDescription)

  return (
    <section id="skill-analyzer" className="mx-auto max-w-7xl px-6 py-8">
      <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div>
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
              Analizador
            </span>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Detectar tecnologías
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-slate-400">
            Pegá una descripción laboral y la app identificará tecnologías
            mencionadas en el texto.
          </p>
        </div>

        <textarea
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          placeholder="Pegá una descripción de empleo..."
          className="min-h-36 w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
        />

        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="mb-3 text-sm font-semibold text-slate-300">
            Tecnologías detectadas
          </p>

          {detectedSkills.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aún no hay tecnologías detectadas.
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
      </div>
    </section>
  )
}

export default DetectedSkillsAnalyzer