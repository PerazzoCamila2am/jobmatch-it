type MatchBadgeProps = {
  score: number
}

function MatchBadge({ score }: MatchBadgeProps) {
  const getLabel = () => {
    if (score >= 80) return 'Muy compatible'
    if (score >= 50) return 'Compatible'
    return 'Baja compatibilidad'
  }

  const getClasses = () => {
    if (score >= 80) {
      return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
    }

    if (score >= 50) {
      return 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300'
    }

    return 'border-red-500/40 bg-red-500/10 text-red-300'
  }

  return (
    <div className={`rounded-full border px-3 py-1 text-sm font-semibold ${getClasses()}`}>
      {score}% · {getLabel()}
    </div>
  )
}

export default MatchBadge