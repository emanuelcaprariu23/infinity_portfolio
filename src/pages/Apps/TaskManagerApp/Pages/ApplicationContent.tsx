import { PageContentList } from '@/pages/Projects/KnowledgeHub/Contents/Tabs/pages/components';
import { FlexWithGapBox } from '@/Shared/Utils/Helpers/styled-components';
import React from 'react';
import TaskManagerApp from '../Components/TaskManagerApp';
import WelcomeHead from '../Components/WelcomeHead';
import { AUTH_TASK_MANAGER_APP_CONTENTS } from '../constants';

const ApplicationContent: React.FC = () => {
  return (
    <FlexWithGapBox>
      <WelcomeHead />
      <PageContentList pageContentList={AUTH_TASK_MANAGER_APP_CONTENTS} />
      <TaskManagerApp />
    </FlexWithGapBox>
  );
};

ApplicationContent.displayName = 'ApplicationContent';

export default ApplicationContent;
