
import HttpActions from './HttpActions';
import { Todo } from './entities';

class Api {
  public todo: Todo;

  constructor() {
    const actions = new HttpActions();
    this.todo = new Todo(actions);
  }

}

export default Api;
