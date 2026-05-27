import { PageContentList } from '@/pages/Projects/KnowledgeHub/Contents/Tabs/pages/components';
import React from 'react';
import TaskManagerApp from '../Components/TaskManagerApp';
import { AUTH_TASK_MANAGER_APP_CONTENTS } from '../constants';

const ApplicationContent: React.FC = () => {
  return (
    <>
      <PageContentList pageContentList={AUTH_TASK_MANAGER_APP_CONTENTS} />
      <TaskManagerApp />
    </>
  );
};

ApplicationContent.displayName = 'ApplicationContent';

export default ApplicationContent;
