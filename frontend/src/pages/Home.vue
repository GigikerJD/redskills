<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function changeTheme() {
    if (localStorage.getItem('theme') === null) {
        setTimeout(() => {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        }, 100);
    } else {
        setTimeout(() => {
            localStorage.removeItem('theme');
            document.documentElement.classList.remove('dark');
        }, 100);
    }
}

</script>

<template>
    <h4 class="text-center font-[Roboto]">Page Home</h4>
    <button 
        @click="router.push('/signin')"
        class="flex justify-self-center cursor-pointer outline-none rounded-[10px] px-2.5 py-1.5 mx-auto bg-blue-200 hover:bg-blue-700 hover:text-white text-base font-semibold font-[Roboto]"
    >
        Aller à la page Login
    </button>

    <div class="max-w-7xl mx-auto py-2 px-5 dark:bg-stone-800 mt-6 rounded-3xl">
        <span class="dark:text-white">Bonjour je vais changer de couleur</span>
    </div>
    <button 
        v-on:click="changeTheme"
        class="flex justify-self-center mt-6 bg-fuchsia-700 rounded-3xl py-2 px-3 text-white text-base cursor-pointer"
    >
        Je peux modifier le thème
    </button>
</template>