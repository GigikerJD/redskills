<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAppStore } from '../config/RedSkillProvider';
import { onMounted, ref } from 'vue';
import type { RegisterModel } from '../models/FormsModel';
import { darkTheme, Notification, NotificationProgress, Notivue, push, useNotivue } from 'notivue';
import { registerRequest } from '../services/users-service';
import redSkillLogo from '../assets/images/RedSkill.jpg';
import clsx from 'clsx';

const router = useRouter();
const appStore = useAppStore();
const notifConfig = useNotivue();
const isLoading = ref<boolean>(false);
const registerForm = ref<RegisterModel>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    birthdate: ''
});

function handleRegister(event: Event): void {
    event.preventDefault();
    if (!registerForm.value.email ||
        !registerForm.value.password ||
        !registerForm.value.firstname ||
        !registerForm.value.lastname ||
        !registerForm.value.birthdate
    ){
        push.error({ message: "Données manquantes...", duration: 2000 });
        return;
    }
    isLoading.value = true;

    const req = registerRequest(registerForm.value);
    req.then(res => {
        push.success({ message: res.data.message, duration: 2000 });
        if ('userID' in res.data){
            appStore.login(res.data.userID);
        }
    })
    .catch(error => {
        push.error({ message: error.data.message, duration: 2000 })
    })
    .finally(() => {
        isLoading.value = false;
    })
}

onMounted(() => {
    notifConfig.position.value = 'top-right'
})
</script>

<template>
    <Notivue v-slot="item">
        <Notification :item="item" :theme="darkTheme">
            <NotificationProgress :item="item"/>
        </Notification>
    </Notivue>

    <div class="flex flex-row min-h-screen w-full">
        <div class="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 bg-gray-500/90">
            <h4 class="text-3xl max-w-125 text-center text-white w-full mb-6 px-2 tracking-tight font-semibold">
                Inscrivez-vous à votre espace RedSkill
            </h4>
            <form
                id="register-form"
                @submit.prevent="handleRegister"
                :class="clsx(
                    'max-w-125 w-full rounded-lg p-8 bg-white',
                    'flex flex-col gap-y-6',
                    'shadow-lg drop-shadow-lg hover:shadow-xl hover:drop-shadow-xl/30',
                    'transition-all duration-250'
                )"
            >
                <div class="flex flex-col justify-between md:flex-row gap-y-6 md:gap-2">
                    <div class="relative">
                        <input
                            id="register-form-firstname" 
                            type="text"
                            v-model="registerForm.firstname"
                            :class='clsx(
                                "border border-slate-600 rounded-lg",
                                "w-full pt-8 pb-3 px-3 focus:outline-none",
                                "hover:ring hover:ring-slate-800",
                                "transition-all duration-200"
                            )'
                        />
                        <label 
                            for="register-form-firstname"
                            class="absolute left-3 top-1.5 text-sm"
                        >
                            Prénom
                        </label>
                    </div>
                    <div class="relative">
                        <input 
                            type="text"
                            id="register-form-lastname"
                            v-model="registerForm.lastname"
                            :class='clsx(
                                "border border-slate-600 rounded-lg",
                                "w-full pt-8 pb-3 px-3 focus:outline-none",
                                "hover:ring hover:ring-slate-800",
                                "transition-all duration-200"
                            )'
                        >
                        <label
                            for="register-form-lastname"
                            class="absolute left-3 top-1.5 text-sm"
                        >
                            Nom de famille
                        </label>
                    </div>
                </div>

                <div class="relative">
                    <input 
                        type="email"
                        v-model="registerForm.email"
                        :class='clsx(
                            "border border-slate-600 rounded-lg",
                            "w-full pt-8 pb-3 px-3 focus:outline-none",
                            "hover:ring hover:ring-slate-800",
                            "transition-all duration-200"
                        )'
                    >
                    <label 
                        for="register-form-email"
                        class="absolute left-3 top-1.5 text-sm"
                    >
                        Email
                    </label>
                </div>
                <div class="relative">
                    <input 
                        type="password"
                        id="register-form-password"
                        v-model="registerForm.password"
                        :class='clsx(
                            "border border-slate-600 rounded-lg",
                            "w-full pt-8 pb-3 px-3 focus:outline-none",
                            "hover:ring hover:ring-slate-800",
                            "transition-all duration-200"
                        )'
                    >
                    <label 
                        for="register-form-password"
                        class="absolute left-3 top-1.5 text-sm"
                    >
                        Mot de passe
                    </label>
                </div>
                <div class="relative">
                    <input
                        id="register-form-birthdate" 
                        type="date"
                        v-model="registerForm.birthdate"
                        :class='clsx(
                            "border border-slate-600 rounded-lg",
                            "w-full pt-8 pb-3 px-3 focus:outline-none",
                            "hover:ring hover:ring-slate-800",
                            "transition-all duration-200"
                        )'
                    >
                    <label 
                        for="register-form-birthdate"
                        class="absolute left-3 top-1.5 text-sm"
                    >
                        Date de naissance
                    </label>
                </div>

                <button 
                    type="submit"
                    :class='clsx(
                        "px-3 py-2 bg-[#d60a01] hover:bg-red-700 rounded-lg",
                        "transition-colors duration-200 text-white cursor-pointer"
                    )'
                >
                    {{ isLoading ? 'Inscription en cours...' : "S'inscrire" }}
                </button>

                <button
                    type="button"
                    @click="router.push('/')"
                    :class='clsx(
                        "rounded-lg py-2 px-4 select-none self-end bg-black text-white cursor-pointer",
                        "text-base shadow-lg drop-shadow-lg hover:drop-shadow-xl/40",
                        "transiton-all duration-200 font-normal hover:scale-95"
                    )'
                >
                    Retour à l'accueil
                </button>
            </form>
        </div>
        <div
            :class='clsx(
                "hidden w-1/2 lg:flex justify-center items-center",
                "bg-transparent bg-contain bg-no-repeat bg-center"
            )'
            :style="{ backgroundImage: `url(${redSkillLogo})` }"
        >
        </div>
    </div>
</template>