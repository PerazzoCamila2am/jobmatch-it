const skillKeywords = [
  {
    name: 'HTML',
    keywords: ['html', 'html5'],
  },
  {
    name: 'CSS',
    keywords: ['css', 'css3'],
  },
  {
    name: 'JavaScript',
    keywords: ['javascript', 'js'],
  },
  {
    name: 'TypeScript',
    keywords: ['typescript', 'ts'],
  },
  {
    name: 'React',
    keywords: ['react', 'react.js', 'reactjs'],
  },
  {
    name: 'Next.js',
    keywords: ['next.js', 'nextjs'],
  },
  {
    name: 'Tailwind',
    keywords: ['tailwind', 'tailwind css'],
  },
  {
    name: 'Node.js',
    keywords: ['node.js', 'nodejs'],
  },
  {
    name: 'Express',
    keywords: ['express', 'express.js'],
  },
  {
    name: 'SQL',
    keywords: ['sql', 'mysql', 'postgresql', 'postgres'],
  },
  {
    name: 'Git',
    keywords: ['git'],
  },
  {
    name: 'GitHub',
    keywords: ['github'],
  },
  {
    name: 'REST API',
    keywords: ['rest api', 'api rest', 'restful', 'apis rest'],
  },
  {
    name: 'Cypress',
    keywords: ['cypress'],
  },
  {
    name: 'Testing',
    keywords: ['testing', 'tests', 'test'],
  },
  {
    name: 'Scrum',
    keywords: ['scrum'],
  },
  {
    name: 'Firebase',
    keywords: ['firebase'],
  },
  {
    name: 'Supabase',
    keywords: ['supabase'],
  },
]

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function textContainsKeyword(text: string, keyword: string) {
  const escapedKeyword = escapeRegExp(keyword)

  const pattern = new RegExp(
    `(^|[^a-zA-Z0-9])${escapedKeyword}([^a-zA-Z0-9]|$)`,
    'i',
  )

  return pattern.test(text)
}

export function detectSkillsFromText(text: string): string[] {
  return skillKeywords
    .filter((skill) =>
      skill.keywords.some((keyword) => textContainsKeyword(text, keyword)),
    )
    .map((skill) => skill.name)
}

export function mergeSkills(firstSkills: string[], secondSkills: string[]) {
  const allSkills = [...firstSkills, ...secondSkills]

  return allSkills.filter((skill, index, array) => {
    const normalizedSkill = skill.toLowerCase()

    return (
      array.findIndex(
        (currentSkill) => currentSkill.toLowerCase() === normalizedSkill,
      ) === index
    )
  })
}

export function getJobSkills(requiredSkills: string[], description: string) {
  const detectedSkills = detectSkillsFromText(description)

  return mergeSkills(requiredSkills, detectedSkills)
}