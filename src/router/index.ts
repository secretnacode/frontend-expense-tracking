import SignInPage from '@/modules/auth/view/SignInPage.vue'
import SignUpPage from '@/modules/auth/view/SignUpPage.vue'
import LandingPage from '@/modules/landing/views/LandingPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/sign-in',
      name: 'sign-in page',
      component: SignInPage,
    },
    {
      path: '/sign-up',
      name: 'sign-up page',
      component: SignUpPage,
    },
  ],
})

export default router
