export interface User {
  username: string;
  email: string;
  password: string;
  role: string;
} 

export const useAuth = () => {
  const user = useState<User | null>('user', () => null);
  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax'
  });


  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const isAdmin = computed(() => user.value?.role?.toLowerCase() === 'admin');
  const role = computed(() => user.value?.role);

const setToken = (newToken: string | null) => {
    token.value = newToken;
};

  const fetchUserProfile = async () => {
    if (!token.value) {
      console.log("No token available, skipping user profile fetch.");
      user.value = null;
      return;
    }

    try {
      const response = await useApi<{ user: User }>('/api/auth/me');
      if (response && response.user) {
        user.value = response.user;
      } else {
        throw new Error("User data not found in API response.");
      }
    } catch (error) {
      setToken(null);
      user.value = null;
    }
  };

  const login = async (credentials: { email: string, password_raw: string }) => {
    try {
      const response = await useApi<{ token: string }>('/api/auth/login', {
        method: 'POST',
        body: credentials,
      });

      if (response && response.token) {
        setToken(response.token);
        return true; 
      }

      console.error("Login API call succeeded but did not return a token.");
      setToken(null);
      return false;

    } catch (error) {
      console.error('Login process failed:', error);
      setToken(null);
      user.value = null;
      return false;
    }
  };

  const logout = async () => {
    setToken(null);
    user.value = null;
    console.log("User logged out.");
  };

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    role,
    login,
    logout,
    fetchUserProfile,
  };
};