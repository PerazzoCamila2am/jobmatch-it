type MatchResult = {
  score: number
  matchedSkills: string[]
  missingSkills: string[]
  recommendation: string
}

const skillWeights: Record<string, number> = {
  html: 1,
  css: 1,
  javascript: 3,
  typescript: 3,
  react: 3,
  'next.js': 3,
  tailwind: 2,
  'rest api': 2,
  'node.js': 3,
  express: 2,
  sql: 2,
  git: 1,
  github: 1,
  cypress: 2,
  testing: 2,
  scrum: 1,
  firebase: 2,
  supabase: 2,
}

function getSkillWeight(skill: string) {
  const normalizedSkill = skill.toLowerCase()

  return skillWeights[normalizedSkill] ?? 1
}

function getRecommendation(score: number, missingSkills: string[]) {
  if (score >= 85) {
    return 'Excelente match. Esta oferta coincide muy bien con tu perfil.'
  }

  if (score >= 65) {
    return 'Buen match. Podrías postularte y reforzar algunas tecnologías puntuales.'
  }

  if (score >= 40) {
    const firstMissingSkill = missingSkills[0]

    if (firstMissingSkill) {
      return `Match intermedio. Te conviene reforzar ${firstMissingSkill} antes de postularte.`
    }

    return 'Match intermedio. Podrías mejorar algunas habilidades antes de postularte.'
  }

  const firstMissingSkill = missingSkills[0]

  if (firstMissingSkill) {
    return `Baja compatibilidad. Esta oferta parece pedir varias tecnologías que todavía no cargaste, especialmente ${firstMissingSkill}.`
  }

  return 'Baja compatibilidad. Esta oferta no parece coincidir mucho con tus habilidades actuales.'
}

export function calculateMatchScore(
  userSkills: string[],
  requiredSkills: string[],
): MatchResult {
  if (requiredSkills.length === 0) {
    return {
      score: 0,
      matchedSkills: [],
      missingSkills: [],
      recommendation: 'No hay suficientes tecnologías detectadas para calcular compatibilidad.',
    }
  }

  const normalizedUserSkills = userSkills.map((skill) => skill.toLowerCase())

  const matchedSkills = requiredSkills.filter((requiredSkill) =>
    normalizedUserSkills.includes(requiredSkill.toLowerCase()),
  )

  const missingSkills = requiredSkills.filter(
    (requiredSkill) =>
      !normalizedUserSkills.includes(requiredSkill.toLowerCase()),
  )

  const totalPossiblePoints = requiredSkills.reduce((total, skill) => {
    return total + getSkillWeight(skill)
  }, 0)

  const matchedPoints = matchedSkills.reduce((total, skill) => {
    return total + getSkillWeight(skill)
  }, 0)

  const score =
    totalPossiblePoints === 0
      ? 0
      : Math.round((matchedPoints / totalPossiblePoints) * 100)

  return {
    score,
    matchedSkills,
    missingSkills,
    recommendation: getRecommendation(score, missingSkills),
  }
}