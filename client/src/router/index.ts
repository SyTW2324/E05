import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Registro from '../views/Registro.vue'
import Login from '../views/Login.vue'
import Contact from '../views/Contact.vue'
import Main from '../views/Main.vue'

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Devuelve true si hay un token, false si no lo hay.
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'registro',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Registro.vue')
    }, 
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('../views/Main.vue'),
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next();
        } else {
          next('/login');
        }
      }
    }
  ]
})

export default router
