<script setup lang="ts">
    import DashboardFooter from './footers/DashboardFooter.vue';
    import DashboardHeader from './headers/DashboardHeader.vue';
    import DefaultFooter from './footers/DefaultFooter.vue';
    import DefaultHeader from './headers/DefaultHeader.vue';
    import { useAppStore } from '../config/RedSkillProvider';

    const appStore = useAppStore();
    const isLogged = appStore.getIsLogged;
</script>

<template>
    <div id="layout-container">
        <DashboardHeader v-if="isLogged === true" />
        <DefaultHeader v-else />
        <main id="layout-container-main">
            <router-view/>
        </main>
        <DashboardFooter v-if="isLogged === true" />
        <DefaultFooter v-else />
    </div>
</template>

<style scoped>
    #layout-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    #layout-container-main {
        flex: 1 1 auto;
        position: relative;
    }
</style>