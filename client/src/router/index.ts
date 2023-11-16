import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../store'
import HomeView from '../views/HomeView.vue'
import Registro from '../views/Registro.vue'
import Login from '../views/Login.vue'
import Contact from '../views/Contact.vue'
import Main from '../views/Main.vue'

const authGuard = (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.getIsAuthenticated) {
    next('/login');
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'registro',
      component: () => import('../views/Registro.vue')
    }, 
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/Contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/Main',
      name: 'Main',
      component: () => import('../views/Main.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard,
    }
  ]
})

export default router;
