import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillForm from './components/SkillForm'
import JobList from './components/JobList'
import ApplicationsTracker from './components/ApplicationsTracker'
import Dashboard from './components/Dashboard'
import DetectedSkillsAnalyzer from './components/DetectedSkillsAnalyzer'
import LearningPlan from './components/LearningPlan'
import type { ApplicationStatus, Job, SavedJob } from './types/job'
import { getFromLocalStorage, saveToLocalStorage } from './utils/localStorage'
import { getRemoteJobs } from './services/remotiveApi'
import { fallbackJobs } from './data/fallbackJobs'

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

  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoadingJobs, setIsLoadingJobs] = useState(true)
  const [jobsErrorMessage, setJobsErrorMessage] = useState('')
  const [isUsingFallbackJobs, setIsUsingFallbackJobs] = useState(false)

  useEffect(() => {
  let shouldIgnore = false

  const fetchInitialJobs = async () => {
    try {
      const remoteJobs = await getRemoteJobs()

      if (!shouldIgnore) {
        setJobs(remoteJobs)
        setIsUsingFallbackJobs(false)
        setJobsErrorMessage('')
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado al cargar las ofertas'

      if (!shouldIgnore) {
        setJobs(fallbackJobs)
        setIsUsingFallbackJobs(true)
        setJobsErrorMessage(message)
      }
    } finally {
      if (!shouldIgnore) {
        setIsLoadingJobs(false)
      }
    }
  }

  fetchInitialJobs()

  return () => {
    shouldIgnore = true
  }
}, [])

  const loadJobs = async () => {
  setIsLoadingJobs(true)
  setJobsErrorMessage('')

  try {
    const remoteJobs = await getRemoteJobs()

    setJobs(remoteJobs)
    setIsUsingFallbackJobs(false)
    setJobsErrorMessage('')
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Ocurrió un error inesperado al cargar las ofertas'

    setJobs(fallbackJobs)
    setIsUsingFallbackJobs(true)
    setJobsErrorMessage(message)
  } finally {
    setIsLoadingJobs(false)
  }
}

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
    <main className="min-h-screen bg-radial-[circle_at_top,#172554_0,#020617_35%,#020617_100%] text-white">
      <Header />
      <Hero />

      <SkillForm
        skills={skills}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
      />

      <Dashboard skills={skills} savedJobs={savedJobs} />

      <DetectedSkillsAnalyzer />

      <JobList
        jobs={jobs}
        userSkills={skills}
        savedJobs={savedJobs}
        isLoading={isLoadingJobs}
        errorMessage={jobsErrorMessage}
        isUsingFallback={isUsingFallbackJobs}
        onSaveJob={handleSaveJob}
        onRetry={loadJobs}
      />

      <LearningPlan jobs={jobs} userSkills={skills} />

      <ApplicationsTracker
        savedJobs={savedJobs}
        onUpdateStatus={handleUpdateStatus}
        onRemoveSavedJob={handleRemoveSavedJob}
      />
    </main>
  )
}

export default App