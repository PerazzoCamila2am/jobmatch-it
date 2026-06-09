import type { Job } from '../types/job'
import { getJobSkills } from '../utils/skillDetector'

type ArbeitnowJob = {
  slug: string
  company_name: string
  title: string
  description: string
  remote: boolean
  url: string
  tags: string[]
  job_types: string[]
  location: string
  created_at: number
}

type ArbeitnowApiResponse = {
  data: ArbeitnowJob[]
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

function mapArbeitnowJobToJob(arbeitnowJob: ArbeitnowJob): Job {
  const cleanDescription = stripHtml(arbeitnowJob.description)

  const textForAnalysis = `
    ${arbeitnowJob.title}
    ${arbeitnowJob.company_name}
    ${arbeitnowJob.tags.join(' ')}
    ${arbeitnowJob.job_types.join(' ')}
    ${cleanDescription}
  `

  const detectedSkills = getJobSkills(arbeitnowJob.tags, textForAnalysis)

  return {
    id: Number(`2${arbeitnowJob.created_at}`),
    title: arbeitnowJob.title,
    company: arbeitnowJob.company_name,
    location: arbeitnowJob.location || 'Worldwide',
    level: detectLevel(textForAnalysis),
    modality: arbeitnowJob.remote ? 'Remoto' : 'Presencial',
    description: cleanDescription.slice(0, 450),
    requiredSkills: detectedSkills,
    url: arbeitnowJob.url,
    source: 'Arbeitnow',
  }
}

export async function getArbeitnowJobs(): Promise<Job[]> {
  const response = await fetch('https://www.arbeitnow.com/api/job-board-api')

  if (!response.ok) {
    throw new Error('No se pudieron cargar las ofertas de Arbeitnow')
  }

  const data = (await response.json()) as ArbeitnowApiResponse

  return data.data.slice(0, 20).map(mapArbeitnowJobToJob)
}