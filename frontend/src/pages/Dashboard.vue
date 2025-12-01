<script setup lang="ts">
    import { useAppStore } from '../config/RedSkillProvider';

    const appStore = useAppStore();
</script>

<template>
    <h4>Page dashboard</h4>
    <button
        @click="appStore.logout"
    >
        Se déconnecter
    </button>
</template>

<style scoped>
    button {
        background-color: red;
        color: white;
        outline: none;
        border: '0.5px solid black';
        border-radius: 10px;
        padding-inline: 10px;
        padding-block: 6px;
        cursor: pointer;
    }
</style>