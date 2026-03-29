import { JwtPayload, Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  isAuthInitialized: boolean;
  claims: JwtPayload | null;
  session: Session | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  isAuthInitialized: false,
  claims: null,
  session: null,
}));
