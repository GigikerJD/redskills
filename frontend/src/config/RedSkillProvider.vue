<script setup lang="ts">
    import Cookies from 'universal-cookie';
    import { provide, ref } from 'vue';

    const cookies = new Cookies();
    const userID = ref<string>(cookies.get("userID") || "")
    const isLogged = ref<boolean>(cookies.get("isLogged") || false)

    function login(user_id: string): void{
        cookies.set("userID", user_id, { 
            path: '/',
            domain: 'localhost',
            secure: false,
            httpOnly: false
        });
        cookies.set("isLogged", true, { 
            path: '/',
            domain: 'localhost',
            secure: false,
            httpOnly: false
        });
        userID.value = user_id;
        isLogged.value = true;
    }

    function logout(): void{
        cookies.remove('userID')
        cookies.remove('isLogged');
        userID.value = '';
        isLogged.value = false;
    }

    provide('userID', userID)
    provide('isLogged', isLogged)
    provide('login', login)
    provide('logout', logout)
</script>

<template>
    <RouterView></RouterView>
</template>