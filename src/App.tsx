import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillForm from './components/SkillForm'
import JobList from './components/JobList'

function App() {
  const [skills, setSkills] = useState<string[]>([
    'HTML',
    'CSS',
    'JavaScript',
    'Git',
  ])

  const handleAddSkill = (newSkill: string) => {
    const skillAlreadyExists = skills.some(
      (skill) => skill.toLowerCase() === newSkill.toLowerCase(),
    )

    if (skillAlreadyExists) {
      return
    }

    setSkills([...skills, newSkill])
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove)

    setSkills(updatedSkills)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />
      <Hero />

      <SkillForm
        skills={skills}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
      />

      <JobList userSkills={skills} />
    </main>
  )
}

export default App