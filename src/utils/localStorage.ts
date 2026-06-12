import type { UserPreferences } from '../types/job'

const PREFERENCES_STORAGE_KEY = 'jobmatch-preferences'

const defaultPreferences: UserPreferences = {
  preferredCountry: '',
  preferredLanguage: '',
  preferredModality: '',
}

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  const storedValue = localStorage.getItem(key)

  if (!storedValue) {
    return defaultValue
  }

  try {
    return JSON.parse(storedValue) as T
  } catch {
    return defaultValue
  }
}

export function saveToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getStoredPreferences(): UserPreferences {
  return getFromLocalStorage<UserPreferences>(
    PREFERENCES_STORAGE_KEY,
    defaultPreferences,
  )
}

export function savePreferences(preferences: UserPreferences) {
  saveToLocalStorage(PREFERENCES_STORAGE_KEY, preferences)
}