<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAppStore } from '../config/RedSkillProvider';
import { onMounted, ref } from 'vue';
import type { RegisterModel } from '../models/FormsModel';
import { darkTheme, Notification, NotificationProgress, Notivue, push, useNotivue } from 'notivue';
import { registerRequest } from '../services/users-service';

const router = useRouter();
const appStore = useAppStore();
const notifConfig = useNotivue();
const isLoading = ref<boolean>(false);
const confirmPassword = ref<string>("");
const registerForm = ref<RegisterModel>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    birthdate: ''
});

function passwordMatches(first: string, second: string): boolean {
    return first === second
}

function handleRegister(event: Event): void {
    event.preventDefault();
    if (!registerForm.value.email ||
        !registerForm.value.password ||
        !registerForm.value.firstname ||
        !registerForm.value.lastname ||
        !registerForm.value.birthdate ||
        !confirmPassword
    ){
        push.error({ message: "Données manquantes...", duration: 2000 });
        return;
    }
    isLoading.value = true;

    const bothMatches = passwordMatches(registerForm.value.password, confirmPassword.value);
    if (!bothMatches) {
        push.error({ message: "Mots de passe différents", duration: 2000 })
        return;
    }

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

    <div class="w-[80%] max-w-[525px] mx-auto flex justify-end">
        <button
            @click="router.push('/')"
            class="flex my-4 rounded-md bg-emerald-400 text-sm  px-6 py-1.5 cursor-pointer shadow-2xl hover:opacity-90"
        >
            Retour
        </button>
    </div>

    <div class="size-full flex flex-col justify-center items-center">
        <form
            id="signup-form"
            @submit="handleRegister"
            class="w-[80%] sm:max-w-[525px] flex flex-col justify-self-center gap-y-3 sm:gap-y-6 rounded-3xl shadow-2xl p-4 sm:p-10 mt-1 mb-10 inset-8 inset-shadow-sm"
        >
            <h3 class="text-center text-3xl sm:text-5xl font-bold tracking-tight">Inscrivez-vous en un clic !</h3>

            <div class="flex flex-col sm:flex-row sm:justify-between gap-y-3 sm:gap-y-6 gap-x-4">
                <label 
                    for="firstname-signup-input" 
                    class="flex flex-col relative grow sm:w-2/5"
                >
                    <input 
                        type="text"
                        id="firstname-signup-input"
                        placeholder="Votre prénom"
                        v-model="registerForm.firstname"
                        class="border border-neutral-300 rounded-xl px-3 sm:px-4 pt-7 pb-2 focus:outline-none "
                    >
                    <div class="absolute left-4 top-1 sm:left-4.5 sm:top-2">
                        <span class="text-xs">Prénom</span>
                    </div>
                </label>
                <label 
                    for="lastname-signup-input" 
                    class="flex flex-col relative grow sm:w-2/5"
                >
                    <input 
                        type="text"
                        id="lastname-signup-input"
                        placeholder="Votre nom de famille"
                        v-model="registerForm.lastname"
                        class="border border-neutral-300 rounded-xl px-3 sm:px-4 pt-7 pb-2 focus:outline-none "
                    >
                    <div class="absolute left-4 top-1 sm:left-4.5 sm:top-2">
                        <span class="text-xs">Nom de famille</span>
                    </div>
                </label>
            </div>

            <label 
                for="email-signup-input" 
                class="flex flex-col relative grow"
            >
                <input 
                    type="email"
                    id="email-signup-input"
                    placeholder="example@mail.com"
                    v-model="registerForm.email"
                    class="border border-neutral-300 rounded-xl px-3 sm:px-4 pt-7 pb-2 focus:outline-none"
                >
                <div class="absolute left-4 top-1 sm:left-4.5 sm:top-2">
                    <span class="text-xs">Email</span>
                </div>
            </label>

            <label 
                for="password-signup-input" 
                class="flex flex-col relative grow"
            >
                <input 
                    type="password"
                    id="password-signup-input"
                    placeholder="Tapez votre mot de passe"
                    v-model="registerForm.password"
                    class="border border-neutral-300 rounded-xl px-3 sm:px-4 pt-7 pb-2 focus:outline-none placeholder:italic"
                >
                <div class="absolute left-4 top-1 sm:left-4.5 sm:top-2">
                    <span class="text-xs">Mot de passe</span>
                </div>
            </label>

            <label 
                for="confirm-password-signup-input" 
                class="flex flex-col relative grow"
            >
                <input 
                    type="password"
                    id="confirm-password-signup-input"
                    placeholder="Tapez à nouveau votre mot de passe"
                    v-model="confirmPassword"
                    class="border border-neutral-300 rounded-xl px-3 sm:px-4 pt-7 pb-2 focus:outline-none placeholder:italic"
                >
                <div class="absolute left-4 top-1 sm:left-4.5 sm:top-2">
                    <span class="text-xs">Confirmer le mot de passe</span>
                </div>
            </label>

            <label 
                for="birthdate-signup-input" 
                class="flex flex-col relative grow"
            >
                <input 
                    type="date"
                    id="birthdate-signup-input"
                    v-model="registerForm.birthdate"
                    class="border border-neutral-300 rounded-xl px-3 sm:px-4 pt-7 pb-2 focus:outline-none"
                >
                <div class="absolute left-4 top-1 sm:left-4.5 sm:top-2">
                    <span class="text-xs">Date de naissance</span>
                </div>
            </label>

            <button 
                type="submit"
                class="rounded-xl bg-emerald-400 py-1.5 mx-1 text-sm tracking-tight cursor-pointer hover:opacity-90"
            >
                S'inscrire
            </button>
        </form>
    </div>
</template>