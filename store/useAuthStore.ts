import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: unknown | null;
  login: (userData: unknown) => void;
  logout: () => void;
  token: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (userData) => set({ isLoggedIn: true, user: userData }),
  logout: () => set({ isLoggedIn: false, user: null }),
  token: null,
}));
