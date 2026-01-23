<script setup lang="ts">
import DashboardFooter from './footers/DashboardFooter.vue';
import DashboardHeader from './headers/DashboardHeader.vue';
import DefaultFooter from './footers/DefaultFooter.vue';
import DefaultHeader from './headers/DefaultHeader.vue';
import { useAppStore } from '../config/RedSkillProvider';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const appStore = useAppStore();

const withLayout = computed(() => route.meta.withLayout === true);
const isLogged = computed(() => appStore.getIsLogged);
</script>

<template>
    <main v-if="!withLayout" id="mainDisplay">
        <router-view/>
    </main>
    <div v-else id="layout-container" class="flex flex-col w-full min-h-screen">
        <DashboardHeader v-if="isLogged === true" />
        <DefaultHeader v-else />
        <main id="layout-container-main" class="flex-1">
            <router-view/>
        </main>
        <DashboardFooter v-if="isLogged === true" />
        <DefaultFooter v-else />
    </div>
</template>