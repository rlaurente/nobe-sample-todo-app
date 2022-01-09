import { Injectable } from '@angular/core';
import { Todo } from '../services/todo.model';
import { findIndex } from 'underscore';
import { apply, get, mock, set } from '@rlaurente/nobe';

@Injectable({
  providedIn: 'root'
})
export class TodoMockService {

  constructor() { }

  Init() {
    mock({
      url: 'https://sample.app/api/todos/listing',
      handler: () => this.GetListing()
    });

    mock({
      url: 'https://sample.app/api/todos/save',
      handler: data => this.Save(data)
    })

    mock({
      url: 'https://sample.app/api/todos/delete',
      handler: data => this.Delete(data)
    })
  }

  async GetListing(): Promise<any> {
    const todos = await get({
      key: `todos`
    });
    if (todos && todos.length > 0) {
      return {
        data: todos as Todo[]
      };
    }
    return [];
  }

  async Save(todo: Todo): Promise<boolean> { //  add | update todo
    let todos = await get({
      key: `todos`
    });
    if (!todos) {
      todos = [];
    }

    if (todo.id) {
      const index = findIndex(todos, item => {
        return item.id == todo.id;
      });
      if (index > -1) {
        todos[index] = todo;
      }
    } else {
      todos.push({
        ...todo,
        id: new Date().getTime()
      });
    }

    const result = await set({
      key: 'todos',
      data: todos
    });

    apply();
    return result;
  }

  async Delete(todo: Todo): Promise<boolean> {  //  delete todo
    let todos = await get({
      key: `todos`
    });
    if (!todos) {
      todos = [];
    }

    const index = findIndex(todos, item => {
      return item.id == todo.id;
    });
    if (index > -1) {
      todos.splice(index, 1);
    }
    const result = await set({
      key: `todos`,
      data: todos
    });

    apply();
    return result;
  }
}
