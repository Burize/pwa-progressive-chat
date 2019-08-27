import { ITodosState } from '../namespace';
import { initialCommunicationField } from 'shared/helpers/reactive';

export const initialDataState: ITodosState = {
  todos: [],
};

export const initialCommunication = {
  loadingTodos: initialCommunicationField,
  creatingTodo: initialCommunicationField,
  deletingTodo: initialCommunicationField,
};
