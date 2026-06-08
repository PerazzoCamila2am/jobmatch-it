import { useMemo, useState } from 'react'
import { mockJobs } from '../data/mockJobs'
import type { Job, SavedJob } from '../types/job'
import JobCard from './JobCard'
import JobFilters from './JobFilters'

type JobListProps = {
  userSkills: string[]
  savedJobs: SavedJob[]
  onSaveJob: (job: Job) => void
}

function JobList({ userSkills, savedJobs, onSaveJob }: JobListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedModality, setSelectedModality] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const searchValue = searchTerm.toLowerCase().trim()

      const matchesSearch =
        searchValue === '' ||
        job.title.toLowerCase().includes(searchValue) ||
        job.company.toLowerCase().includes(searchValue) ||
        job.description.toLowerCase().includes(searchValue)

      const matchesLevel = selectedLevel === '' || job.level === selectedLevel

      const matchesModality =
        selectedModality === '' || job.modality === selectedModality

      const matchesSkill =
        selectedSkill === '' ||
        job.requiredSkills.some(
          (skill) => skill.toLowerCase() === selectedSkill.toLowerCase(),
        )

      return matchesSearch && matchesLevel && matchesModality && matchesSkill
    })
  }, [searchTerm, selectedLevel, selectedModality, selectedSkill])

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
          Paso 2
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Ofertas recomendadas
        </h2>

        <p className="mt-2 text-slate-400">
          Filtrá empleos, analizá compatibilidad y guardá oportunidades para
          hacer seguimiento.
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

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {filteredJobs.length} oferta{filteredJobs.length !== 1 ? 's' : ''}{' '}
          encontrada{filteredJobs.length !== 1 ? 's' : ''}
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
            const isSaved = savedJobs.some((savedJob) => savedJob.id === job.id)

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
    </section>
  )
}

export default JobList