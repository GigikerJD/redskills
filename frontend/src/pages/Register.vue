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
    <div class="size-full flex flex-col justify-center items-center">
        <form
            id="signup-form"
            @submit="handleRegister"
            class="my-6 px-10 py-4 w-[80%] sm:max-w-[600px] flex flex-col rounded-3xl shadow-xl shadow-cyan-300 inset-shadow-2xl"
        >
            <h5 class="font-bold">Inscrivez-vous en un clic !</h5>
        </form>

        <button
            @click="router.push('/')"
            class="flex justify-self-center my-6 rounded-4xl bg-purple-700 text-base font-[Roboto] px-3 text-white font-semibold cursor-pointer"
        >
            Revenir en arrière
        </button>
    </div>
</template>

<style>

</style>