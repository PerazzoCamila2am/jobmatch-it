import { useMemo, useState } from 'react'
import type { Job, SavedJob } from '../types/job'
import { getJobSkills } from '../utils/skillDetector'
import JobCard from './JobCard'
import JobFilters from './JobFilters'

type JobListProps = {
  jobs: Job[]
  userSkills: string[]
  savedJobs: SavedJob[]
  isLoading: boolean
  errorMessage: string
  isUsingFallback: boolean
  onSaveJob: (job: Job) => void
  onRetry: () => void
}

function JobList({
  jobs,
  userSkills,
  savedJobs,
  isLoading,
  errorMessage,
  isUsingFallback,
  onSaveJob,
  onRetry,
}: JobListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedModality, setSelectedModality] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')

  const filteredJobs = useMemo(() => {
  return jobs.filter((job) => {
    const searchValue = searchTerm.toLowerCase().trim()

    const matchesSearch =
      searchValue === '' ||
      job.title.toLowerCase().includes(searchValue) ||
      job.company.toLowerCase().includes(searchValue) ||
      job.description.toLowerCase().includes(searchValue)

    const matchesLevel = selectedLevel === '' || job.level === selectedLevel

    const matchesModality =
      selectedModality === '' || job.modality === selectedModality

    const finalRequiredSkills = getJobSkills(job.requiredSkills, job.description)

    const matchesSkill =
      selectedSkill === '' ||
      finalRequiredSkills.some(
        (skill) => skill.toLowerCase() === selectedSkill.toLowerCase(),
      )

    return matchesSearch && matchesLevel && matchesModality && matchesSkill
  })
}, [jobs, searchTerm, selectedLevel, selectedModality, selectedSkill])
  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedLevel('')
    setSelectedModality('')
    setSelectedSkill('')
  }

  return (
    <section id="jobs" className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
          Paso 5
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Ofertas reales de empleos IT
        </h2>

        <p className="mt-2 text-slate-400">
          Ofertas remotas obtenidas desde Remotive. Cada card se analiza con el
          detector de tecnologías y se compara con tus habilidades.
        </p>
      </div>

      <JobFilters
        searchTerm={searchTerm}
        selectedLevel={selectedLevel}
        selectedModality={selectedModality}
        selectedSkill={selectedSkill}
        onSearchChange={setSearchTerm}
        onLevelChange={setSelectedLevel}
        onModalityChange={setSelectedModality}
        onSkillChange={setSelectedSkill}
        onClearFilters={handleClearFilters}
      />

      {isLoading && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h3 className="text-xl font-bold text-white">
            Cargando ofertas...
          </h3>

          <p className="mt-2 text-slate-400">
            Estamos trayendo oportunidades remotas desde la API.
          </p>
        </div>
      )}

      {!isLoading && isUsingFallback && (
        <div className="mb-6 rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-6">
          <h3 className="text-lg font-bold text-yellow-200">
            Usando ofertas demo
          </h3>

          <p className="mt-2 text-sm leading-6 text-yellow-100/80">
            No se pudieron cargar las ofertas reales desde la API. Para que la
            app siga funcionando, se muestran ofertas de prueba. Podés reintentar
            la carga cuando quieras.
          </p>

          {errorMessage && (
            <p className="mt-2 text-xs text-yellow-100/60">
              Detalle técnico: {errorMessage}
            </p>
          )}

          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-xl bg-yellow-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-yellow-400"
          >
            Reintentar API
          </button>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              {filteredJobs.length} oferta
              {filteredJobs.length !== 1 ? 's' : ''} encontrada
              {filteredJobs.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
              <h3 className="text-xl font-bold text-white">
                No encontramos ofertas con esos filtros
              </h3>

              <p className="mt-2 text-slate-400">
                Probá limpiar los filtros o buscar por otra tecnología.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredJobs.map((job) => {
                const isSaved = savedJobs.some(
                  (savedJob) => savedJob.id === job.id,
                )

                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    userSkills={userSkills}
                    isSaved={isSaved}
                    onSaveJob={onSaveJob}
                  />
                )
              })}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default JobList