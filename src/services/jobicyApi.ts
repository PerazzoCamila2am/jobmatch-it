import type { Job } from '../types/job'
import { getJobSkills } from '../utils/skillDetector'

type JobicyJob = {
  id?: number
  jobTitle?: string
  companyName?: string
  jobGeo?: string
  jobExcerpt?: string
  jobDescription?: string
  jobIndustry?: string[]
  jobType?: string[]
  jobLevel?: string
  url?: string
  jobSlug?: string
}

type JobicyApiResponse = {
  jobs: JobicyJob[]
}

function stripHtml(html: string) {
  const documentContent = new DOMParser().parseFromString(html, 'text/html')

  return documentContent.body.textContent || ''
}

function detectLevel(text: string): Job['level'] {
  const normalizedText = text.toLowerCase()

  if (
    normalizedText.includes('trainee') ||
    normalizedText.includes('intern') ||
    normalizedText.includes('internship')
  ) {
    return 'Trainee'
  }

  if (
    normalizedText.includes('junior') ||
    normalizedText.includes('jr') ||
    normalizedText.includes('entry level')
  ) {
    return 'Junior'
  }

  if (
    normalizedText.includes('semi senior') ||
    normalizedText.includes('semi-senior') ||
    normalizedText.includes('mid level') ||
    normalizedText.includes('mid-level')
  ) {
    return 'Semi Senior'
  }

  if (normalizedText.includes('senior') || normalizedText.includes('sr')) {
    return 'Senior'
  }

  return 'Junior'
}

function mapJobicyJobToJob(jobicyJob: JobicyJob): Job {
  const cleanDescription = stripHtml(
    jobicyJob.jobDescription || jobicyJob.jobExcerpt || '',
  )

  const textForAnalysis = `
    ${jobicyJob.jobTitle || ''}
    ${jobicyJob.companyName || ''}
    ${(jobicyJob.jobIndustry || []).join(' ')}
    ${(jobicyJob.jobType || []).join(' ')}
    ${jobicyJob.jobLevel || ''}
    ${jobicyJob.jobGeo || ''}
    ${cleanDescription}
  `

  const detectedSkills = getJobSkills(jobicyJob.jobIndustry || [], textForAnalysis)

  return {
    id: Number(`4${jobicyJob.id || Date.now()}`),
    title: jobicyJob.jobTitle || 'IT Role',
    company: jobicyJob.companyName || 'Empresa no informada',
    location: jobicyJob.jobGeo || 'Worldwide',
    level: detectLevel(`${jobicyJob.jobLevel || ''} ${textForAnalysis}`),
    modality: 'Remoto',
    description: cleanDescription.slice(0, 450),
    requiredSkills: detectedSkills,
    url: jobicyJob.url,
    source: 'Jobicy',
  }
}

export async function getJobicyJobs(): Promise<Job[]> {
  const response = await fetch(
    'https://jobicy.com/api/v2/remote-jobs?count=25&industry=dev',
  )

  if (!response.ok) {
    throw new Error('No se pudieron cargar las ofertas de Jobicy')
  }

  const data = (await response.json()) as JobicyApiResponse

  return data.jobs.slice(0, 25).map(mapJobicyJobToJob)
}