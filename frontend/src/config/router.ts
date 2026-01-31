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
        meta : { 
          title: "Redskills - plateforme d'apprentissage de soft-skills",
          withLayout: true
        }
      },
      {
        path: '/signin',
        name: 'signin',
        component: () => import("../pages/Login.vue"),
        meta : { 
          title: "Connexion",
          withLayout: false
        }
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import("../pages/Register.vue"),
        meta : { 
          title: "Création de compte",
          withLayout: false
        }
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import("../pages/Dashboard.vue"),
        meta: { 
          requiresAuth: true, 
          title: "Redskills : dashboard",
          withLayout: true
        }
      },
      {
        path: '/survey',
        name: 'survey',
        component: () => import("../pages/Survey.vue"),
        meta: {
          requiresAuth: true,
          title: "Redskills : questionnaire d'évaluation",
          withLayout: false
        }
      },
      {
        path: '/demo',
        name: 'demo',
        component: () => import("../pages/Demo.vue"),
        meta: {
          title: "Redskills : page de démonstration",
          withLayout: false
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import("../pages/Profile.vue"),
        meta: { 
          requiresAuth: true, 
          title: "Mes progressions", 
          withLayout: true
        }
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import("../pages/Settings.vue"),
        meta: { 
          requiresAuth: true, 
          title: "Mes paramètres",
          withLayout: true
        }
      }
    ]
  }
]

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, _, next) => {
  const appStore = useAppStore();

  document.title = to.meta.title as string
  
  if (to.meta.requiresAuth && !appStore.getIsLogged) {
    next('/signin')
  } else if ((to.path === '/signin' || to.path === '/') && appStore.getIsLogged) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router;