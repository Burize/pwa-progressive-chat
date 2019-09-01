import getDeps from 'core/getDeps';
import { getErrorMessage } from 'shared/helpers/error';

import { actions$ } from './entry';
import { ITodoCreationFields } from '../namespace';

const { api } = getDeps();

export function loadTodos() {
  actions$.next({ type: 'MANAGE_TODOS:LOAD_TODOS' });
  api.todo.loadTodos().subscribe(
    todos => {
      actions$.next({ type: 'MANAGE_TODOS:LOAD_TODOS_COMPLETE', payload: { todos } });
    },
    error => {
      actions$.next({ type: 'MANAGE_TODOS:LOAD_TODOS_FAILED', error: getErrorMessage(error) });
    },
  );
}

export function createTodo(creationFields: ITodoCreationFields) {
  actions$.next({ type: 'MANAGE_TODOS:CREATE_TODO', payload: creationFields });
  api.todo.createTodo(creationFields).subscribe(
    todo => {
      actions$.next({ type: 'MANAGE_TODOS:CREATE_TODO_COMPLETE', payload: { todo } });
    },
    error => {
      actions$.next({ type: 'MANAGE_TODOS:CREATE_TODO_FAILED', error: getErrorMessage(error) });
    },
  );
}

export function deleteTodo(todoId: string) {
  actions$.next({ type: 'MANAGE_TODOS:DELETE_TODO', payload: { todoId } });
  api.todo.deleteTodo(todoId).subscribe(
    _ => {
      actions$.next({ type: 'MANAGE_TODOS:DELETE_TODO_COMPLETE', payload: { todoId } });
    },
    error => {
      actions$.next({ type: 'MANAGE_TODOS:DELETE_TODO_FAILED', error: getErrorMessage(error) });
    },
  );
}
