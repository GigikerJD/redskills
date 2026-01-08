<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { useAppStore } from '../config/RedSkillProvider';
    import { userData } from '../services/users-service';
    import type { UserDataResponse } from '../models/ApiModel';

    const appStore = useAppStore();
    const myUser = ref<UserDataResponse>({
        type: '',
        status: 0,
        message: '',
        user: null
    });

    const formatBirthdate = computed(() => {
        if (!myUser.value.user?.birthdate) return '';
        return new Date(myUser.value.user?.birthdate).toLocaleDateString();
    })

    onMounted(async () => {
        const res = await userData(appStore.getUserID);
        myUser.value.type = res.type
        myUser.value.message = res.message
        myUser.value.status = res.status 
        myUser.value.user = res.user

        console.log(formatBirthdate.value);
    })
</script>

<template>
    <h4 class="text-center">Page dashboard</h4>
    <button
        @click="appStore.logout"
        class="bg-red-600 text-white outline-none border-[0.5px] border-solid rounded-3xl px-2.5 py-1.5 cursor-pointer flex justify-self-center"
    >
        Se déconnecter
    </button>

    <div class="my-4 max-w-7xl mx-auto">
        <span class="block">{{ myUser.user?.id }}</span>
        <span class="block">{{ myUser.user?.email }}</span>
        <span class="block">{{ myUser.user?.firstname }}</span>
        <span class="block">{{ myUser.user?.lastname }}</span>
        <span class="block">{{ formatBirthdate }}</span>
        <span class="block">{{ myUser.user?.createdAt }}</span>
        <span class="block">{{ myUser.user?.updatedAt }}</span>
    </div>
</template>