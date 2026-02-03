<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAppStore } from '../../config/RedSkillProvider';
import clsx from 'clsx';

const appStore = useAppStore();


</script>

<template>
    <header class="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div class="m-6">
            <div class="w-full flex justify-between items-center">
                <RouterLink to="/dashboard" class="text-lg font-semibold">
                    Tableau de Bord
                </RouterLink>
                <nav class="hidden sm:block space-x-4">
                    <RouterLink to="/profile">Profil</RouterLink>
                    <RouterLink to="/settings">Paramètres</RouterLink>
                    <button
                        @click="appStore.logout"
                        :class='clsx(
                            "bg-red-600 text-white outline-none cursor-pointer",
                            "shadow-xl hover:shadow-2xl/30 transition-shadow duration-200",
                            "p-2 rounded"
                        )'
                    >
                        Déconnexion
                    </button>
                </nav>
            </div>
        </div>
    </header>
</template>

<style scoped>

</style>