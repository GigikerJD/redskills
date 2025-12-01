<script setup lang="ts">
    import { useRouter } from 'vue-router';

    const router = useRouter();
</script>

<template>
    <h4>Page Home</h4>
    <button @click="router.push('/forms')">
        Aller à la page Login
    </button>
</template>

<style scoped>
    h4{
        text-align: center;
    }
    button {
        background-color: lightblue;
        outline: none;
        border: none;
        border-radius: 10px;
        padding-inline: 10px;
        padding-block: 6px;
        margin-inline: auto;
    }
</style>