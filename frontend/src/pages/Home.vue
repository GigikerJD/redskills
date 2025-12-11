<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
    <h4 class="text-center font-[Roboto]">Page Home</h4>
    <button 
        @click="router.push('/signin')"
        class="flex justify-self-center cursor-pointer outline-none rounded-[10px] px-2.5 py-1.5 mx-auto bg-blue-200 hover:bg-blue-700 hover:text-white text-base font-semibold font-[Roboto]"
    >
        Aller à la page Login
    </button>
    <button
        @click="router.push('/signup')"
        class="flex justify-self-center cursor-pointer outline-none rounded-[10px] px-2.5 py-1.5 mx-auto bg-blue-200 hover:bg-blue-700 hover:text-white text-base font-semibold font-[Roboto]"
    >
        Aller à la page Création de compte
    </button>
</template>