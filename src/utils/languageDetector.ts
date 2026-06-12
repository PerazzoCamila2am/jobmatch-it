export type JobLanguage = 'Español' | 'Inglés' | 'Alemán' | 'Portugués' | 'Otro'

const spanishWords = [
  'desarrollador',
  'desarrolladora',
  'programador',
  'programadora',
  'remoto',
  'híbrido',
  'presencial',
  'experiencia',
  'requisitos',
  'conocimientos',
  'equipo',
  'empresa',
  'oferta',
  'trabajo',
  'puesto',
  'buscamos',
]

const englishWords = [
  'developer',
  'engineer',
  'remote',
  'hybrid',
  'onsite',
  'experience',
  'requirements',
  'team',
  'company',
  'job',
  'role',
  'position',
  'skills',
  'responsibilities',
  'we are looking',
]

const germanWords = [
  'entwickler',
  'entwicklerin',
  'softwareentwickler',
  'erfahrung',
  'anforderungen',
  'kenntnisse',
  'unternehmen',
  'stelle',
  'arbeit',
  'team',
  'aufgaben',
  'wir suchen',
  'deutschland',
]

const portugueseWords = [
  'desenvolvedor',
  'desenvolvedora',
  'engenheiro',
  'remoto',
  'híbrido',
  'experiência',
  'requisitos',
  'conhecimentos',
  'equipe',
  'empresa',
  'vaga',
  'trabalho',
  'procuramos',
]

function countMatches(text: string, words: string[]) {
  return words.reduce((total, word) => {
    return text.includes(word) ? total + 1 : total
  }, 0)
}

export function detectJobLanguage(text: string): JobLanguage {
  const normalizedText = text.toLowerCase()

  const scores = {
    Español: countMatches(normalizedText, spanishWords),
    Inglés: countMatches(normalizedText, englishWords),
    Alemán: countMatches(normalizedText, germanWords),
    Portugués: countMatches(normalizedText, portugueseWords),
  }

  const highestScore = Math.max(...Object.values(scores))

  if (highestScore === 0) {
    return 'Otro'
  }

  const detectedLanguage = Object.entries(scores).find(
    ([, score]) => score === highestScore,
  )?.[0]

  return (detectedLanguage || 'Otro') as JobLanguage
}