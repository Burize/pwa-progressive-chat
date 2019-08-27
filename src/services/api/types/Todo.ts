import { ITodo } from 'shared/types/models';

export interface IServerTodo {
  id: string;
  title: string;
  body: string;
}

export type FieldForTodoCreation = Omit<ITodo, 'id'>;

export type CreateTodoRequest = Omit<IServerTodo, 'id'>;
