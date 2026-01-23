<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { LoginModel } from '../models/FormsModel';
import { useAppStore } from '../config/RedSkillProvider';
import { loginRequest } from '../services/users-service';
import { darkTheme, Notification, NotificationProgress, Notivue, push, useNotivue } from 'notivue';
import redSkillLogo from '../assets/images/RedSkill.jpg';
import clsx from 'clsx';

const router = useRouter();
const appStore = useAppStore();
const notifConfig = useNotivue();
const inputType = ref<'password' | 'text'>('password');
const isLoading = ref<boolean>(false);
const loginForm = ref<LoginModel>({ email: '', password: '' });
function handleLogin(event: Event): void {
    event.preventDefault();
    if(!loginForm.value.email && !loginForm.value.password){
        push.error({ message: "Données manquantes...", duration: 2000 });
        return;
    }
    isLoading.value = true;
    const req = loginRequest(loginForm.value);
    req.then(res => {
        push.success({ message: res.data.message, duration: 2000 });
        if ('userID' in res.data) {
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
            <h4 class="text-3xl max-w-100 text-center text-white text-shadow-white text-shadow-xs w-full mb-6 px-2 tracking-tight font-semibold">
                Connectez-vous à votre espace RedSkill
            </h4>
            <div 
                :class='clsx(
                    "bg-white max-w-100 w-full flex flex-col justify-center items-center",
                    "p-6 rounded-lg gap-y-4 shadow-lg drop-shadow-lg",
                    "hover:shadow-xl hover:drop-shadow-xl/30",
                    "transition-all duration-200"
                )'
            >
                <form
                    id="login-form"
                    @submit.prevent="handleLogin"
                    class="max-w-100 w-full flex flex-col gap-y-6"
                >
                    <div class="relative">
                        <input
                            id="login-form-email"
                            type="email"
                            v-model="loginForm.email"
                            :class='clsx(
                                "border border-slate-600 rounded-lg",
                                "w-full pt-8 pb-3 px-3 focus:outline-none",
                                "hover:ring hover:ring-slate-800",
                                "transition-all duration-200"
                            )'
                        >
                        <label for="login-form-email" class="absolute left-3 top-1.5 text-sm">
                            Email
                        </label>
                    </div>
                    <div class="relative">
                        <input
                            id="login-form-password"
                            :type="inputType"
                            v-model="loginForm.password"
                            :class='clsx(
                                "border border-slate-600 rounded-lg",
                                "w-full pt-8 pb-3 px-3 focus:outline-none",
                                "hover:ring hover:ring-slate-800",
                                "transition-all duration-200"
                            )'
                        >
                        <label for="login-form-password" class="absolute left-3 top-1.5 text-sm">
                            Mot de passe
                        </label>
                    </div>

                    <button 
                        type="submit"
                        :class='clsx(
                            "px-3 py-2 bg-[#d60a01] hover:bg-red-700 rounded-lg",
                            "transition-colors duration-200 text-white cursor-pointer"
                        )'
                    >
                        {{ isLoading ? "Connexion..." : "Se connecter" }}
                    </button>
                </form>
                <span class="text-sm text-center italic select-none text-gray-600">
                    Vous avez perdu votre mot de passe ? 
                </span>
                <button class="cursor-pointer rounded p-2 select-none hover:underline underline-offset-2 transition-all duration-300">
                    Réinitialise-le !
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
            </div>
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