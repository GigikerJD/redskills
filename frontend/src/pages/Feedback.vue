<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { generateFeedback } from '../services/ai-service'
import clsx from 'clsx'

const router = useRouter()

const user_id = ref<string>('');
const scenario = ref<string | null>(null)
const chosen_answer = ref<string | null>(null)
const other_answer_1 = ref<string | null>(null)
const other_answer_2 = ref<string | null>(null)
const other_answer_3 = ref<string | null>(null)
const target = ref<string | null>(null)

onMounted(async () => {
    const state = history.state as {
        user_id?: string
        scenario?: string
        chosen_answer?: string
        other_answer_1?: string
        other_answer_2?: string
        other_answer_3?: string
        target?: string
    }

    if (!state?.scenario) {
        router.push('/dashboard')
        return
    }

    user_id.value = state.user_id ?? '';
    scenario.value = state.scenario ?? null
    chosen_answer.value = state.chosen_answer ?? null
    other_answer_1.value = state.other_answer_1 ?? null
    other_answer_2.value = state.other_answer_2 ?? null
    other_answer_3.value = state.other_answer_3 ?? null
    target.value = state.target ?? null

    const req = await generateFeedback(
        user_id.value,
        scenario.value,
        chosen_answer.value,
        other_answer_1.value,
        other_answer_2.value,
        other_answer_3.value,
        target.value
    )
    feedback.value = req.feedback ?? null
})



const feedback = ref<string | null>(null)

</script>

<template>
    <div class="min-h-screen bg-slate-50 py-10 px-4">
        <!-- Main feedback container -->
        <div
        class="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10"
        >
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">
                    Feedback
                </h1>
                <p class="text-slate-500 mt-2">
                    Voici un feedback détaillé sur votre choix dans la situation présentée.
                </p>
            </div>

            <!-- Scenario -->
            <div
                class="max-w-4xl mx-auto bg-slate-100 rounded-xl p-6
                        text-slate-800 leading-relaxed text-center
                        whitespace-pre-line"
                >
                {{ feedback ?? 'Votre feedback arrive, patientez...' }}
            </div>


            <!-- Options -->
            <div class="mt-10">
                <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto"
                >
                    <!-- Nouvel Exercice -->
                    <div
                        :class="clsx(
                        baseCardClass,
                        'bg-emerald-500 hover:bg-emerald-500/90'
                        )"
                        @click="router.push('/exercise')"
                    >
                        {{ 'Continuer avec un nouvel exercice' }}
                    </div>

                    <!-- Retour au dashboard -->
                    <div
                        :class="clsx(
                        baseCardClass,
                        'bg-red-600 hover:bg-red-600/90'
                        )"
                        @click="router.push('/dashboard')"
                    >
                        {{'Retourner au menu principal' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
/**
 * Shared card styling extracted for clarity
 * (kept here intentionally to avoid over-componentization)
 */
export const baseCardClass =
  'w-full min-h-[150px] text-white rounded-xl cursor-pointer ' +
  'transition-all duration-300 ease-out ' +
  'flex items-center justify-center p-6 text-center ' +
  'break-words shadow-md ' +
  'hover:shadow-xl hover:-translate-y-1 ' +
  'focus:outline-none focus:ring-2 focus:ring-white/60'

</script>
