import { useAuthStore } from '@/stores/auth'
import { navigateTo, defineNuxtRouteMiddleware } from '#imports'

export default defineNuxtRouteMiddleware((to, from) => {
  if (!Client) return

  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }
})