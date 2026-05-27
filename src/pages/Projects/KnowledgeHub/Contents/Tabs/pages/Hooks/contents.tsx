import { PageContentI } from '@/pages/Projects/KnowledgeHub/interfaces';
import { UseCustomBasic } from './Custom/Examples';
import {
  ErrorHandleExample,
  ExposingActionProps,
  ImmediateUpdate,
  UseActionStateBasicExample,
  UseFormActionProps,
} from './UseActionState/Examples';
import { NoSkippingRerendering, SkippingReRendering } from './UseCallback/Examples';
import { AuthExample, BasicUseContext } from './UseContext/Examples';
import { UseDebugValueExample } from './UseDebugValue/Examples';
import { BasicUseDeferredValue, PreventBlockingUI } from './UseDeferredValue/Examples';
import { Basic, CounterEffect } from './UseEffect/Examples';
import {
  ChatRoomExample,
  EventListenerExample,
  UsingCustomHookExample,
  UsingTimerExample,
} from './UseEffectEvent/Examples';
import { BasicExample as BasicUseId } from './UseId/Examples';
import { CustomMethodsExample, UseImperativeHandleExample } from './UseImperativeHandle/Examples';
import { UseLayoutEffectBasic } from './UseLayoutEffect/Examples';
import { NoSkipReRenderUseMemo, SkipReRenderingUseMemo, WrapComponent } from './UseMemo/Examples';
import {
  ActionPropsExample,
  BasicReducerExample,
  HardcodedValue,
  PropsValue,
  ReducerShoppingExample,
  ReducerValue,
} from './UseOptimistic/Examples';
import { BasicExample, TodoListExample } from './UseReducer/Examples';
import { BasicUseRef, CounterRef, ManipulateDOM, ParentRef } from './UseRef/Examples';
import {
  ArrayExample,
  CounterExample,
  SwordCursor,
  UpdateNestedObjectsExample,
} from './UseState/Examples';
import {
  BasicUseTransition,
  ErrorPageExample,
  PendingVisualEffect,
} from './UseTransition/Examples';

const DASH_SPLIT_STRING = '-';
const SLASH_SPLIT_STRING = '/';

const USE_STATE_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'array-example-id',
    title: 'Array Example',
    children: <ArrayExample />,
  },
  {
    elementId: 'counter-example-id',
    title: 'Updater Function for setState',
    children: <CounterExample />,
  },
  {
    elementId: 'use-nested-objects-example-id',
    title: 'Use Nested Objects Example With Immer',
    children: <UpdateNestedObjectsExample />,
  },
  {
    elementId: 'update-objects-example-id',
    title: 'Update Objects Properly with useState',
    children: <SwordCursor />,
  },
];

const USE_REDUCER_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example',
    children: <BasicExample />,
  },
  {
    elementId: 'todo-list-example-id',
    title: 'Todo List Example',
    children: <TodoListExample />,
    defaultOpen: true,
  },
];

const USE_EFFECT_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseEffect',
    children: <Basic />,
  },
  {
    elementId: 'counter-example-id',
    title: 'Counter Example UseEffect',
    children: <CounterEffect />,
  },
];

const USE_CONTEXT_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseContext',
    children: <BasicUseContext />,
  },
  {
    elementId: 'auth-context-example-id',
    title: 'Auth Context Example',
    children: <AuthExample />,
  },
];

const USE_REF_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseRef',
    children: <BasicUseRef />,
  },
  {
    elementId: 'counter-example-id',
    title: 'Counter Example UseRef',
    children: <CounterRef />,
  },
  {
    elementId: 'manipulate-dom-example-id',
    title: 'Manipulate DOM Example UseRef',
    children: <ManipulateDOM />,
  },
  {
    elementId: 'parent-ref-example-id',
    title: 'Parent Ref Example UseRef',
    children: <ParentRef />,
  },
];

const USE_CALLBACK_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'skipping-rerendering-example-id',
    title: 'Skipping Re-rendering Example UseCallback',
    children: <SkippingReRendering />,
  },
  {
    elementId: 'no-skipping-rerendering-example-id',
    title: 'No Skipping Re-rendering Example',
    children: <NoSkippingRerendering />,
  },
];

const USE_MEMO_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'no-skipping-rerendering-example-id',
    title: 'No Skipping Re-rendering Example UseMemo',
    children: <NoSkipReRenderUseMemo />,
  },
  {
    elementId: 'skipping-rerendering-example-id',
    title: 'Skipping Re-rendering Example UseMemo',
    children: <SkipReRenderingUseMemo />,
  },
  {
    elementId: 'example-container-id',
    title: 'Example Container UseMemo',
    children: <WrapComponent />,
  },
];

const USE_TRANSITION_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseTransition',
    children: <BasicUseTransition />,
  },
  {
    elementId: 'pending-visual-effect-id',
    title: 'Pending Visual Effect Example',
    children: <PendingVisualEffect />,
  },
  {
    elementId: 'error-page-example-id',
    title: 'Error Page Example',
    children: <ErrorPageExample />,
  },
];

const USE_DEFERRED_VALUE_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseDeferredValue',
    children: <BasicUseDeferredValue />,
  },
  {
    elementId: 'prevent-blocking-ui',
    title: 'Prevent blocking UI by using useDeferredValue',
    children: <PreventBlockingUI />,
  },
];

const USE_OPTIMISTIC_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'hardcoded-example-id',
    title: 'Hardcoded value example UseOptimistic',
    children: <HardcodedValue />,
  },
  {
    elementId: 'props-value-example-id',
    title: 'Props Value Example UseOptimistic',
    children: <PropsValue />,
  },
  {
    elementId: 'basic-reducer-value-example-id',
    title:
      'Basic Reducer example with useOptimistic, usefully when you want to have up to date the state',
    children: <BasicReducerExample />,
  },
  {
    elementId: 'reducer-value-example-id',
    title: 'Reducer Value Example UseOptimistic',
    children: <ReducerValue />,
  },
  {
    elementId: 'reducer-shopping-example-id',
    title: 'Another example with reducer in addition with UseOptimistic',
    children: <ReducerShoppingExample />,
  },
  {
    elementId: 'action-props-example-id',
    title: 'Action props Example UseOptimistic',
    children: <ActionPropsExample />,
  },
];

const USE_ID_HOOK_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseId',
    children: <BasicUseId />,
  },
];

const USE_IMPERATIVE_HANDLE_HOOK_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseImperativeHandle',
    children: <UseImperativeHandleExample />,
  },
  {
    elementId: 'custom-methods-example-id',
    title: 'Multiple methods Example UseImperativeHandle',
    children: <CustomMethodsExample />,
  },
];

const USE_ACTION_STATE_HOOK_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseActionState',
    children: <UseActionStateBasicExample />,
  },
  {
    elementId: 'immediate-update-id',
    title: 'Update UI immediately by useOptimistic in addition with UseActionState',
    children: <ImmediateUpdate />,
  },
  {
    elementId: 'exposing-action-props-id',
    title: 'Exposing action props Example',
    children: <ExposingActionProps />,
  },
  {
    elementId: 'form-action-props-id',
    title: 'Form action props Example',
    children: <UseFormActionProps />,
  },
  {
    elementId: 'error-handle-id',
    title: 'Error Handle Example',
    children: <ErrorHandleExample />,
  },
];

const USE_EFFECT_EVENT_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'ChatRoom Example UseEffectEvent Hook',
    children: <ChatRoomExample />,
  },
  {
    elementId: 'timer-example-id',
    title: 'Timer Example UseEffectEvent Hook',
    children: <UsingTimerExample />,
  },
  {
    elementId: 'event-listener-example-id',
    title: 'Event Listener Example UseEffectEvent Hook',
    children: <EventListenerExample />,
  },
  {
    elementId: 'using-in-custom-hook-example-id',
    title: 'Using in custom hook Example with UseEffectEvent',
    children: <UsingCustomHookExample />,
  },
];

const USE_LAYOUT_EFFECT_EVENT_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseLayoutEffect Hook',
    children: <UseLayoutEffectBasic />,
  },
];

const USE_DEBUG_VALUE_HOOK_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseDebugValueExample',
    children: <UseDebugValueExample />,
  },
];

const USE_CUSTOM_HOOK_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'basic-example-id',
    title: 'Basic Example UseCustomHook',
    children: <UseCustomBasic />,
  },
];

export {
  DASH_SPLIT_STRING,
  SLASH_SPLIT_STRING,
  USE_ACTION_STATE_HOOK_PAGE_CONTENTS,
  USE_CALLBACK_PAGE_CONTENTS,
  USE_CONTEXT_PAGE_CONTENTS,
  USE_CUSTOM_HOOK_PAGE_CONTENTS,
  USE_DEBUG_VALUE_HOOK_PAGE_CONTENTS,
  USE_DEFERRED_VALUE_PAGE_CONTENTS,
  USE_EFFECT_EVENT_PAGE_CONTENTS,
  USE_EFFECT_PAGE_CONTENTS,
  USE_ID_HOOK_PAGE_CONTENTS,
  USE_IMPERATIVE_HANDLE_HOOK_PAGE_CONTENTS,
  USE_LAYOUT_EFFECT_EVENT_PAGE_CONTENTS,
  USE_MEMO_PAGE_CONTENTS,
  USE_OPTIMISTIC_PAGE_CONTENTS,
  USE_REDUCER_PAGE_CONTENTS,
  USE_REF_PAGE_CONTENTS,
  USE_STATE_PAGE_CONTENTS,
  USE_TRANSITION_PAGE_CONTENTS,
};
