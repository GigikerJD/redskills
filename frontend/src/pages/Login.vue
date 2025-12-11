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
const changePasswordType = ref<'password' | 'text'>('password');
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
    <div class="size-full flex flex-col justify-center items-center">
        <form
            id="login-form"
            @submit="handleLogin"
            class="my-6 px-10 py-4 w-[80%] sm:max-w-[500px] flex flex-col rounded-3xl shadow-xl shadow-cyan-300 inset-shadow-2xl ring grayscale-50"
        >
            <h3 class="font-bold text-center text-base font-[Roboto]">Connexion</h3>

            <div class="flex flex-col my-5 gap-y-3 relative">
                <label 
                    for="email-signin-input"
                    class="text-sm text-shadow-sm font-[Roboto]"
                >
                    Email
                </label>
                <input 
                    type="email"
                    id="email-signin-input"
                    placeholder="example@mail.com"
                    class="border border-emerald-700 rounded-3xl text-base py-1.5 px-5 focus:outline-none"
                    v-model="loginForm.email"
                >
            </div>

            <div class="flex flex-col my-5 gap-y-3 relative">
                <label 
                    for="password-signin-input"
                    class="text-sm text-shadow-sm font-[Roboto]"
                >
                    Mot de passe
                </label>
                <input 
                    :type="changePasswordType"
                    id="password-signin-input"
                    placeholder="***********************"
                    class="border border-emerald-700 rounded-3xl text-base py-1.5 px-5 focus:outline-none"
                    v-model="loginForm.password"
                >
            </div>

            <button 
                type="submit"
                class="py-1.75 px-6 my-4 w-fit mx-auto rounded-3xl text-base text-white font-[Roboto] bg-cyan-700"
            >
                {{ isLoading ? "Connexion..." : "Se connecter" }}
            </button>
        </form>

        <button
            @click="router.push('/')"
            class="flex justify-self-center my-6 rounded-4xl bg-purple-700 text-base font-[Roboto] px-3 py-2 text-white font-semibold cursor-pointer"
            :disabled="isLoading"
        >
            Revenir en arrière
        </button>
    </div>
</template>

<style>

</style>