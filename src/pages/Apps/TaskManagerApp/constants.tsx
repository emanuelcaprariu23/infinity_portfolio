import { PageContentI } from '@/pages/Projects/KnowledgeHub/interfaces';
import IntroductionContent from './Components/IntroductionContent';

const AUTH_TASK_MANAGER_APP_CONTENTS: PageContentI[] = [
  {
    elementId: 'introduction-auth-task-manager-app',
    title: 'Introduction Auth Task Manager App',
    children: <IntroductionContent />,
  },
];

export { AUTH_TASK_MANAGER_APP_CONTENTS };
