import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillForm from './components/SkillForm'
import JobList from './components/JobList'
import ApplicationsTracker from './components/ApplicationsTracker'
import Dashboard from './components/Dashboard'
import type { ApplicationStatus, Job, SavedJob } from './types/job'
import { getFromLocalStorage, saveToLocalStorage } from './utils/localStorage'

const SKILLS_STORAGE_KEY = 'jobmatch-it-skills'
const SAVED_JOBS_STORAGE_KEY = 'jobmatch-it-saved-jobs'

function App() {
  const [skills, setSkills] = useState<string[]>(() =>
    getFromLocalStorage<string[]>(SKILLS_STORAGE_KEY, [
      'HTML',
      'CSS',
      'JavaScript',
      'Git',
    ]),
  )

  const [savedJobs, setSavedJobs] = useState<SavedJob[]>(() =>
    getFromLocalStorage<SavedJob[]>(SAVED_JOBS_STORAGE_KEY, []),
  )

  useEffect(() => {
    saveToLocalStorage(SKILLS_STORAGE_KEY, skills)
  }, [skills])

  useEffect(() => {
    saveToLocalStorage(SAVED_JOBS_STORAGE_KEY, savedJobs)
  }, [savedJobs])

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

      <Dashboard skills={skills} savedJobs={savedJobs} />

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