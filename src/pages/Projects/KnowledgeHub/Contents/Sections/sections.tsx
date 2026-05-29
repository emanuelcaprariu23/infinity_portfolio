import { TabContentI } from '../../interfaces';
import {
  IntroductionAuthContent,
  PasswordBasedAuthContent,
  TokenBasedAuthWithJWTContent,
} from '../Tabs/pages/AuthStrategies';
import { ReferenceValuesWithRefContent } from '../Tabs/pages/EscapeHatches';
import {
  UseActionStateContent,
  UseCallbackContent,
  UseContextContent,
  UseCustomHookContent,
  UseDebugValueContent,
  UseDeferredValueContent,
  UseEffectContent,
  UseEffectEventContent,
  UseIdContent,
  UseImperativeHandleContent,
  UseLayoutEffectContent,
  UseMemoContent,
  UseOptimisticContent,
  UseReducerContent,
  UseRefContent,
  UseStateContent,
  UseTransitionContent,
} from '../Tabs/pages/Hooks';
import { GeneralContent } from '../Tabs/pages/ReactRouterV7';

const HOOKS_TABS_PAGES: TabContentI[] = [
  {
    title: 'useState',
    variant: 'STATE',
    children: <UseStateContent />,
  },
  {
    title: 'useReducer',
    variant: 'STATE',
    children: <UseReducerContent />,
  },
  {
    title: 'useCallback',
    variant: 'MEMO',
    children: <UseCallbackContent />,
  },
  {
    title: 'useMemo',
    variant: 'MEMO',
    children: <UseMemoContent />,
  },
  {
    title: 'useEffect',
    variant: 'EFFECT',
    children: <UseEffectContent />,
  },
  {
    title: 'useEffectEvent',
    variant: 'EFFECT',
    children: <UseEffectEventContent />,
  },
  {
    title: 'useLayoutEffect',
    variant: 'EFFECT',
    children: <UseLayoutEffectContent />,
  },
  {
    title: 'useContext',
    variant: 'CONTEXT',
    children: <UseContextContent />,
  },
  {
    title: 'useRef',
    variant: 'REF',
    children: <UseRefContent />,
  },
  {
    title: 'useImperativeHandle',
    variant: 'REF',
    children: <UseImperativeHandleContent />,
  },
  {
    title: 'useTransition',
    variant: 'TRANSITION',
    children: <UseTransitionContent />,
  },
  {
    title: 'useDeferredValue',
    variant: 'TRANSITION',
    children: <UseDeferredValueContent />,
  },
  {
    title: 'useOptimistic',
    variant: 'TRANSITION',
    children: <UseOptimisticContent />,
  },
  {
    title: 'useActionState',
    variant: 'TRANSITION',
    children: <UseActionStateContent />,
  },
  {
    title: 'useId',
    variant: 'GENERAL',
    children: <UseIdContent />,
  },
  {
    title: 'useDebugValue',
    variant: 'GENERAL',
    children: <UseDebugValueContent />,
  },
  {
    title: 'useCustomHook',
    variant: 'CUSTOM',
    children: <UseCustomHookContent />,
  },
];

const REACT_ROUTER_TABS_PAGES: TabContentI[] = [
  {
    title: 'General Content',
    variant: 'REACT_ROUTER_v7',
    children: <GeneralContent />,
  },
];

const AUTH_STRATEGIES_TABS_PAGES: TabContentI[] = [
  {
    title: '01 Introduction to Auth',
    variant: 'AUTH_STRATEGIES',
    children: <IntroductionAuthContent />,
  },
  {
    title: '02 Password based Auth',
    variant: 'AUTH_STRATEGIES',
    children: <PasswordBasedAuthContent />,
  },
  {
    title: '03 Token Based Auth With Jwt',
    variant: 'AUTH_STRATEGIES',
    children: <TokenBasedAuthWithJWTContent />,
  },
];

const ESCAPE_HATCHES_TABS_PAGES: TabContentI[] = [
  {
    title: 'How to remember information without re-rendering ',
    variant: 'ESCAPE_HATCHES',
    children: <ReferenceValuesWithRefContent />,
  },
];

export {
  AUTH_STRATEGIES_TABS_PAGES,
  ESCAPE_HATCHES_TABS_PAGES,
  HOOKS_TABS_PAGES,
  REACT_ROUTER_TABS_PAGES,
};
