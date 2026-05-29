import { useTransition } from 'react';
import { v4 } from 'uuid';
import { validateLoginHandler, validateRegisterHandler } from '../api/authApi';
import { useAuthStore, useAuthStoreLocalStorage, User } from '../store/authStore';
import { generateUserId } from '../utils';

const useAuthHook = () => {
  const { setUser, clear, user: storageUser } = useAuthStoreLocalStorage();
  const { setUser: setUserLocal, clear: clearLocal, user: localUser } = useAuthStore();
  const [isPendingLogout, startTransition] = useTransition();

  const loginHandler = async ({
    email,
    password,
    remember,
  }: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    const data = await validateLoginHandler({ email, password });

    if (data.user) {
      if (remember) {
        setUser({
          email,
          password,
          session: v4(),
        });
      }

      setUserLocal({
        email,
        password,
        session: v4(),
      });
    }

    return data;
  };

  const registerHandler = async ({ email, password }: { email: string; password: string }) => {
    const data = await validateRegisterHandler({ email, password });

    if (data.user) {
      const user = {
        email,
        password,
        session: v4(),
        userId: generateUserId(),
      } as User;

      setUserLocal(user);
      setUser(user);
    }

    return data;
  };

  const logoutHandler = async () => {
    clear();
    clearLocal();

    startTransition(async () => {
      await new Promise(resolve => {
        setTimeout(() => {
          clear();
          clearLocal();
          resolve(true);
        }, 1000);
      });
    });
  };

  const user = storageUser || localUser;

  return { loginHandler, registerHandler, logoutHandler, isPendingLogout, user };
};

export { useAuthHook };
