import type { Job } from '../types/job'
import { getRemoteJobs } from './remotiveApi'
import { getArbeitnowJobs } from './arbeitnowApi'

function removeDuplicatedJobs(jobs: Job[]) {
  const uniqueJobs = jobs.filter((job, index, array) => {
    const normalizedCurrentJob = `${job.title}-${job.company}`.toLowerCase()

    return (
      array.findIndex((currentJob) => {
        const normalizedJob = `${currentJob.title}-${currentJob.company}`.toLowerCase()

        return normalizedJob === normalizedCurrentJob
      }) === index
    )
  })

  return uniqueJobs
}

export async function getJobsFromMultipleSources(): Promise<Job[]> {
  const results = await Promise.allSettled([getRemoteJobs(), getArbeitnowJobs()])

  const successfulJobs = results.flatMap((result) => {
    if (result.status === 'fulfilled') {
      return result.value
    }

    return []
  })

  if (successfulJobs.length === 0) {
    throw new Error('No se pudieron cargar ofertas desde ninguna fuente')
  }

  return removeDuplicatedJobs(successfulJobs).slice(0, 40)
}