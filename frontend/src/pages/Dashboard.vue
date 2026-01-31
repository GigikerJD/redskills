<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAppStore } from '../config/RedSkillProvider';
import { userData } from '../services/users-service';
import type { UserDataResponse } from '../models/ApiModel';
import { resultRequest } from '../services/results-service';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();
const myUser = ref<UserDataResponse>({
    type: '',
    status: 0,
    message: '',
    user: null
});
onMounted(async () => {
    const res = await userData(appStore.getUserID);
    myUser.value.type = res.type
    myUser.value.message = res.message
    myUser.value.status = res.status 
    myUser.value.user = res.user
    const userProfile = await resultRequest(appStore.getUserID);
    if (userProfile.status === 404) {
        router.push('/survey')
    }
})
</script>

<template>
    <h4 class="text-center">Page dashboard</h4>

    <div class="my-4 max-w-7xl mx-auto">
        <span class="block">{{ myUser.user?.email }}</span>
        <span class="block">{{ myUser.user?.firstname }}</span>
        <span class="block">{{ myUser.user?.lastname }}</span>
        <span class="block">{{ myUser.user?.createdAt }}</span>
        <span class="block">{{ myUser.user?.updatedAt }}</span>
    </div>
</template>