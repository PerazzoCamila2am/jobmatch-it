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

function ApplicationsTracker({
  savedJobs,
  onUpdateStatus,
  onRemoveSavedJob,
}: ApplicationsTrackerProps) {
  return (
    <section id="applications" className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
          Paso 3
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Mis postulaciones
        </h2>

        <p className="mt-2 text-slate-400">
          Guardá ofertas y actualizá el estado de cada oportunidad laboral.
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h3 className="text-xl font-bold text-white">
            Todavía no guardaste ofertas
          </h3>

          <p className="mt-2 text-slate-400">
            Cuando guardes una oferta, va a aparecer acá para hacerle
            seguimiento.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {savedJobs.map((job) => (
            <article
              key={job.id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>

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