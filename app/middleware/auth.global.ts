export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client || to.path === '/login') {
    return;
  }

  const { isAuthenticated, fetchUserProfile } = useAuth();

  if (!isAuthenticated.value) {
    await fetchUserProfile();
  }

  if (!isAuthenticated.value) {
    console.log('Middleware: User not authenticated. Redirecting to /login');
    return navigateTo('/login', { replace: true });
  }

  if (isAuthenticated.value && to.path === '/login') {
    return navigateTo('/', { replace: true });
  }
});