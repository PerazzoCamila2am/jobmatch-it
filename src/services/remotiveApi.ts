import type { Job } from '../types/job'
import { getJobSkills } from '../utils/skillDetector'

type RemotiveJob = {
  id: number
  url: string
  title: string
  company_name: string
  candidate_required_location: string
  job_type: string
  category: string
  tags: string[]
  description: string
  publication_date: string
}

type RemotiveApiResponse = {
  jobs: RemotiveJob[]
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

  if (
    normalizedText.includes('senior') ||
    normalizedText.includes('sr')
  ) {
    return 'Senior'
  }

  return 'Junior'
}

function mapRemotiveJobToJob(remotiveJob: RemotiveJob): Job {
  const cleanDescription = stripHtml(remotiveJob.description)

  const textForAnalysis = `
    ${remotiveJob.title}
    ${remotiveJob.category}
    ${remotiveJob.tags.join(' ')}
    ${cleanDescription}
  `

  const detectedSkills = getJobSkills(remotiveJob.tags, textForAnalysis)

  return {
    id: remotiveJob.id,
    title: remotiveJob.title,
    company: remotiveJob.company_name,
    location: remotiveJob.candidate_required_location || 'Worldwide',
    level: detectLevel(textForAnalysis),
    modality: 'Remoto',
    description: cleanDescription.slice(0, 450),
    requiredSkills: detectedSkills,
    url: remotiveJob.url,
    source: 'Remotive',
  }
}

export async function getRemoteJobs(): Promise<Job[]> {
  const response = await fetch(
    'https://remotive.com/api/remote-jobs?category=software-dev',
  )

  if (!response.ok) {
    throw new Error('No se pudieron cargar las ofertas laborales')
  }

  const data = (await response.json()) as RemotiveApiResponse

  return data.jobs.slice(0, 20).map(mapRemotiveJobToJob)
}