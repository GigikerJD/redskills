<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { useAppStore } from '../config/RedSkillProvider';
    import { onMounted, ref } from 'vue';
    import type { LoginModel, RegisterModel } from '../models/FormsModel';
    import { loginRequest, registerRequest } from '../services/users-service';
    import { darkTheme, Notification, NotificationProgress, Notivue, push, useNotivue } from 'notivue';

    const notifConfig = useNotivue();
    const appStore = useAppStore();
    const router = useRouter();
    const loginModel = ref<LoginModel>({ email: '', password: ''});
    const registerModel = ref<RegisterModel>({ email: '', password: '', firstname: '', lastname: '', birthdate: new Date()});
    const blockedLoginButton = ref<boolean>(false);
    const blockedRegisterButton = ref<boolean>(false);

    function handleRegister(event: Event){
        event.preventDefault();
        if (!registerModel.value.email ||
            !registerModel.value.password ||
            !registerModel.value.firstname ||
            !registerModel.value.lastname
        ) {
            push.error({
                message: 'Données manquantes...', duration: 2000
            });
            return;
        }
        blockedRegisterButton.value = true;

        const req = registerRequest(registerModel.value);
        req.then(res => {
            push.success({ message: res.data.message, duration: 2000 });
            if ('userID' in res.data) {
                appStore.login(res.data.userID);
            }
        })
        .catch(error => {
            push.error({ message: error.data.message, duration: 200 })
        })
        .finally(() => {
            blockedRegisterButton.value = false;
        })
    }

    function handleLogin(event: Event){
        event.preventDefault();
        if (!loginModel.value.email || !loginModel.value.password) {
            push.error({
                message: 'Vos identifiants sont vides !',
                duration: 2000
            });
            return;
        }
        blockedLoginButton.value = true;
        
        const req = loginRequest(loginModel.value);
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
            blockedLoginButton.value = false;
        });
    }

    onMounted(() => {
        notifConfig.position.value = 'top-right'
    })
</script>

<template>
    <Notivue v-slot="item">
        <Notification :item="item" :theme="darkTheme" :style="{}">
            <NotificationProgress :item="item"/>
        </Notification>
    </Notivue>

    <h4 class="text-center text-green-500 font-bold">Page Forms</h4>
    <button
        id='go-home-btn'
        @click="router.push('/')"
        class="flex justify-self-center cursor-pointer mt-4 px-2 py-1 bg-blue-300 rounded-2xl font-[16px]"
    >
        Aller à l'accueil
    </button>

    <form
        id="login-form" 
        @submit="handleLogin"
        class="max-w-[500px] border border-blue-300 rounded-4xl mx-auto mt-4 py-4 flex flex-col items-center"
    >
        <div class="flex flex-col justify-center w-3/4">
            <label for="user-email">Email</label>
            <input
                id="user-email" 
                type="text"
                placeholder="example@mail.com"
                class="border border-sky-400 rounded-2xl outline px-3 py-1 my-4 text-[16px]"
                v-model="loginModel.email"
                :disabled="blockedLoginButton"
            >
        </div>
        <div class="flex flex-col justify-center w-3/4">
            <label for="user-password">Mot de passe</label>
            <input
                id="user-password"
                type="password"
                placeholder="**********"
                class="border border-sky-400 rounded-3xl outline px-3 py-1 my-4 text-[16px]"
                v-model="loginModel.password"
                :disabled="blockedLoginButton"
            >
            </div>

        <button 
            type="submit"
            class="rounded-2xl py-0.5 px-4 mt-2 bg-sky-700 text-white font-semibold text-[16px] cursor-pointer"
            :disabled="blockedLoginButton"
        >
            {{ blockedLoginButton ? 'Connexion...' : 'Se connecter' }}
        </button>
    </form>

    <form 
        id="register-form"
        @submit="handleRegister"
        class="max-w-[500px] border border-blue-300 rounded-4xl mx-auto mt-4 py-4 flex flex-col items-center"
    >
        <div class="flex flex-col sm:flex-row justify-around items-center">
            <div>
                <label for="">Prénom</label>
                <input 
                    type="text"
                    class="border"
                    v-model="registerModel.firstname"
                    :disabled="blockedRegisterButton"
                >
            </div>
            <div>
                <label for="">Nom de famille</label>
                <input 
                    type="text"
                    class="border"
                    v-model="registerModel.lastname"
                    :disabled="blockedRegisterButton"
                >
            </div>
        </div>

        <div>
            <label for="">Adresse e-mail</label>
            <input 
                type="email"
                v-model="registerModel.email"
                :disabled="blockedRegisterButton"
            >
        </div>
        <div>
            <label for="">Mot de passe</label>
            <input 
                type="password"
                v-model="registerModel.password"
                :disabled="blockedRegisterButton"
            >
        </div>
        <div>
            <label for="">Date de naissance</label>
            <input 
                type="date"
                v-model="registerModel.birthdate"
                :disabled="blockedRegisterButton"
            >
        </div>

        <button type="submit">S'inscrire</button>
    </form>
</template>

<style scoped>
</style>