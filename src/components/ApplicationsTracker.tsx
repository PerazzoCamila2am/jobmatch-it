import type { ApplicationStatus, SavedJob } from '../types/job'

type ApplicationsTrackerProps = {
  savedJobs: SavedJob[]
  onUpdateStatus: (jobId: number, status: ApplicationStatus) => void
  onRemoveSavedJob: (jobId: number) => void
}

const statusOptions: ApplicationStatus[] = [
  'Guardada',
  'Postulada',
  'Entrevista',
  'Prueba técnica',
  'Rechazada',
]

function getStatusClasses(status: ApplicationStatus) {
  if (status === 'Guardada') {
    return 'border-slate-600 bg-slate-800 text-slate-300'
  }

  if (status === 'Postulada') {
    return 'border-blue-500/30 bg-blue-500/10 text-blue-300'
  }

  if (status === 'Entrevista') {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
  }

  if (status === 'Prueba técnica') {
    return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300'
  }

  return 'border-red-500/30 bg-red-500/10 text-red-300'
}

function ApplicationsTracker({
  savedJobs,
  onUpdateStatus,
  onRemoveSavedJob,
}: ApplicationsTrackerProps) {
  const appliedJobs = savedJobs.filter((job) => job.status === 'Postulada')
  const interviewJobs = savedJobs.filter((job) => job.status === 'Entrevista')
  const technicalTestJobs = savedJobs.filter(
    (job) => job.status === 'Prueba técnica',
  )

  return (
    <section id="applications" className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            Tracker
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white">
            Mis postulaciones
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Guardá oportunidades y seguí el estado de cada proceso laboral.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:min-w-105">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
            <p className="text-2xl font-bold text-white">{savedJobs.length}</p>
            <p className="mt-1 text-xs text-slate-500">Guardadas</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
            <p className="text-2xl font-bold text-white">{appliedJobs.length}</p>
            <p className="mt-1 text-xs text-slate-500">Postuladas</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
            <p className="text-2xl font-bold text-white">
              {interviewJobs.length + technicalTestJobs.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">Avanzadas</p>
          </div>
        </div>
      </div>

      {savedJobs.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-center shadow-xl shadow-black/20">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-2xl">
            ☆
          </div>

          <h3 className="text-xl font-bold text-white">
            Todavía no guardaste ofertas
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
            Guardá oportunidades desde la sección de empleos para hacerles
            seguimiento desde acá.
          </p>

          <a
            href="#jobs"
            className="mt-6 inline-flex rounded-xl bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Ver empleos
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {savedJobs.map((job) => (
            <article
              key={job.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/85 p-5 shadow-xl shadow-black/20 transition hover:border-slate-700"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                        job.status,
                      )}`}
                    >
                      {job.status}
                    </span>

                    <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-400">
                      {job.level}
                    </span>

                    <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-400">
                      {job.modality}
                    </span>
                  </div>

                  <h3 className="truncate text-lg font-bold text-white">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {job.company} · {job.location}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Guardada el {new Date(job.savedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <select
                    value={job.status}
                    onChange={(event) =>
                      onUpdateStatus(
                        job.id,
                        event.target.value as ApplicationStatus,
                      )
                    }
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      Ver
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => onRemoveSavedJob(job.id)}
                    className="rounded-xl border border-red-500/30 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ApplicationsTracker