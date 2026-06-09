import type { Job } from '../types/job'

export const fallbackJobs: Job[] = [
  {
    id: 1001,
    title: 'Frontend Developer Junior',
    company: 'NovaTech Solutions',
    location: 'Argentina / Remoto',
    level: 'Junior',
    modality: 'Remoto',
    description:
      'Buscamos una persona para sumarse al equipo frontend. Trabajará en interfaces web modernas utilizando React, TypeScript, Tailwind CSS, Git y consumo de APIs REST.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://remotive.com/',
    source: 'Fallback demo',
  },
  {
    id: 1002,
    title: 'Desarrollador Web Trainee',
    company: 'Digital Start',
    location: 'LATAM / Remoto',
    level: 'Trainee',
    modality: 'Remoto',
    description:
      'Oportunidad inicial para estudiantes de sistemas con conocimientos en HTML, CSS, JavaScript, Git y buenas prácticas de desarrollo web.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'Git'],
    url: 'https://remotive.com/',
    source: 'Fallback demo',
  },
  {
    id: 1003,
    title: 'Full Stack Developer Junior',
    company: 'CloudBridge',
    location: 'Argentina / Híbrido',
    level: 'Junior',
    modality: 'Híbrido',
    description:
      'El puesto requiere conocimientos de React, Node.js, Express, bases de datos SQL, Git, desarrollo de APIs REST y metodologías ágiles como Scrum.',
    requiredSkills: ['React', 'Node.js', 'Express', 'SQL'],
    url: 'https://remotive.com/',
    source: 'Fallback demo',
  },
  {
    id: 1004,
    title: 'QA Automation Trainee',
    company: 'Bug Hunters',
    location: 'Worldwide / Remoto',
    level: 'Trainee',
    modality: 'Remoto',
    description:
      'Buscamos perfil trainee para testing manual y automatizado. Se valoran conocimientos de JavaScript, Cypress, Git, testing y metodologías ágiles.',
    requiredSkills: ['JavaScript', 'Cypress', 'Git'],
    url: 'https://remotive.com/',
    source: 'Fallback demo',
  },
]