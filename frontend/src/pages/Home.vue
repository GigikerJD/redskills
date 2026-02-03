<template>
    <div class="min-h-screen bg-slate-50 flex flex-col">

        <!-- HERO + VISUAL SPLIT -->
        <section
        class="flex flex-col-reverse lg:flex-row items-center
                justify-between gap-12
                px-6 pt-24 pb-20 max-w-7xl mx-auto"
        >

            <!-- LEFT: TEXT -->
            <div class="flex-1 text-center lg:text-left">
                <h1
                    class="text-4xl sm:text-6xl font-extrabold tracking-tight
                            text-[#d60a01] text-shadow-lg"
                >
                    Bienvenue sur RedSkill
                </h1>

                <p class="mt-6 max-w-xl mx-auto lg:mx-0
                        text-lg sm:text-xl text-slate-600 leading-relaxed">
                    Améliorez vos compétences en communication interpersonnelle grâce à des
                    exercices intelligents basés sur la méthode <strong>DISC</strong>.
                </p>

                <div class="mt-10 flex gap-4 flex-wrap
                            justify-center lg:justify-start">
                    <RouterLink
                        to="/signup"
                        class="px-8 py-3 rounded-xl bg-[#d60a01] text-white
                            font-semibold text-lg hover:bg-[#b50901]
                            transition shadow-lg"
                    >
                        Commencer
                    </RouterLink>

                    <RouterLink
                        to="/signin"
                        class="px-8 py-3 rounded-xl border border-slate-300
                            text-slate-700 font-semibold text-lg
                            hover:bg-slate-100 transition"
                    >
                        Se connecter
                    </RouterLink>
                </div>
            </div>

            <!-- RIGHT: IMAGE -->
            <div class="flex-1 flex justify-center">
                <div
                class="w-full max-w-lg rounded-3xl overflow-hidden
                        shadow-2xl bg-white"
                >
                <img
                    src="../assets/images/poster.png"
                    alt="RedSkill – Développement des compétences relationnelles"
                    class="w-full object-cover"
                />
                </div>
            </div>
        </section>


        <!-- VALUE -->
        <section class="bg-white py-20 px-6">
            <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-center">

                <div class="p-6 rounded-2xl shadow-md">
                    <h3 class="text-xl font-bold text-slate-800 mb-3">
                        Exercices personnalisés
                    </h3>
                    <p class="text-slate-600">
                        Chaque scénario s’adapte à votre profil DISC et à vos performances
                        précédentes.
                    </p>
                </div>

                <div class="p-6 rounded-2xl shadow-md">
                    <h3 class="text-xl font-bold text-slate-800 mb-3">
                        Feedback intelligent
                    </h3>
                    <p class="text-slate-600">
                        Recevez des explications claires, pédagogiques et directement
                        exploitables.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>