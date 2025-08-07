import { useAuthStore } from '../stores/auth';

export const api = $fetch.create({
  onRequest({ options }) {
    const authStore = useAuthStore();
    if (authStore.token) {
        const headers: HeadersInit = options.headers ? new Headers(options.headers) : new Headers();
        headers.set('Authorization', `Bearer ${authStore.token}`);
        options.headers = headers;
    }
  },
  onResponseError({ response }) {
    if (response.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      navigateTo('/login');
    }
  }
});