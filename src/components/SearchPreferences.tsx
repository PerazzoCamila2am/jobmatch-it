import type { UserPreferences } from '../types/job'

type SearchPreferencesProps = {
  preferences: UserPreferences
  onUpdatePreferences: (preferences: UserPreferences) => void
}

const countryOptions = [
  'Worldwide',
  'Argentina',
  'United States',
  'Europe',
  'Spain',
  'Canada',
  'Germany',
  'United Kingdom',
  'Brazil',
  'Mexico',
]

const languageOptions = ['Español', 'Inglés', 'Alemán', 'Portugués', 'Otro']

const modalityOptions = ['Remoto', 'Híbrido', 'Presencial']

function SearchPreferences({
  preferences,
  onUpdatePreferences,
}: SearchPreferencesProps) {
  const handleCountryChange = (value: string) => {
    onUpdatePreferences({
      ...preferences,
      preferredCountry: value,
    })
  }

  const handleLanguageChange = (value: string) => {
    onUpdatePreferences({
      ...preferences,
      preferredLanguage: value,
    })
  }

  const handleModalityChange = (value: string) => {
    onUpdatePreferences({
      ...preferences,
      preferredModality: value,
    })
  }

  const handleClearPreferences = () => {
    onUpdatePreferences({
      preferredCountry: '',
      preferredLanguage: '',
      preferredModality: '',
    })
  }

  const hasPreferences =
    preferences.preferredCountry ||
    preferences.preferredLanguage ||
    preferences.preferredModality

  return (
    <section id="preferences" className="mx-auto max-w-7xl px-6 py-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
              Preferencias
            </span>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Personalizá tu búsqueda
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Elegí tus preferencias principales para que JobMatch IT pueda
              priorizar oportunidades más alineadas con tu perfil.
            </p>
          </div>

          {hasPreferences && (
            <button
              type="button"
              onClick={handleClearPreferences}
              className="rounded-xl border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Limpiar preferencias
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              País / ubicación preferida
            </label>

            <select
              value={preferences.preferredCountry}
              onChange={(event) => handleCountryChange(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="">Sin preferencia</option>

              {countryOptions.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Idioma preferido
            </label>

            <select
              value={preferences.preferredLanguage}
              onChange={(event) => handleLanguageChange(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="">Sin preferencia</option>

              {languageOptions.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Modalidad preferida
            </label>

            <select
              value={preferences.preferredModality}
              onChange={(event) => handleModalityChange(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="">Sin preferencia</option>

              {modalityOptions.map((modality) => (
                <option key={modality} value={modality}>
                  {modality}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          {hasPreferences ? (
            <p className="text-sm leading-6 text-slate-400">
              Tus preferencias actuales serán usadas para priorizar
              oportunidades más relevantes en el ranking.
            </p>
          ) : (
            <p className="text-sm leading-6 text-slate-500">
              Todavía no seleccionaste preferencias. La app ordenará las ofertas
              usando compatibilidad técnica y confianza de la fuente.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default SearchPreferences