import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  role: null,
  isLoading: true,

  login: (user) => set({ isAuthenticated: true, user: user }),
  logout: () =>
    set({ isAuthenticated: false, user: null, studentNumber: null }),
  setRole: (role) => set({ role: role }),
  stopLoading: () => set({ isLoading: false }),
  startLoading: () => set({ isLoading: true }),
}));
