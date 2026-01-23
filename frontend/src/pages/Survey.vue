<script lang="ts" setup>
import clsx from 'clsx';
import { useAppStore } from '../config/RedSkillProvider';
import { computed, ref } from 'vue';

const appStore = useAppStore();
const score = ref<number>(0);
const currentScore = computed(() => score.value);
const personalityScores = ref<Record<string, number>>({
    'red': 0,
    'blue': 0,
    'green': 0,
    'yellow': 0
});

</script>

<template>
    <div class="flex flex-col min-h-screen gap-y-4 w-full relative justify-center items-center bg-black/95 p-8">
        <h6 class="absolute hidden lg:block bg-white rounded p-2 text-slate-800 font-xs italic max-w-xs top-4 right-4">
            Veuillez compléter ce questionnaire pour mieux comprendre votre profil de personnalité.
        </h6>
        <button
            @click="appStore.logout()"
            :class='clsx(
                "absolute text-white top-4 left-4 p-2",
                "bg-red-600 rounded-lg cursor-pointer"
            )'
        >
            Se déconnecter
        </button>
        
        <h4 class="font-semibold text-2xl text-white">Question : Pourquoi je vous demande cela ?</h4>

        <div v-if="currentScore !== 20" class="bg-white p-6 rounded-lg grid grid-cols-1 grid-rows-4  sm:grid-cols-2 sm:grid-rows-2 gap-8">
            <div 
                :class='clsx(
                    "max-sm:max-w-25 max-sm:max-h-20 max-sm:size-full sm:size-50",
                    "text-white rounded-lg relative cursor-pointer bg-blue-500",
                    "transition-all duration-400 hover:bg-blue-600/90",
                    "hover:bottom-1 hover:right-1"
                )'
            >
                <span class="absolute top-1/2 left-1/2 -translate-1/2 font-semibold text-lg select-none">
                    Réponse 1
                </span>
            </div>
            <div 
                :class='clsx(
                    "max-sm:max-w-25 max-sm:max-h-20 max-sm:size-full sm:size-50",
                    "text-white rounded-lg relative cursor-pointer bg-red-500",
                    "transition-all duration-200 hover:bg-red-600/90",
                    "hover:bottom-1 hover:left-1"
                )'
            >
                <span class="absolute top-1/2 left-1/2 -translate-1/2 font-semibold text-lg select-none">
                    Réponse 2
                </span>
            </div>
            <div 
                :class='clsx(
                    "max-sm:max-w-25 max-sm:max-h-20 max-sm:size-full sm:size-50",
                    "text-white rounded-lg relative cursor-pointer bg-yellow-500",
                    "transition-all duration-200 hover:bg-yellow-600/90",
                    "hover:top-1 hover:right-1"
                )'
            >
                <span class="absolute top-1/2 left-1/2 -translate-1/2 font-semibold text-lg select-none">
                    Réponse 3
                </span>
            </div>
            <div 
                :class='clsx(
                    "max-sm:max-w-25 max-sm:max-h-20 max-sm:size-full sm:size-50",
                    "text-white rounded-lg relative cursor-pointer bg-green-500",
                    "transition-all duration-200 hover:bg-green-600/90",
                    "hover:top-1 hover:left-1"
                )'
            >
                <span class="absolute top-1/2 left-1/2 -translate-1/2 font-semibold text-lg select-none">
                    Réponse 4
                </span>
            </div>
        </div>
        <div v-else class="bg-white p-6">
            <span class="block">
                Score par personnalité : 
                [
                    D: {{ personalityScores['red'] }}, 
                    I: {{ personalityScores['blue'] }}, 
                    S: {{ personalityScores['green'] }}, 
                    C: {{ personalityScores['yellow'] }}
                ]
            </span>
        </div>
    </div>
</template>