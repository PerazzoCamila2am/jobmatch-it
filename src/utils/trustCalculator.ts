import type { Job } from '../types/job'
import { getJobSkills } from './skillDetector'

export type TrustLevel = 'Alta' | 'Media' | 'Baja'

export type TrustResult = {
  score: number
  level: TrustLevel
  reasons: string[]
  warnings: string[]
}

const trustedSources = [
  'Remotive',
  'Arbeitnow',
  'Remote OK',
  'Jobicy',
  'Himalayas',
  'Fallback demo',
]

const trustedCompanies = [
  'Mercado Libre',
  'Globant',
  'Accenture',
  'IBM',
  'Microsoft',
  'Google',
  'Amazon',
  'Oracle',
  'Salesforce',
  'SAP',
  'Deloitte',
  'EY',
  'KPMG',
  'PwC',
]

const suspiciousKeywords = [
  'gana dinero rápido',
  'sin experiencia y altos ingresos',
  'inversión inicial',
  'pago por adelantado',
  'comisión únicamente',
  'trabaja 2 horas y gana',
  'dinero fácil',
  'urgente contratar hoy',
]

function hasValidText(value?: string) {
  return Boolean(value && value.trim().length > 0)
}

function hasSuspiciousText(text: string) {
  const normalizedText = text.toLowerCase()

  return suspiciousKeywords.some((keyword) =>
    normalizedText.includes(keyword.toLowerCase()),
  )
}

function getTrustLevel(score: number): TrustLevel {
  if (score >= 75) return 'Alta'
  if (score >= 45) return 'Media'
  return 'Baja'
}

export function calculateJobTrust(job: Job): TrustResult {
  let score = 0
  const reasons: string[] = []
  const warnings: string[] = []

  const finalRequiredSkills = getJobSkills(job.requiredSkills, job.description)

  if (job.source && trustedSources.includes(job.source)) {
    score += 20
    reasons.push('Fuente reconocida')
  } else {
    warnings.push('Fuente poco clara')
  }

  if (hasValidText(job.company)) {
    score += 15
    reasons.push('Empresa identificada')
  } else {
    warnings.push('Empresa no identificada')
  }

  if (job.url) {
    score += 15
    reasons.push('URL original disponible')
  } else {
    warnings.push('No tiene enlace original')
  }

  if (job.description.length >= 300) {
    score += 20
    reasons.push('Descripción completa')
  } else if (job.description.length >= 120) {
    score += 10
    reasons.push('Descripción aceptable')
  } else {
    warnings.push('Descripción demasiado corta')
  }

  if (finalRequiredSkills.length >= 4) {
    score += 15
    reasons.push('Tecnologías detectables')
  } else if (finalRequiredSkills.length >= 2) {
    score += 8
    reasons.push('Algunas tecnologías detectadas')
  } else {
    warnings.push('Pocas tecnologías detectadas')
  }

  if (trustedCompanies.includes(job.company)) {
    score += 10
    reasons.push('Empresa reconocida')
  }

  if (job.title.toLowerCase().includes('developer') || job.title.toLowerCase().includes('engineer')) {
    score += 5
    reasons.push('Título técnico claro')
  }

  if (hasSuspiciousText(`${job.title} ${job.description}`)) {
    score -= 25
    warnings.push('Contiene frases potencialmente sospechosas')
  }

  const normalizedScore = Math.max(0, Math.min(100, score))

  return {
    score: normalizedScore,
    level: getTrustLevel(normalizedScore),
    reasons,
    warnings,
  }
}