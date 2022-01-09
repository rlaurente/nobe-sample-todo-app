import { Injectable, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { findIndex } from 'underscore'
import { apply, get, mock, request, set } from '@rlaurente/nobe';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  async GetListing(): Promise<Todo[]> {     //  getting todo list

    mock({
      url: `https://sample.app/api/todos/listing`,
      handler: async () => {
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
    })

    const result = await request({
      url: `https://sample.app/api/todos/listing`,
      method: `GET`
    });
    let todos = [];
    if (result.data && result.data.length > 0) {
      todos = result.data as Todo[];
    }
    return todos;
  }

  async Save(todo: Todo): Promise<boolean> { //  add | update todo
    try {
      mock({
        url: 'https://sample.app/api/todos/save',
        handler: async todo => {
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
      })

      const result = await request({
        url: `https://sample.app/api/todos/save`,
        method: `POST`,
        data: todo
      });
      return true;
    } catch (e) {
      return false;
    }

  }

  async Delete(todo: Todo): Promise<boolean> {  //  delete todo
    try {

      mock({
        url: 'https://sample.app/api/todos/delete',
        handler: async todo =>{
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
      });

      const result = await request({
        url: `https://sample.app/api/todos/delete`,
        method: `POST`,
        data: todo
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
