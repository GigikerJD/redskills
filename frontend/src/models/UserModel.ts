
export interface User {
    id: string,
    email: string,
    firstname: string,
    lastname: string,
    birthdate: string,
    personalityScore?: Record<string, number>,
    simulatedPersonnalityStats?: Record<string, number>,
    goodAnswersCount?: Record<string, number>,
    createdAt: string,
    updatedAt: string
}