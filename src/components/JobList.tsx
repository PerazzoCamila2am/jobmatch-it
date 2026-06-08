import { mockJobs } from '../data/mockJobs'
import JobCard from './JobCard'

type JobListProps = {
  userSkills: string[]
}

function JobList({ userSkills }: JobListProps) {
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
          Por ahora usamos ofertas de prueba. Después las vamos a reemplazar por
          datos reales desde una API de empleos.
        </p>
      </div>

      <div className="grid gap-6">
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} userSkills={userSkills} />
        ))}
      </div>
    </section>
  )
}

export default JobList