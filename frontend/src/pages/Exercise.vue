<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAppStore } from '../config/RedSkillProvider'
import { userData } from '../services/users-service'
import type { UserDataResponse } from '../models/ApiModel'
import { resultRequest } from '../services/results-service'
import { useRouter } from 'vue-router'
import { generateExercise } from '../services/ai-service'
import clsx from 'clsx'

const appStore = useAppStore()
const router = useRouter()

const myUser = ref<UserDataResponse>({
  type: '',
  status: 0,
  message: '',
  user: null
})

const scenario = ref<string | null>(null)
const rep_a = ref<string | null>(null)
const rep_b = ref<string | null>(null)
const rep_c = ref<string | null>(null)
const rep_d = ref<string | null>(null)
const ans_a = ref<string | null>(null)
const ans_b = ref<string | null>(null)
const ans_c = ref<string | null>(null)
const ans_d = ref<string | null>(null)
const target = ref<string | null>(null)

onMounted(async () => {
  const res = await userData(appStore.getUserID)
  myUser.value = res

  const userProfile = await resultRequest(appStore.getUserID)
  if (userProfile.status === 404) {
    router.push('/survey')
    return
  }

  const req = await generateExercise(appStore.getUserID)
  scenario.value = req.scenario ?? null
  target.value = req.personnality ?? null
  rep_a.value = req.rep_a ?? null
  rep_b.value = req.rep_b ?? null
  rep_c.value = req.rep_c ?? null
  rep_d.value = req.rep_d ?? null
})

const chooseOption = (option: string | undefined) => {
    if (!option) return

    switch (option) {
        case 'rep_a':
            ans_a.value = rep_a.value
            ans_b.value = rep_b.value
            ans_c.value = rep_c.value
            ans_d.value = rep_d.value
            break
        case 'rep_b':
            ans_a.value = rep_b.value
            ans_b.value = rep_a.value
            ans_c.value = rep_c.value
            ans_d.value = rep_d.value
            break
        case 'rep_c':
            ans_a.value = rep_c.value
            ans_b.value = rep_b.value
            ans_c.value = rep_a.value
            ans_d.value = rep_d.value
            break
        case 'rep_d':
            ans_a.value = rep_d.value
            ans_b.value = rep_b.value
            ans_c.value = rep_c.value
            ans_d.value = rep_a.value
            break
        default:
            console.log('Unknown option selected')
            return
    }

    router.push({
        path: '/feedback',
        state: {
            user_id: appStore.getUserID,
            scenario: scenario.value,
            chosen_answer: ans_a.value,
            other_answer_1: ans_b.value,
            other_answer_2: ans_c.value,
            other_answer_3: ans_d.value,
            target: target.value
        }
    })
}
</script>

<template>
    <div class="min-h-screen bg-slate-50 py-10 px-4">
        <!-- Main exercise container -->
        <div
        class="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10"
        >
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">
                    Scénario de Communication
                </h1>
                <p class="text-slate-500 mt-2">
                    Lisez la situation attentivement et choisissez la réponse la plus appropriée.
                </p>
            </div>

            <!-- Scenario -->
            <div
                class="max-w-4xl mx-auto bg-slate-100 rounded-xl p-6
                        text-slate-800 leading-relaxed text-center
                        whitespace-pre-line"
                >
                {{ scenario ?? 'Votre exercice arrive, patientez...' }}
            </div>


            <!-- Answers -->
            <div class="mt-10">
                <h2 class="text-center text-lg font-semibold text-slate-700 mb-4">
                    Que faites-vous ?
                </h2>

                <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto"
                >
                    <!-- Option A -->
                    <div
                        :class="clsx(
                        baseCardClass,
                        'bg-[#ff8c00] hover:bg-[#ff8c00]/90'
                        )"
                        @click="chooseOption('rep_a')"
                    >
                        {{ rep_a ?? 'Option 1' }}
                    </div>

                    <!-- Option B -->
                    <div
                        :class="clsx(
                        baseCardClass,
                        'bg-[#00ced1] hover:bg-[#00ced1]/90'
                        )"
                        @click="chooseOption('rep_b')"
                    >
                        {{ rep_b ?? 'Option 2' }}
                    </div>

                    <!-- Option C -->
                    <div
                        :class="clsx(
                        baseCardClass,
                        'bg-[#8a2be2] hover:bg-[#8a2be2]/90'
                        )"
                        @click="chooseOption('rep_c')"
                    >
                        {{ rep_c ?? 'Option 3' }}
                    </div>

                    <!-- Option D -->
                    <div
                        :class="clsx(
                        baseCardClass,
                        'bg-[#ff00ff] hover:bg-[#ff00ff]/90'
                        )"
                        @click="chooseOption('rep_d')"
                    >
                        {{ rep_d ?? 'Option 4' }}
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
