<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isDark = ref(false);

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    isDark.value = savedTheme === 'dark';
    if (isDark.value) {
        document.documentElement.classList.add('dark');
    }
});

function toggleDarkMode() {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

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

    <button
        @click="toggleDarkMode" 
        class="cursor-pointer rounded-lg text-sm flex justify-self-center my-6 px-3.5 bg-gray-600 py-1.5 shadow-md hover:shadow-xl hover:bg-gray-800 transition-colors text-white"
    >
        Changer de mode
    </button>

    <div class="max-w-xl bg-red-200 dark:bg-red-700 dark:text-white 
        text-center my-10 mx-auto p-2 rounded-xl 
        shadow-2xl transition-all duration-300">
        Mode dark
    </div>

</template>