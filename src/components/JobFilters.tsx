type JobFiltersProps = {
  searchTerm: string
  selectedLevel: string
  selectedModality: string
  selectedSkill: string
  onSearchChange: (value: string) => void
  onLevelChange: (value: string) => void
  onModalityChange: (value: string) => void
  onSkillChange: (value: string) => void
  onClearFilters: () => void
}

const skillOptions = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Tailwind',
  'REST API',
  'Node.js',
  'Express',
  'SQL',
  'Git',
  'Cypress',
  'Scrum',
  'Testing',
]

function JobFilters({
  searchTerm,
  selectedLevel,
  selectedModality,
  selectedSkill,
  onSearchChange,
  onLevelChange,
  onModalityChange,
  onSkillChange,
  onClearFilters,
}: JobFiltersProps) {
  return (
    <div className="mb-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-white">Filtrar empleos</h3>
        <p className="mt-1 text-sm text-slate-400">
          Buscá ofertas por rol, nivel, modalidad o tecnología.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Buscar
          </label>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Ej: frontend, QA, full stack..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Nivel
          </label>

          <select
            value={selectedLevel}
            onChange={(event) => onLevelChange(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option value="">Todos</option>
            <option value="Trainee">Trainee</option>
            <option value="Junior">Junior</option>
            <option value="Semi Senior">Semi Senior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Modalidad
          </label>

          <select
            value={selectedModality}
            onChange={(event) => onModalityChange(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option value="">Todas</option>
            <option value="Remoto">Remoto</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Presencial">Presencial</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Tecnología
          </label>

          <select
            value={selectedSkill}
            onChange={(event) => onSkillChange(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option value="">Todas</option>

            {skillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={onClearFilters}
        className="mt-5 rounded-xl border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
      >
        Limpiar filtros
      </button>
    </div>
  )
}

export default JobFilters