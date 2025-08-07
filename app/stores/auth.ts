import { defineStore } from 'pinia';
import { api } from '../utils/apis';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    role: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
  },
  actions: {
    async login(credentials: { email: string, password_raw: string }) {
      try {
        const { user, token } = await api<{ user: User; token: string }>('/api/auth/login', {
          method: 'POST',
          body: credentials,
        })
        this.user = user
        this.token = token
        this.role = user.role
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.role = null
    },
  },
  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    pick: ['user', 'token', 'role'],
  }
})