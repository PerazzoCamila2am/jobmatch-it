import { useState } from 'react'

type SkillFormProps = {
  skills: string[]
  onAddSkill: (skill: string) => void
  onRemoveSkill: (skill: string) => void
}

function SkillForm({ skills, onAddSkill, onRemoveSkill }: SkillFormProps) {
  const [skillInput, setSkillInput] = useState('')

  const handleAddSkill = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newSkill = skillInput.trim()

    if (newSkill === '') {
      return
    }

    onAddSkill(newSkill)
    setSkillInput('')
  }

  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-6 rounded-4x1 border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            Perfil técnico
          </span>

          <h2 className="mt-4 text-2xl font-bold text-white">
            Tus habilidades
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Cargá tu stack actual para comparar tu perfil con las ofertas
            laborales y generar recomendaciones.
          </p>
        </div>

        <div>
          <form onSubmit={handleAddSkill} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={skillInput}
              onChange={(event) => setSkillInput(event.target.value)}
              placeholder="Ej: React, TypeScript, SQL..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Agregar
            </button>
          </form>

          <div className="mt-5">
            {skills.length === 0 ? (
              <p className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-500">
                Todavía no cargaste habilidades.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200"
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() => onRemoveSkill(skill)}
                      className="text-slate-500 transition hover:text-red-400"
                      aria-label={`Eliminar ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillForm