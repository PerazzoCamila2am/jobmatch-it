export type Job = {
  id: number
  title: string
  company: string
  location: string
  level: 'Trainee' | 'Junior' | 'Semi Senior' | 'Senior'
  modality: 'Remoto' | 'Híbrido' | 'Presencial'
  description: string
  requiredSkills: string[]
  url?: string
  source?: string
}

export type ApplicationStatus =
  | 'Guardada'
  | 'Postulada'
  | 'Entrevista'
  | 'Prueba técnica'
  | 'Rechazada'

export type SavedJob = Job & {
  status: ApplicationStatus
  savedAt: string
}

export type UserPreferences = {
  preferredCountry: string
  preferredLanguage: string
  preferredModality: string
}