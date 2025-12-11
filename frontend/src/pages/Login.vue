<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { LoginModel } from '../models/FormsModel';
import { useAppStore } from '../config/RedSkillProvider';
import { loginRequest } from '../services/users-service';
import { darkTheme, Notification, NotificationProgress, Notivue, push, useNotivue } from 'notivue';

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
        push.error({ message: error.data.message, duration: 2000 });
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
   
    <div class="w-[90%] max-w-[500px] mx-auto flex justify-end">
        <button
            @click="router.push('/')"
            class="flex my-4 rounded-md bg-emerald-400 text-sm font-[Poppins] px-6 py-1.5 cursor-pointer shadow-2xl hover:opacity-90"
        >
            Retour
        </button>
    </div>
    
    <form
        id="login-form"
        @submit.prevent="handleLogin"
        class="w-[90%] sm:max-w-[500px] flex flex-col justify-self-center gap-y-6 rounded-3xl shadow-2xl p-4 sm:p-10 my-10 inset-8 inset-shadow-sm"
    >
        <h3 class="text-center text-3xl sm:text-5xl font-[Poppins] font-bold tracking-tight">Connexion</h3>
        <label 
            for="email-signin-input"
            class="flex flex-col relative grow p-1"
        >
            <input 
                type="email" 
                id="email-signin-input"
                v-model="loginForm.email"
                placeholder="example@mail.com"
                class="border border-neutral-300 rounded-xl px-3 sm:px-4 pt-7 pb-2 focus:outline-none font-[Poppins]"
            >
            <div class="absolute left-4 top-1 sm:left-4.5 sm:top-2">
                <span class="text-xs font-[Poppins]">Adresse email</span>
            </div>
        </label>
        <label 
            for="password-signin-input"
            class="flex flex-col relative grow p-1"
        >
            <input 
                :type="inputType"
                id="password-signin-input"
                v-model="loginForm.password"
                placeholder="*********************"
                class="border border-neutral-300 rounded-xl px-3 sm:px-4 pt-7 pb-2 focus:outline-none font-[Poppins]"
            >
            <div class="absolute left-4 top-1 sm:left-4.5 sm:top-2">
                <span class="text-xs font-[Poppins]">Mot de passe</span>
            </div>
        </label>
        <button 
            type="submit"
            class="rounded-xl bg-emerald-400 py-1.5 mx-1 text-sm font-[Poppins] tracking-tight cursor-pointer hover:opacity-90"
            :disabled="isLoading"
        >
            {{ isLoading ? "Connexion..." : "Se connecter" }}
        </button>
    </form>
</template>