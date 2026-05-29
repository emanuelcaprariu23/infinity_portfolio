import { useLocalStorage } from '@/Shared/Hooks';
import { FlexWithGapBox } from '@/Shared/Utils/Helpers/styled-components';
import { theme } from '@/theme';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { SendHorizontal, Trash } from 'lucide-react';
import React, { startTransition, useOptimistic, useState } from 'react';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES, TASK_MANAGER_APP_LOCAL_STORAGE_KEYS } from '../constants';
import { useAuthHook } from '../hooks/useAuthHook';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  sending?: boolean; // optimistic flag
}

type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'delete'; id: number }
  | { type: 'edit'; id: number };

// Fake API calls
const fakeAddTodo = (text: string): Promise<Todo> =>
  new Promise(resolve =>
    setTimeout(() => resolve({ id: Date.now(), text, completed: false }), 1000),
  );

const fakeToggleTodo = (id: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, 1000));

const fakeDeleteTodo = (id: number): Promise<void> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log('deleted', id);
      if (id !== 1) resolve();
      else reject();
    }, 1000),
  );

// Reducer passed as 2nd arg to useOptimistic
const todosReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.text,
          completed: false,
          sending: true, // mark as optimistic
        },
      ];
    case 'toggle':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed, sending: true } : todo,
      );
    case 'delete':
      return state.map(x => {
        if (x.id === action.id) {
          return { ...x, sending: true };
        }

        return x;
      });
    default:
      return state;
  }
};

const TaskManagerApp: React.FC = () => {
  const { getItem, setItem, removeItem } = useLocalStorage();
  const [newTodoValue, setNewTodoValue] = useState('');

  const localTodos = getItem(TASK_MANAGER_APP_LOCAL_STORAGE_KEYS.taskManagerAppTodos) as
    | Todo[]
    | null;

  const [todos, setTodos] = useState<Todo[]>(localTodos || []);

  const [error, setError] = useState<string | null>(null);
  const [optimisticTodos, optimisticDispatch] = useOptimistic(todos, todosReducer);

  const { user } = useAuthHook();

  const handleAdd = (text: string) => {
    startTransition(async () => {
      optimisticDispatch({ type: 'add', text }); // UI updates immediately

      const newTodo = await fakeAddTodo(text); // wait for server

      setTodos(prev => [...prev, newTodo]); // commit real state
      setItem(TASK_MANAGER_APP_LOCAL_STORAGE_KEYS.taskManagerAppTodos, [
        ...optimisticTodos,
        newTodo,
      ]);
    });
  };

  const handleToggle = (id: number) => {
    startTransition(async () => {
      optimisticDispatch({ type: 'toggle', id }); // UI updates immediately

      await fakeToggleTodo(id);
      setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));

      setItem(
        TASK_MANAGER_APP_LOCAL_STORAGE_KEYS.taskManagerAppTodos,
        optimisticTodos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    });
  };

  const handleDelete = (id: number) => {
    setError(null);
    startTransition(async () => {
      optimisticDispatch({ type: 'delete', id }); // UI updates immediately

      try {
        await fakeDeleteTodo(id);
        setTodos(prev => prev.filter(x => x.id !== id));

        const result = todos.filter(x => x.id !== id);

        if (result.length === 0)
          removeItem(TASK_MANAGER_APP_LOCAL_STORAGE_KEYS.taskManagerAppTodos);
        else setItem(TASK_MANAGER_APP_LOCAL_STORAGE_KEYS.taskManagerAppTodos, result);
      } catch {
        setError('Cannot delete. Permission denied.');
      }
    });
  };

  const addNewTodoOnChangeHandler = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const { value } = ev.target;

    setNewTodoValue(value);
  };

  const addNewTodoOnClickHandler = () => {
    if (!user?.isVerified) {
      toast(ERROR_MESSAGES.VALIDATE_USER, {
        type: 'info',
      });
      return;
    }

    handleAdd(newTodoValue);
    setNewTodoValue('');
  };

  const addNewTodoOnKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;

    if (key === 'Enter' && !optimisticTodos.some(x => x.sending)) {
      addNewTodoOnClickHandler();
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: theme.custom.specialPalette?.variant[300],
        borderRadius: '10px',
        boxShadow: theme.custom.boxShadows?.tertiary,
      }}
    >
      <Typography variant="h6">Let s add some todos!!!</Typography>
      <div style={{ minHeight: '400px', width: '100%', overflowY: 'auto', maxHeight: '400px' }}>
        <ul>
          {optimisticTodos.map(todo => (
            <li key={todo.id} style={{ opacity: todo.sending ? 0.5 : 1 }}>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '10px 0',
                }}
              >
                <span
                  onClick={() => handleToggle(todo.id)}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  {todo.text}
                </span>
                {todo.sending && <small> — saving...</small>}
                <Trash
                  onClick={() => handleDelete(todo.id)}
                  size={'1.5em'}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </li>
          ))}
          {error && <p style={{ color: 'red', padding: 8, background: '#fee' }}>{error}</p>}
        </ul>
      </div>
      <FlexWithGapBox sx={{ flexDirection: 'row' }}>
        <TextField
          sx={{ width: '100%' }}
          value={newTodoValue}
          onChange={addNewTodoOnChangeHandler}
          onKeyDown={addNewTodoOnKeyDownHandler}
        />
        <IconButton
          sx={{ width: '50px', height: '50px' }}
          disabled={optimisticTodos.some(x => x.sending) || !user?.isVerified}
          onClick={addNewTodoOnClickHandler}
        >
          <SendHorizontal />
        </IconButton>
      </FlexWithGapBox>
    </Box>
  );
};

TaskManagerApp.displayName = 'TaskManagerApp';

export default TaskManagerApp;
