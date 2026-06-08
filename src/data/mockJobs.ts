import type { Job } from '../types/job'

export const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer Junior',
    company: 'NovaTech Solutions',
    location: 'Argentina',
    level: 'Junior',
    modality: 'Remoto',
    description:
      'Buscamos una persona para sumarse al equipo frontend. Trabajará en interfaces web modernas utilizando React, TypeScript, Tailwind CSS y consumo de APIs REST.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind', 'REST API'],
  },
  {
    id: 2,
    title: 'Desarrollador Web Trainee',
    company: 'Digital Start',
    location: 'LATAM',
    level: 'Trainee',
    modality: 'Remoto',
    description:
      'Oportunidad inicial para estudiantes de sistemas con conocimientos en HTML, CSS, JavaScript, Git y buenas prácticas de desarrollo web.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'Git'],
  },
  {
    id: 3,
    title: 'Full Stack Developer Junior',
    company: 'CloudBridge',
    location: 'Argentina',
    level: 'Junior',
    modality: 'Híbrido',
    description:
      'El puesto requiere conocimientos de React, Node.js, Express, bases de datos SQL, Git y desarrollo de APIs.',
    requiredSkills: ['React', 'Node.js', 'Express', 'SQL', 'Git', 'REST API'],
  },
  {
    id: 4,
    title: 'QA Automation Trainee',
    company: 'Bug Hunters',
    location: 'Remoto',
    level: 'Trainee',
    modality: 'Remoto',
    description:
      'Buscamos perfil trainee para testing manual y automatizado. Se valoran conocimientos de JavaScript, Cypress, Git y metodologías ágiles.',
    requiredSkills: ['JavaScript', 'Cypress', 'Git', 'Scrum', 'Testing'],
  },
]