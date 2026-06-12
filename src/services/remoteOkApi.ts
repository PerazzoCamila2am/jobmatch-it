import type { Job } from '../types/job'
import { getJobSkills } from '../utils/skillDetector'

type RemoteOkJob = {
  id?: number
  position?: string
  company?: string
  location?: string
  description?: string
  tags?: string[]
  url?: string
  apply_url?: string
  date?: string
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

function mapRemoteOkJobToJob(remoteOkJob: RemoteOkJob): Job {
  const cleanDescription = stripHtml(remoteOkJob.description || '')

  const textForAnalysis = `
    ${remoteOkJob.position || ''}
    ${remoteOkJob.company || ''}
    ${(remoteOkJob.tags || []).join(' ')}
    ${remoteOkJob.location || ''}
    ${cleanDescription}
  `

  const detectedSkills = getJobSkills(remoteOkJob.tags || [], textForAnalysis)

  return {
    id: Number(`3${remoteOkJob.id || Date.now()}`),
    title: remoteOkJob.position || 'IT Role',
    company: remoteOkJob.company || 'Empresa no informada',
    location: remoteOkJob.location || 'Worldwide',
    level: detectLevel(textForAnalysis),
    modality: 'Remoto',
    description: cleanDescription.slice(0, 450),
    requiredSkills: detectedSkills,
    url: remoteOkJob.apply_url || remoteOkJob.url,
    source: 'Remote OK',
  }
}

export async function getRemoteOkJobs(): Promise<Job[]> {
  const response = await fetch('https://remoteok.com/api')

  if (!response.ok) {
    throw new Error('No se pudieron cargar las ofertas de Remote OK')
  }

  const data = (await response.json()) as RemoteOkJob[]

  return data
    .filter((item) => item.position && item.company)
    .slice(0, 25)
    .map(mapRemoteOkJobToJob)
}