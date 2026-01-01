<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
    <h4 class="text-center font-[Roboto]">Page Home</h4>
    <div class="flex flex-col justify-center items-center mt-4 sm:mt-7 px-4 gap-y-4">
        <button 
            @click="router.push('/signin')"
            class="cursor-pointer outline-none rounded-[10px] px-2.5 py-1.5 bg-blue-200 hover:bg-blue-700 hover:text-white text-base font-semibold font-[Roboto]"
        >
            Aller à la page Login
        </button>
        <button
            @click="router.push('/signup')"
            class="cursor-pointer outline-none rounded-[10px] px-2.5 py-1.5 bg-blue-200 hover:bg-blue-700 hover:text-white text-base font-semibold font-[Roboto]"
        >
            Aller à la page Création de compte
        </button>
    </div>

</template>