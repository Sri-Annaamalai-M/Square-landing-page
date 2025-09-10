import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      token: null,
      userId: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setAuth: (token, userId, user = null) => {
        set({
          token,
          userId,
          user,
          isAuthenticated: true,
          error: null,
        });
      },

      setUser: (user) => {
        set({ user });
      },

      setToken: (token) => {
        set({ token, isAuthenticated: !!token });
      },

      setUserId: (userId) => {
        set({ userId });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      logout: () => {
        set({
          token: null,
          userId: null,
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
      },

      // Computed getters
      getAuthHeaders: () => {
        const { token } = get();
        return token ? { Authorization: `Bearer ${token}` } : {};
      },

      // Utility methods
      isTokenValid: () => {
        const { token } = get();
        if (!token) return false;
        
        try {
          // Decode JWT token to check expiration
          const payload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Date.now() / 1000;
          return payload.exp > currentTime;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'auth-storage', 
      partialize: (state) => ({
        token: state.token,
        userId: state.userId,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
