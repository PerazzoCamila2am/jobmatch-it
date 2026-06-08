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
    <section id="skills" className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            Paso 1
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            Cargá tus habilidades
          </h3>

          <p className="mt-2 text-slate-400">
            Estas habilidades se comparan con los requisitos de cada oferta
            laboral.
          </p>
        </div>

        <form onSubmit={handleAddSkill} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={skillInput}
            onChange={(event) => setSkillInput(event.target.value)}
            placeholder="Ej: React, TypeScript, SQL..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />

          <button
            type="submit"
            className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Agregar
          </button>
        </form>

        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-slate-300">
            Tus habilidades:
          </p>

          {skills.length === 0 ? (
            <p className="text-sm text-slate-500">
              Todavía no cargaste ninguna habilidad.
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
    </section>
  )
}

export default SkillForm