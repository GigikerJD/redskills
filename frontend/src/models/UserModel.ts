
export interface User {
    id: string,
    email: string,
    firstname: string,
    lastname: string,
    birthdate: string,
    personality_score?: Record<string, number>,
    simulated_personnality_stats?: Record<string, number>,
    good_answers_count?: Record<string, number>,
    createdAt: string,
    updatedAt: string
}