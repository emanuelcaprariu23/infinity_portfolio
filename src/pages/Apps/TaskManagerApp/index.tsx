import { FlexWithGapBox } from '@/Shared/Utils/Helpers/styled-components';
import React from 'react';
import ApplicationContent from './Pages/ApplicationContent';
import LoginForm from './Pages/LoginForm';
import { useAuthStore, useAuthStoreLocalStorage } from './store/authStore';

const TaskManagerAppContent: React.FC = () => {
  const { user } = useAuthStoreLocalStorage();
  const { user: localUser } = useAuthStore();

  return (
    <FlexWithGapBox sx={{ padding: '20px', gap: '4px', flexGrow: 1 }}>
      {user || localUser ? <ApplicationContent /> : <LoginForm />}
    </FlexWithGapBox>
  );
};

TaskManagerAppContent.displayName = 'TaskManagerAppContent';
export { TaskManagerAppContent };
