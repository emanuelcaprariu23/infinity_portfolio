import Home from '@/pages/Home';
import ErrorPage from '@/Shared/Components/Error/ErrorPage';
import { FullCenteredBox } from '@/Shared/Utils/Helpers/styled-components';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { NotFoundPage, Spinner } from '../../Shared/Components';
import { convertToPathURI } from '../../Shared/Utils/Helpers/global-utils';
import { Layout } from '../Layout/Layout';
import ProtectedRouter from './Components/ProtectedRouter';
import { RedirectRouter } from './Components/RedirectRouter';
import { PATH_ROUTES } from './constants';

// COMMON ROUTES
const ErrorBoundary = lazy(() =>
  import('react-error-boundary').then(module => ({
    default: module.ErrorBoundary,
  })),
);

// PROJECTS ROUTES
const Projects = lazy(() =>
  import('@/pages/Projects/index.js').then(module => ({
    default: module.ProjectsContainer,
  })),
);
const TicTacToe = lazy(() =>
  import('@/pages/Apps/index.js').then(module => ({
    default: module.TicTacToe,
  })),
);
const Monsters = lazy(() =>
  import('@/pages/Apps/index.js').then(module => ({
    default: module.Monsters,
  })),
);
const KnowledgeHub = lazy(() =>
  import('@/pages/Projects/index.js').then(module => ({
    default: module.KnowledgeHub,
  })),
);

//APPLICATIONS ROUTES
const Applications = lazy(() =>
  import('@/pages/Apps/Container/Applications.js').then(module => ({
    default: module.Applications,
  })),
);

const TaskManagerApp = lazy(() =>
  import('@/pages/Apps/index.js').then(module => ({
    default: module.TaskManagerAppContent,
  })),
);
const EcommerceApp = lazy(() =>
  import('@/pages/Apps/index.js').then(module => ({
    default: module.InfinityEshop,
  })),
);

const ForgotPassword = lazy(() =>
  import('@/pages/Auth/Pages/ForgotPassword.js').then(module => ({
    default: module.ForgotPassword,
  })),
);
const RegisterPage = lazy(() =>
  import('@/pages/Auth/Pages/RegisterPage.js').then(module => ({
    default: module.RegisterPage,
  })),
);

const LoginPage = lazy(() =>
  import('@/pages/Auth/Pages/LoginForm.js').then(module => ({
    default: module.LoginForm,
  })),
);

const knowledgeHubPath = convertToPathURI([PATH_ROUTES.PROJECTS, PATH_ROUTES.KNOWLEDGE_HUB, '*']);

const taskManagerPath = convertToPathURI([
  PATH_ROUTES.APPLICATIONS,
  PATH_ROUTES.TASK_MANAGER_APP,
  '*',
]);

const ecommerceAppPath = convertToPathURI([
  PATH_ROUTES.APPLICATIONS,
  PATH_ROUTES.ECOMMERCE_APP,
  '*',
]);

const loginPagePath = convertToPathURI([PATH_ROUTES.LOGIN_PAGE, '*']);

const forgotPassPath = taskManagerPath.replace('*', PATH_ROUTES.FORGOT_PASSWORD);
const registerPath = taskManagerPath.replace('*', PATH_ROUTES.REGISTER_PAGE);

const CustomRouter = () => {
  return (
    <BrowserRouter>
      <RedirectRouter>
        <Layout>
          <Suspense
            fallback={
              <FullCenteredBox>
                <Spinner size="3rem" />
              </FullCenteredBox>
            }
          >
            <ErrorBoundary fallback={<ErrorPage />}>
              <Routes>
                <Route index element={<Home />} />
                <Route path="*" element={<NotFoundPage />} />

                {/* PROJECTS */}
                <Route path={convertToPathURI(PATH_ROUTES.PROJECTS)} element={<Projects />} />
                <Route path={knowledgeHubPath} element={<KnowledgeHub />} />

                <Route element={<ProtectedRouter />}>
                  {/* APPLICATIONS */}
                  <Route path={PATH_ROUTES.APPLICATIONS} element={<Applications />} />

                  <Route
                    path={convertToPathURI([PATH_ROUTES.APPLICATIONS, PATH_ROUTES.MONSTERS])}
                    element={<Monsters />}
                  />
                  <Route path={taskManagerPath} element={<TaskManagerApp />} />

                  <Route path={ecommerceAppPath} element={<EcommerceApp />} />

                  {/* In this block, we should wrap all components into our game context, and use State only in game scope*/}
                  <Route
                    path={convertToPathURI([PATH_ROUTES.APPLICATIONS, PATH_ROUTES.TIC_TAC_TOE])}
                    element={<TicTacToe />}
                  />
                </Route>

                {/* AUTH PAGES   */}
                <Route path={loginPagePath} element={<LoginPage />} />
                <Route path={forgotPassPath} element={<ForgotPassword />} />
                <Route path={registerPath} element={<RegisterPage />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </Layout>
      </RedirectRouter>
    </BrowserRouter>
  );
};

export { CustomRouter };
