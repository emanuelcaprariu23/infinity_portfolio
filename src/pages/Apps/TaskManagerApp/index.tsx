import { FlexWithGapBox } from '@/Shared/Utils/Helpers/styled-components';
import React from 'react';
import ApplicationContent from './Pages/ApplicationContent';

const TaskManagerAppContent: React.FC = () => {
  return (
    <FlexWithGapBox sx={{ padding: '20px', gap: '4px', flexGrow: 1 }}>
      <ApplicationContent />
    </FlexWithGapBox>
  );
};

TaskManagerAppContent.displayName = 'TaskManagerAppContent';
export { TaskManagerAppContent };
