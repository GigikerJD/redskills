<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useAppStore } from '../config/RedSkillProvider';
import { userData, updateProfile } from '../services/users-service';
import type { UserDataResponse } from '../models/ApiModel';

const appStore = useAppStore();
const myUser = ref<UserDataResponse>({
    type: '',
    status: 0,
    message: '',
    user: null
});

const firstname = computed({
    get: () => myUser.value.user?.firstname ?? '',
    set: (val: string) => {
        if (myUser.value.user) {
            myUser.value.user.firstname = val
        }
    }
})

const lastname = computed({
  get: () => myUser.value.user?.lastname ?? '',
    set: (val: string) => {
        if (myUser.value.user) {
            myUser.value.user.lastname = val
        }
    }
})

const email = computed({
    get: () => myUser.value.user?.email ?? '',
    set: () => {} // readonly
})

const birthdate = computed({
    get: () => myUser.value.user?.birthdate ?? '',
    set: (val: string) => {
        if (myUser.value.user) {
            myUser.value.user.birthdate = val
        }
    }
})

const initialUserSnapshot = ref<any>(null)

    const feedbackMessage = ref<string | null>(null)
const feedbackType = ref<'success' | 'error' | 'info'>('info')

onMounted(async () => {
    const res = await userData(appStore.getUserID)
    myUser.value = res

    // Snapshot pour Annuler
    initialUserSnapshot.value = structuredClone(res.user)
})

const showMessage = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
) => {
    feedbackMessage.value = message
    feedbackType.value = type

    // Auto-hide après 4 secondes
    setTimeout(() => {
        feedbackMessage.value = null
    }, 4000)
}

const editingField = ref<null | 'firstname' | 'lastname' | 'birthdate'>(null)

const tempValue = ref<string>('')

const startEdit = (field: 'firstname' | 'lastname' | 'birthdate', currentValue: string) => {
  editingField.value = field
  tempValue.value = currentValue
}

const cancelEdit = () => {
  editingField.value = null
  tempValue.value = ''
}

const confirmEdit = async () => {
    if (!editingField.value || !myUser.value.user) return

    try {
        const field = editingField.value
        const newValue = tempValue.value

        // Call API
        await updateProfile(appStore.getUserID, field, newValue)

        // Update local state ONLY if API succeeded
        switch (field) {
            case 'firstname':
                myUser.value.user.firstname = newValue
                break
            case 'lastname':
                myUser.value.user.lastname = newValue
                break
            case 'birthdate':
                myUser.value.user.birthdate = newValue
                break
        }

        editingField.value = null
        tempValue.value = ''

        showMessage('Modification enregistrée.', 'success')
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error)

        showMessage(
            "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.",
            'error'
        )
    }
}


</script>

<template>
<div class="bg-slate-50 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        
        <!-- Header -->
        <div class="mb-8 text-center">
            <h1 class="text-2xl font-bold text-slate-800">
                Mon profil
            </h1>
            <p class="text-slate-500 mt-2">
                Gérez vos informations personnelles et votre mot de passe
            </p>
        </div>

        <!-- Feedback message -->
        <div
            v-if="feedbackMessage"
            class="mb-6 rounded-lg px-4 py-3 text-sm font-medium transition"
            :class="{
                'bg-green-100 text-green-800': feedbackType === 'success',
                'bg-red-100 text-red-800': feedbackType === 'error',
                'bg-blue-100 text-blue-800': feedbackType === 'info'
            }"
        >
            {{ feedbackMessage }}
        </div>

        <!-- Personal information -->
        <section class="mb-10">
            <h2 class="text-lg font-semibold text-slate-700 mb-4">
                Informations personnelles
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Firstname -->
                <div>
                    <label class="block text-sm font-medium text-slate-600 mb-1">
                        Prénom
                    </label>

                    <!-- Mode affichage -->
                    <div v-if="editingField !== 'firstname'" class="flex items-center justify-between gap-4">
                        <span class="text-slate-800">
                            {{ firstname }}
                        </span>
                        <button
                            @click="startEdit('firstname', firstname)"
                            class="text-sm text-blue-600 hover:underline"
                        >
                            ✏️ Modifier
                        </button>
                    </div>

                    <!-- Mode édition -->
                    <div v-else class="flex items-center gap-2">
                        <input
                            type="text"
                            v-model="tempValue"
                            class="flex-1 rounded-lg border border-slate-300 px-3 py-2
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            @click="confirmEdit"
                            class="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Valider
                        </button>

                        <button
                            @click="cancelEdit"
                            class="px-3 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-100"
                        >
                            Annuler
                        </button>
                    </div>
                </div>


                <!-- Lastname -->
                <div>
                    <label class="block text-sm font-medium text-slate-600 mb-1">
                        Nom
                    </label>

                    <div v-if="editingField !== 'lastname'" class="flex items-center justify-between gap-4">
                        <span class="text-slate-800">{{ lastname }}</span>
                        <button
                            @click="startEdit('lastname', lastname)"
                            class="text-sm text-blue-600 hover:underline"
                        >
                            ✏️ Modifier
                        </button>
                    </div>

                    <div v-else class="flex items-center gap-2">
                        <input
                            type="text"
                            v-model="tempValue"
                            class="flex-1 rounded-lg border border-slate-300 px-3 py-2"
                        />
                        <button @click="confirmEdit" class="btn-primary">Valider</button>
                        <button @click="cancelEdit" class="btn-secondary">Annuler</button>
                    </div>
                </div>

                <!-- Email (readonly) -->
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-slate-600 mb-1">
                        Email
                    </label>
                    <div class="flex items-center justify-between">
                    <span class="text-slate-500">{{ email }}</span>
                    <span class="text-xs text-slate-400">Non modifiable</span>
                    </div>
                </div>

                <!-- Birthdate -->
                <div>
                    <label class="block text-sm font-medium text-slate-600 mb-1">
                        Date de naissance
                    </label>

                    <!-- Mode affichage -->
                    <div v-if="editingField !== 'birthdate'" class="flex items-center justify-between gap-4">
                        <span class="text-slate-800">
                        {{ birthdate }}
                        </span>
                        <button
                            @click="startEdit('birthdate', birthdate)"
                            class="text-sm text-blue-600 hover:underline"
                        >
                            ✏️ Modifier
                        </button>
                    </div>

                    <!-- Mode édition -->
                    <div v-else class="flex items-center gap-2">
                        <input
                            type="date"
                            v-model="tempValue"
                            class="flex-1 rounded-lg border border-slate-300 px-3 py-2
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            @click="confirmEdit"
                            class="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Valider
                        </button>

                        <button
                            @click="cancelEdit"
                            class="px-3 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-100"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
</template>