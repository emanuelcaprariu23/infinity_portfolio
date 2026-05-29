/* eslint-disable @typescript-eslint/no-explicit-any */
import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  userId: string;
  email: string;
  name?: string;
  password: string;
  session?: string | null;
  isVerified?: boolean;
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
  validateUser: (value: boolean) => void;
}

// Store creator function - shared between both stores
const createAuthStore = (set: any, get: any): AuthState => ({
  user: null,
  validationCode: null,
  getUser: () => get().user,
  setUser: (user: Partial<User>) => {
    const full: User = {
      email: user.email ?? '',
      name: user.name ?? '',
      password: user.password ?? '',
      session: user.session ?? null,
      userId: user.userId ?? '',
    };
    set({ user: full });
    return full;
  },
  updateSession: (session: string | null) => {
    set(
      produce((draft: AuthState) => {
        if (draft.user) {
          draft.user.session = session;
        }
      }),
    );
  },
  clear: () => set({ user: null }),
  isAuthenticated: () => !!(get().user && get().user!.session),
  updateValidationCode: (value: string) => {
    set({ validationCode: value });
  },
  validateUser: (value: boolean) => {
    set(
      produce((draft: AuthState) => {
        console.log(draft);
        if (draft.user) {
          draft.user.isVerified = value;
        }
      }),
    );
  },
});

const useAuthStore = create<AuthState>()(createAuthStore);

const useAuthStoreLocalStorage = create<AuthState>()(
  persist(createAuthStore, {
    name: 'auth-store-task-manager-app',
    partialize: state => ({
      user: state.user
        ? {
            email: state.user.email,
            name: state.user.name,
            session: state.user.session ?? null,
            userId: state.user.userId,
            isVerified: state.user.isVerified,
          }
        : null,
      validationCode: state.validationCode,
    }),
  }),
);

export { useAuthStore, useAuthStoreLocalStorage };
