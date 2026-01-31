<script lang="ts" setup>
import clsx from 'clsx';
import { useAppStore } from '../config/RedSkillProvider';
import { computed, onMounted, ref } from 'vue';
import questionnaire from '../assets/data/questionnaire.json';
import { darkTheme, Notification, NotificationProgress, Notivue, push, useNotivue } from 'notivue';
import { saveResultRequest } from '../services/results-service';
import type { ResultModel } from '../models/ResultModel';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();
const notifConfig = useNotivue();
const score = ref<number>(0);
const currentQuestionIndex = ref<number>(1);
const currentScore = computed(() => score.value);
const questions = computed(() => questionnaire.liste);
const personalityScores = ref<Record<string, number>>({
    'red': 0,
    'blue': 0,
    'green': 0,
    'yellow': 0
});

// Mapping couleur -> lettre DISC
const colorToDisc: Record<string, string> = {
    'red': 'D',
    'blue': 'I', 
    'green': 'S',
    'yellow': 'C'
};

// Mapping couleur -> personnalité
const colorToPersonality: Record<string, string> = {
    'red': 'Dominant',
    'blue': 'Influent',
    'green': 'Stable',
    'yellow': 'Consciencieux'
};

const chooseOption = (color: string | undefined) => {
    if(!color) return;
    personalityScores.value[color] = (personalityScores.value[color] ?? 0) + 1;
    score.value += 1;
    currentQuestionIndex.value += 1;
}

// Calculer le score en décimal (x/20)
const getScoreDecimal = (color: string): number => {
    return (personalityScores.value[color] ?? 0) / 20;
}

// Vérification que la somme = 1
const getTotalScore = (): number => {
    return Object.values(personalityScores.value).reduce((a, b) => a + b, 0) / 20;
}

// Calculer le profil dominant
const getDominantProfile = () => {
    const scores = personalityScores.value;
    let maxColor = 'red';
    let maxScore = 0;
    
    for (const [color, colorScore] of Object.entries(scores)) {
        if (colorScore > maxScore) {
            maxScore = colorScore;
            maxColor = color;
        }
    }
    return {
        discLetter: colorToDisc[maxColor],
        personality: colorToPersonality[maxColor]
    };
};

const formatDate = (): string => {
    return new Date().toISOString().split('T')[0] ?? '';
};

const completeSurvey = async () => {
    const profile = getDominantProfile();
    
    const resultModel: ResultModel = {
        resultDate: formatDate(),
        profileDisc: profile.discLetter?? '',
        profilePersonality: profile.personality?? '',
        userID: appStore.userID
    };
    
    try {
        await saveResultRequest(appStore.userID, resultModel);
        push.success('Questionnaire complété avec succès !');
        
        // Redirection vers le dashboard après 1.5 secondes
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    } catch (error: any) {
        push.error(error.message || 'Erreur lors de la sauvegarde');
    }
}

onMounted(() => {
    notifConfig.position.value = "top-right"
})

</script>

<template>
    <Notivue v-slot="item">
        <Notification :item="item" :theme="darkTheme">
            <NotificationProgress :item="item"/>
        </Notification>
    </Notivue>
    <div class="flex flex-col min-h-screen gap-y-4 w-full relative bg-slate-600/95 p-8 items-center justify-start">
        <div class="flex max-md:flex-col max-sm:selt-start justify-self-baseline justify-between items-start w-full gap-y-4">
            <h6 class="bg-white rounded p-2 text-slate-800 text-sm italic w-full md:max-w-lg top-4 right-4 max-md:order-2">
                Veuillez compléter ce questionnaire pour mieux comprendre votre profil de personnalité.
            </h6>
            <button
                @click="appStore.logout()"
                :class='clsx(
                    "bg-red-600 text-white p-2 cursor-pointer rounded-lg",
                    "shadow-lg drop-shadow-md hover:shadow-xl hover:drop-shadow-xl/30",
                    "transition-all duration-300 max-md:self-end",
                )'
            >
                Se déconnecter
            </button>
        </div>
        
        <h4 v-if="currentScore < 20" class="font-semibold text-2xl text-white max-md:text-center">
            {{ questions[currentQuestionIndex-1]?.question }}
        </h4>
        <div 
            v-if="currentScore < 20"
            v-for="q in questions" 
            :key="q.numero"
            :class='clsx(
                currentQuestionIndex === q.numero ? "grid" : "hidden",
                "bg-black/40 p-6 rounded-lg grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 gap-8 max-sm:w-full",
            )'
        >
            <div 
                :class='clsx(
                    "max-sm:size-full sm:size-50",
                    "text-white rounded-lg cursor-pointer bg-[#ff8c00]",
                    "transition-all duration-400 hover:bg-[#ff8c00]/90",
                    "hover:bottom-1 hover:right-1",
                    "items-center justify-center p-8 text-shadow-lg/15 text-shadow-black",
                    currentQuestionIndex === q.numero ? "flex" : "hidden"
                )'
                @click="chooseOption('blue')"
            >
                {{ q.options[3]?.texte }}
            </div>
            <div 
                :class='clsx(
                    "max-sm:size-full sm:size-50",
                    "text-white rounded-lg cursor-pointer bg-[#00ced1]",
                    "transition-all duration-200 hover:bg-[#00ced1]/90",
                    "hover:bottom-1 hover:left-1",
                    "items-center justify-center p-8 text-shadow-lg/15 text-shadow-black",
                    currentQuestionIndex === q.numero ? "flex" : "hidden"
                )'
                @click="chooseOption('red')"
            >
                {{q.options[0]?.texte}}
            </div>
            <div 
                :class='clsx(
                    "max-sm:size-full sm:size-50",
                    "text-white rounded-lg cursor-pointer bg-[#8a2be2]",
                    "transition-all duration-200 hover:bg-[#8a2be2]/90",
                    "hover:top-1 hover:right-1",
                    "items-center justify-center p-8 text-shadow-lg/15 text-shadow-black",
                    currentQuestionIndex === q.numero ? "flex" : "hidden"
                )'
                @click="chooseOption('yellow')"
            >
                {{ q.options[1]?.texte }}
            </div>
            <div 
                :class='clsx(
                    "max-sm:size-full sm:size-50",
                    "text-white rounded-lg cursor-pointer bg-[#ff00ff]",
                    "transition-all duration-200 hover:bg-[#ff00ff]/90",
                    "hover:top-1 hover:left-1",
                    "items-center justify-center p-8 text-shadow-lg/15 text-shadow-black",
                    currentQuestionIndex === q.numero ? "flex" : "hidden"
                )'
                @click="chooseOption('green')"
            >
                {{ q.options[2]?.texte }}
            </div>
        </div>
        
        <!-- Conteneur flex pour centrer verticalement le score -->
        <div 
            v-if="currentScore >= 20" 
            class="flex-1 flex items-center justify-center w-full"
        >
            <div class="bg-white p-6 rounded-lg space-y-6 w-full max-w-md">
                <h6 class="text-center text-xl font-semibold text-black space-x-2">
                    <span>Bien joué, votre profil est :</span>
                    <span class="text-indigo-600">{{ getDominantProfile().personality }}</span>
                </h6>

                <!-- Affichage des scores en décimal -->
                <div class="space-y-3">
                    <p class="text-sm text-gray-500 text-center">Score par personnalité</p>

                    <!-- D - Dominant -->
                    <div class="flex items-center gap-3">
                        <span class="w-28 text-sm font-medium">D - Dominant</span>
                        <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div 
                                class="bg-[#00ced1] h-full rounded-full transition-all duration-500"
                                :style="{ width: `${getScoreDecimal('red') * 100}%` }"
                            ></div>
                        </div>
                        <span class="w-12 text-sm text-right">{{ getScoreDecimal('red').toFixed(2) }}</span>
                    </div>

                    <!-- I - Influent -->
                    <div class="flex items-center gap-3">
                        <span class="w-28 text-sm font-medium">I - Influent</span>
                        <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div 
                                class="bg-[#ff8c00] h-full rounded-full transition-all duration-500"
                                :style="{ width: `${getScoreDecimal('blue') * 100}%` }"
                            ></div>
                        </div>
                        <span class="w-12 text-sm text-right">{{ getScoreDecimal('blue').toFixed(2) }}</span>
                    </div>

                    <!-- S - Stable -->
                    <div class="flex items-center gap-3">
                        <span class="w-28 text-sm font-medium">S - Stable</span>
                        <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div 
                                class="bg-[#ff00ff] h-full rounded-full transition-all duration-500"
                                :style="{ width: `${getScoreDecimal('green') * 100}%` }"
                            ></div>
                        </div>
                        <span class="w-12 text-sm text-right">{{ getScoreDecimal('green').toFixed(2) }}</span>
                    </div>

                    <!-- C - Consciencieux -->
                    <div class="flex items-center gap-3">
                        <span class="w-28 text-sm font-medium">C - Consciencieux</span>
                        <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div 
                                class="bg-[#8a2be2] h-full rounded-full transition-all duration-500"
                                :style="{ width: `${getScoreDecimal('yellow') * 100}%` }"
                            ></div>
                        </div>
                        <span class="w-12 text-sm text-right">{{ getScoreDecimal('yellow').toFixed(2) }}</span>
                    </div>

                    <!-- Total (vérification) -->
                    <div class="pt-2 border-t border-gray-200">
                        <p class="text-xs text-gray-400 text-center">
                            Total : {{ getTotalScore().toFixed(2) }}
                        </p>
                    </div>
                </div>

                <button
                    @click="completeSurvey"
                    class="w-full bg-indigo-600 cursor-pointer text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Enregistrer mon profil
                </button>
            </div>
        </div>
    </div>
</template>