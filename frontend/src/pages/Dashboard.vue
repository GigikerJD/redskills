<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useAppStore } from '../config/RedSkillProvider';
import { userData } from '../services/users-service';
import type { UserDataResponse } from '../models/ApiModel';
import { resultRequest } from '../services/results-service';
import { useRouter } from 'vue-router';
import clsx from 'clsx';
import { CalendarClock, CircleUser, Play, UserCog } from 'lucide-vue-next';

const appStore = useAppStore();
const router = useRouter();
const myUser = ref<UserDataResponse>({
    type: '',
    status: 0,
    message: '',
    user: null
});

onMounted(() => {
  const mainElement = document.getElementById("layout-container-main")
  mainElement?.classList.add("flex", "flex-col")
})

onUnmounted(() => {
  const mainElement = document.getElementById("layout-container-main")
  mainElement?.classList.remove("flex", "flex-col")
})

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
    <div id="mainContent" class="w-full grow flex flex-col justify-center items-center">
        <div class="w-full max-w-2xl mx-auto px-6 space-y-4">
            <h6 
                :class='clsx(
                    "text-2xl px-4 font-bold text-shadow-xs shadow-white text-shadow-white break-keep",
                    "flex flex-row flex-nowrap items-center gap-2"
                )'
            >
                <CircleUser class="size-5" />
                <span>
                    Bienvenue {{ myUser.user?.firstname }} {{ myUser.user?.lastname }}
                </span>
            </h6>
            <div class="py-2 px-4 rounded grid grid-cols-1 grid-rows-3 sm:grid-cols-4 sm:grid-rows-2 gap-6">
                <div class="text-center col-span-full sm:col-span-2">
                    <button 
                        type="button"
                        :class='clsx(
                            "cursor-pointer bg-sky-500 text-white shadow-lg drop-shadow-lg p-2 rounded-lg",
                            "hover:shadow-xl hover:drop-shadow-xl transition-all duration-300 w-full",
                            "flex flex-row justify-center items-center gap-2"
                        )'
                    >
                        <UserCog class="size-5"/>
                        <span>Accéder au profil</span>
                    </button>
                </div>
                <div class="text-center col-span-full sm:col-span-2">
                    <button 
                        type="button"
                        :class='clsx(
                            "cursor-not-allowed bg-emerald-500 text-white shadowlg drop-shadow-lg p-2 rounded-lg",
                            "hover:shadow-xl hover:drop-shadow-xl transition-all duration-300 w-full",
                            "flex flex-row justify-center items-center gap-2"
                        )'
                    >
                        <Play class="size-5"/>
                        Commencer un exercice
                    </button>
                </div>
                <div class="text-center sm:row-start-2 col-span-full">
                    <button 
                        type="button"
                        :class='clsx(
                            "cursor-pointer bg-gray-500 text-white shadow-lg drop-shadow-lg p-2 rounded-lg",
                            "hover:shadow-xl hover:drop-shadow-xl transition-all duration-300 w-full",
                            "flex flex-row justify-center items-center gap-2"
                        )'
                    >
                        <CalendarClock class="size-5"/>
                        Coming soon...
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>