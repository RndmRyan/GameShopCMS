export const useApi = <T>(url: string, options?: any) => {
  const { token, logout } = useAuth();

  return $fetch<T>(url, {
    ...options,
    onRequest({ options }) {
      if (token.value) {
        options.headers = new Headers(options.headers);
        options.headers.set('Authorization', `Bearer ${token.value}`);
        console.log("✅ Authorization header attached.");
      } else {
        console.warn("⚠️ No token found, sending request without auth header.");
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        console.error("❌ Received 401 Unauthorized. Logging out.");
        logout();
        if (process.client) {
          navigateTo('/login', { replace: true });
        }
      }
    }
  });
};