import { useAuthStore, useAuthStoreLocalStorage } from '@/pages/Auth/store/authStore';
import { Navigate, Outlet } from 'react-router';
import { PATH_ROUTES } from '../constants';

const ProtectedRouter = (): React.ReactElement | null => {
  const { user } = useAuthStoreLocalStorage();
  const { user: localUser } = useAuthStore();

  if (!user && !localUser) {
    return <Navigate to={PATH_ROUTES.LOGIN_PAGE} />;
  }

  return <Outlet />;
};

ProtectedRouter.displayName = 'ProtectedRouter';

export default ProtectedRouter;
