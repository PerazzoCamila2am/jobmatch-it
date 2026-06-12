import { useMemo, useState } from 'react'
import type { Job, SavedJob } from '../types/job'
import { detectJobLanguage } from '../utils/languageDetector'
import { calculateOpportunityScore } from '../utils/opportunityScore'
import { getJobSkills } from '../utils/skillDetector'
import { calculateJobTrust } from '../utils/trustCalculator'
import FeaturedOpportunity from './FeaturedOpportunity'
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

const JOBS_PER_PAGE = 5

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
  const [selectedTrust, setSelectedTrust] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        const searchValue = searchTerm.toLowerCase().trim()

        const matchesSearch =
          searchValue === '' ||
          job.title.toLowerCase().includes(searchValue) ||
          job.company.toLowerCase().includes(searchValue) ||
          job.description.toLowerCase().includes(searchValue)

        const matchesLevel = selectedLevel === '' || job.level === selectedLevel

        const matchesModality =
          selectedModality === '' || job.modality === selectedModality

        const finalRequiredSkills = getJobSkills(
          job.requiredSkills,
          job.description,
        )

        const matchesSkill =
          selectedSkill === '' ||
          finalRequiredSkills.some(
            (skill) => skill.toLowerCase() === selectedSkill.toLowerCase(),
          )

        const trust = calculateJobTrust(job)

        const matchesTrust =
          selectedTrust === '' || trust.level === selectedTrust

        const matchesCountry =
          selectedCountry === '' ||
          job.location.toLowerCase().includes(selectedCountry.toLowerCase())

        const language = detectJobLanguage(`${job.title} ${job.description}`)

        const matchesLanguage =
          selectedLanguage === '' || language === selectedLanguage

        return (
          matchesSearch &&
          matchesLevel &&
          matchesModality &&
          matchesSkill &&
          matchesTrust &&
          matchesCountry &&
          matchesLanguage
        )
      })
      .sort((a, b) => {
        const opportunityA = calculateOpportunityScore(a, userSkills)
        const opportunityB = calculateOpportunityScore(b, userSkills)

        return opportunityB.score - opportunityA.score
      })
  }, [
    jobs,
    userSkills,
    searchTerm,
    selectedLevel,
    selectedModality,
    selectedSkill,
    selectedTrust,
    selectedCountry,
    selectedLanguage,
  ])

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE)

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE,
  )

  const startResult =
    filteredJobs.length === 0 ? 0 : (currentPage - 1) * JOBS_PER_PAGE + 1

  const endResult = Math.min(currentPage * JOBS_PER_PAGE, filteredJobs.length)

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedLevel('')
    setSelectedModality('')
    setSelectedSkill('')
    setSelectedTrust('')
    setSelectedCountry('')
    setSelectedLanguage('')
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value)
    setCurrentPage(1)
  }

  const handleModalityChange = (value: string) => {
    setSelectedModality(value)
    setCurrentPage(1)
  }

  const handleSkillChange = (value: string) => {
    setSelectedSkill(value)
    setCurrentPage(1)
  }

  const handleTrustChange = (value: string) => {
    setSelectedTrust(value)
    setCurrentPage(1)
  }

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
    setCurrentPage(1)
  }

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    setCurrentPage(1)
  }

  const handlePreviousPage = () => {
    setCurrentPage((currentValue) => Math.max(currentValue - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((currentValue) => Math.min(currentValue + 1, totalPages))
  }

  const savedJobIds = savedJobs.map((job) => job.id)

  return (
    <section id="jobs" className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            Empleos
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white">
            Oportunidades priorizadas
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Las ofertas se ordenan combinando compatibilidad técnica, confianza
            de la fuente e idioma detectado.
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
        selectedTrust={selectedTrust}
        selectedCountry={selectedCountry}
        selectedLanguage={selectedLanguage}
        onSearchChange={handleSearchChange}
        onLevelChange={handleLevelChange}
        onModalityChange={handleModalityChange}
        onSkillChange={handleSkillChange}
        onTrustChange={handleTrustChange}
        onCountryChange={handleCountryChange}
        onLanguageChange={handleLanguageChange}
        onClearFilters={handleClearFilters}
      />

      {isLoading && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-center shadow-xl shadow-black/20">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />

          <h3 className="text-xl font-bold text-white">
            Cargando oportunidades
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Estamos obteniendo empleos remotos desde las fuentes disponibles.
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

      {!isLoading && filteredJobs.length > 0 && (
        <FeaturedOpportunity
          jobs={filteredJobs}
          userSkills={userSkills}
          savedJobIds={savedJobIds}
          onSaveJob={onSaveJob}
        />
      )}

      {!isLoading && (
        <>
          {filteredJobs.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-center shadow-xl shadow-black/20">
              <h3 className="text-xl font-bold text-white">
                No encontramos oportunidades
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Probá limpiar filtros o buscar otra tecnología, país o idioma.
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
            <>
              <div className="mb-4 flex flex-col justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4 sm:flex-row sm:items-center">
                <p className="text-sm text-slate-400">
                  Mostrando{' '}
                  <span className="font-semibold text-white">
                    {startResult}-{endResult}
                  </span>{' '}
                  de{' '}
                  <span className="font-semibold text-white">
                    {filteredJobs.length}
                  </span>{' '}
                  oportunidades
                </p>

                <p className="text-sm text-slate-500">
                  Página {currentPage} de {totalPages}
                </p>
              </div>

              <div className="grid gap-6">
                {paginatedJobs.map((job) => {
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

              {totalPages > 1 && (
                <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:flex-row">
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                      currentPage === 1
                        ? 'cursor-not-allowed border border-slate-800 text-slate-600'
                        : 'border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    Anterior
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1

                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`h-9 w-9 rounded-xl text-sm font-semibold transition ${
                            currentPage === pageNumber
                              ? 'bg-blue-500 text-white'
                              : 'border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                      currentPage === totalPages
                        ? 'cursor-not-allowed border border-slate-800 text-slate-600'
                        : 'border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  )
}

export default JobList