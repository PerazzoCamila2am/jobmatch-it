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
    keywords: ['next.js', 'nextjs', 'next'],
  },
  {
    name: 'Tailwind',
    keywords: ['tailwind', 'tailwind css'],
  },
  {
    name: 'Node.js',
    keywords: ['node.js', 'nodejs', 'node'],
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
    keywords: ['rest api', 'api rest', 'restful', 'apis rest', 'api'],
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

export function detectSkillsFromText(text: string): string[] {
  const normalizedText = text.toLowerCase()

  const detectedSkills = skillKeywords
    .filter((skill) =>
      skill.keywords.some((keyword) => normalizedText.includes(keyword)),
    )
    .map((skill) => skill.name)

  return detectedSkills
}