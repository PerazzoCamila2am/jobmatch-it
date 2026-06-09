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
    <section id="jobs" className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            Empleos
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white">
            Ofertas analizadas
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Explorá oportunidades remotas, filtrá por stack y guardá las que
            quieras seguir de cerca.
          </p>
        </div>

        {!isLoading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-right">
            <p className="text-3xl font-bold text-white">{filteredJobs.length}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              resultados
            </p>
          </div>
        )}
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
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-center shadow-xl shadow-black/20">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />

          <h3 className="text-xl font-bold text-white">
            Cargando oportunidades
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Estamos obteniendo empleos remotos desde la API.
          </p>
        </div>
      )}

      {!isLoading && isUsingFallback && (
        <div className="mb-6 rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6 shadow-xl shadow-black/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-yellow-200">
                Mostrando ofertas demo
              </h3>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-yellow-100/80">
                No se pudieron cargar las ofertas reales. La app sigue
                funcionando con datos de respaldo.
              </p>

              {errorMessage && (
                <p className="mt-2 text-xs text-yellow-100/60">
                  Detalle técnico: {errorMessage}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onRetry}
              className="rounded-xl bg-yellow-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-yellow-400"
            >
              Reintentar API
            </button>
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          {filteredJobs.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-center shadow-xl shadow-black/20">
              <h3 className="text-xl font-bold text-white">
                No encontramos ofertas
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Probá limpiar filtros o buscar otra tecnología.
              </p>

              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-5 rounded-xl border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Limpiar filtros
              </button>
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