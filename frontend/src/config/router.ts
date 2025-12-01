import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useAppStore } from "./RedSkillProvider";

const routes: RouteRecordRaw[] = [
  {
    path:'/',
    component: () => import("../layout/RedSkillLayout.vue"),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import("../pages/Home.vue"),
        meta : { title: "Redskills - plateforme d'apprentissage de soft-skills" }
      },
      {
        path: '/forms',
        name: 'forms',
        component: () => import("../pages/Forms.vue"),
        meta: { title: "Connectez-vous ou enregistrez vous sur l'appli" }
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import("../pages/Dashboard.vue"),
        meta: { requiresAuth: true, title: "Redskills : dashboard" }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import("../pages/Profile.vue"),
        meta: { requiresAuth: true, title: "Mes progressions" }
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import("../pages/Settings.vue"),
        meta: { requiresAuth: true, title: "Mes paramètres" }
      }
    ]
  }
]

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, _, next) => {
  const appStore = useAppStore();

  document.title = to.meta.title as string
  
  if (to.meta.requiresAuth && !appStore.getIsLogged) {
    next('/forms')
  } else if ((to.path === '/forms' || to.path === '/') && appStore.getIsLogged) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router;