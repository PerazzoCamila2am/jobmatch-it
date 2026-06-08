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