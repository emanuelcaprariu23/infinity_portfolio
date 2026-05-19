import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  email: string;
  name?: string;
  password: string;
  session?: string | null;
}

export interface AuthState {
  user: User | null;
  validationCode?: string | null;
  getUser: () => User | null;
  setUser: (user: Partial<User>) => User;
  updateSession: (session: string | null) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
  updateValidationCode: (value: string) => void;
}

const useAuthStoreLocalStorage = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      validationCode: null,
      getUser: () => get().user,
      setUser: (user: Partial<User>) => {
        const full: User = {
          email: user.email ?? '',
          name: user.name ?? '',
          password: user.password ?? '',
          session: user.session ?? null,
        };
        set({ user: full });
        return full;
      },
      updateSession: (session: string | null) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, session } });
      },
      clear: () => set({ user: null }),
      clearLocalStorage: () => set({ user: null }),
      isAuthenticated: () => !!(get().user && get().user!.session),
      updateValidationCode: (value: string) => {
        set({ validationCode: value });
      },
    }),
    {
      name: 'auth-store-task-manager-app',
      partialize: state => ({
        user: state.user
          ? {
              email: state.user.email,
              name: state.user.name,
              session: state.user.session ?? null,
            }
          : null,
        validationCode: state.validationCode,
      }),
    },
  ),
);

const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  validationCode: null,
  getUser: () => get().user,
  setUser: (user: Partial<User>) => {
    const full: User = {
      email: user.email ?? '',
      name: user.name ?? '',
      password: user.password ?? '',
      session: user.session ?? null,
    };
    set({ user: full });
    return full;
  },
  updateSession: (session: string | null) => {
    const user = get().user;
    if (!user) return;
    set({ user: { ...user, session } });
  },
  clear: () => set({ user: null }),
  clearLocalStorage: () => set({ user: null }),
  isAuthenticated: () => !!(get().user && get().user!.session),
  updateValidationCode: (value: string) => {
    set({ validationCode: value });
  },
}));

export { useAuthStore, useAuthStoreLocalStorage };
