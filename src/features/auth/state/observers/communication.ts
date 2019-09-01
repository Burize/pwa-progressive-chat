import { makeCommunicationObserver } from 'shared/helpers/reactive';

import * as NS from '../../namespace';
import { initialCommunication } from '../initial';
import { Subject } from 'rxjs';

export default function createCommunicationReducer(actions$: Subject<NS.Action>) {

  const loadingTodos = makeCommunicationObserver<NS.LoadTodos, NS.LoadTodosComplete, NS.LoadTodosFailed>(
    actions$,
    initialCommunication.loadingTodos,
    'MANAGE_TODOS:LOAD_TODOS',
    'MANAGE_TODOS:LOAD_TODOS_COMPLETE',
    'MANAGE_TODOS:LOAD_TODOS_FAILED',
  );

  const creatingTodo = makeCommunicationObserver<NS.CreateTodo, NS.CreateTodoComplete, NS.CreateTodosFailed>(
    actions$,
    initialCommunication.creatingTodo,
    'MANAGE_TODOS:CREATE_TODO',
    'MANAGE_TODOS:CREATE_TODO_COMPLETE',
    'MANAGE_TODOS:CREATE_TODO_FAILED',
  );

  const deletingTodo = makeCommunicationObserver<NS.DeleteTodo, NS.DeleteTodoComplete, NS.DeleteTodosFailed>(
    actions$,
    initialCommunication.deletingTodo,
    'MANAGE_TODOS:DELETE_TODO',
    'MANAGE_TODOS:DELETE_TODO_COMPLETE',
    'MANAGE_TODOS:DELETE_TODO_FAILED',
  );

  return {
    loadingTodos,
    creatingTodo,
    deletingTodo,
  };
}
