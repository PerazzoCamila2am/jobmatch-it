import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillForm from './components/SkillForm'
import JobList from './components/JobList'
import ApplicationsTracker from './components/ApplicationsTracker'
import type { ApplicationStatus, Job, SavedJob } from './types/job'

function App() {
  const [skills, setSkills] = useState<string[]>([
    'HTML',
    'CSS',
    'JavaScript',
    'Git',
  ])

  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])

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

  const handleSaveJob = (job: Job) => {
    const jobAlreadySaved = savedJobs.some((savedJob) => savedJob.id === job.id)

    if (jobAlreadySaved) {
      return
    }

    const newSavedJob: SavedJob = {
      ...job,
      status: 'Guardada',
      savedAt: new Date().toISOString(),
    }

    setSavedJobs([...savedJobs, newSavedJob])
  }

  const handleUpdateStatus = (
    jobId: number,
    newStatus: ApplicationStatus,
  ) => {
    const updatedSavedJobs = savedJobs.map((job) => {
      if (job.id === jobId) {
        return {
          ...job,
          status: newStatus,
        }
      }

      return job
    })

    setSavedJobs(updatedSavedJobs)
  }

  const handleRemoveSavedJob = (jobId: number) => {
    const updatedSavedJobs = savedJobs.filter((job) => job.id !== jobId)

    setSavedJobs(updatedSavedJobs)
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

      <JobList
        userSkills={skills}
        savedJobs={savedJobs}
        onSaveJob={handleSaveJob}
      />

      <ApplicationsTracker
        savedJobs={savedJobs}
        onUpdateStatus={handleUpdateStatus}
        onRemoveSavedJob={handleRemoveSavedJob}
      />
    </main>
  )
}

export default App