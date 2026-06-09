import type { Job } from '../types/job'
import { calculateMatchScore } from './matchCalculator'
import { getJobSkills } from './skillDetector'
import { calculateJobTrust } from './trustCalculator'

export type OpportunityResult = {
    score: number
    label: 'Muy recomendada' | 'Recomendada' | 'Revisar' | 'Baja prioridad'
}

function getOpportunityLabel(score: number): OpportunityResult['label'] {
    if (score >= 85) return 'Muy recomendada'
    if (score >= 70) return 'Recomendada'
    if (score >= 50) return 'Revisar'
    return 'Baja prioridad'
}

export function calculateOpportunityScore (
    job: Job,
    userSkills: string[],
): OpportunityResult {
    const finalRequiredSkills = getJobSkills(job.requiredSkills, job.description)

    const match = calculateMatchScore(userSkills, finalRequiredSkills)
    const trust = calculateJobTrust(job)

    const score = Math.round(match.score * 0.65 + trust.score * 0.35)

    return {
        score,
        label: getOpportunityLabel(score),
    }
}