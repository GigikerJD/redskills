<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <header class="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div class="m-6">
            <div class="w-full flex justify-between items-center">
                <span class="text-lg cursor-pointer">
                    Accueil
                </span>
                <nav class="hidden sm:block gap-x-4">
                    <RouterLink
                        to="/signup" 
                        class="cursor-pointer px-3 py-2 text-slate-600 hover:font-semibold transition-all duration-100"
                    >
                        S'inscrire
                    </RouterLink>
                    <RouterLink
                        to="/signin"  
                        class="cursor-pointer px-3 py-2 text-slate-600 hover:font-semibold transition-all duration-100"
                    >
                        Se connecter
                    </RouterLink>
                </nav>
            </div>
        </div>
    </header>
</template>