type MatchResult = {
  score: number
  matchedSkills: string[]
  missingSkills: string[]
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

  const score = Math.round((matchedSkills.length / requiredSkills.length) * 100)

  return {
    score,
    matchedSkills,
    missingSkills,
  }
}