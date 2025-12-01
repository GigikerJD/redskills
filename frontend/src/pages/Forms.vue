<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { useAppStore } from '../config/RedSkillProvider';
    import { ref } from 'vue';

    const appStore = useAppStore();
    const router = useRouter();
    const user_id = ref<string>('');

    function handleLogin(event: Event){
        event.preventDefault();
        if (user_id.value){
            appStore.login(user_id.value);
        } else {
            alert("ID de l'user vide !");
        }
    }
</script>

<template>
    <h4>Page Forms</h4>
    <button
        id='go-home-btn'
        @click="router.push('/')"
    >
        Aller à l'accueil
    </button>

    <form id="login-form" @submit="handleLogin">
        <div>
            <label for="user-id">User ID : </label>
            <input
                id="user-id" 
                type="text"
                v-model="user_id"
            >
        </div>
        <button type="submit">Se connecter</button>
    </form>
</template>

<style scoped>
    h4{
        text-align: center;
    }
    form {
        display: flex;
        flex-direction: column;
        justify-items: center;
        justify-content: center;
        align-items: center;
    }
    #go-home-btn {
        background-color: lightblue;
        outline: none;
        border: none;
        border-radius: 10px;
        padding-inline: 10px;
        padding-block: 6px;
        margin-bottom: 16px;
        cursor: pointer;
    }
</style>