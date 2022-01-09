import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { init } from '@rlaurente/nobe';
import { Todo } from '../services/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private todoService: TodoService
    , private toast: ToastController
    , private alert: AlertController) { }

  public todos: Todo[] = [];

  ngOnInit() {
    this.init();
  }

  async init() {
    try{
      const result = await init({
        git_url: 'https://<personal access token here>@github.com/rlaurente/sample-nobe-data.git',
        branch: 'master'
      });
      console.log(result)
    }catch(e){
      console.log('init failed');
    }

    this.getTodos();
  }

  async getTodos(){
    try {
      const todo_result = await this.todoService.GetListing();
      this.todos = todo_result;
    } catch (e) {
      console.log('e', e);
    }
  }

  async add() {
    const alert = await this.alert.create({
      header: `Add Todo`,
      inputs: [
        {
          type: 'text',
          placeholder: 'Title',
          name: 'title'
        },
        {
          type: 'textarea',
          placeholder: 'Description',
          name: 'description'
        },
      ],
      buttons: [
        {
          text: `Cancel`
        },
        {
          text: `Save`,
          handler: async data => {
            const toast = await this.toast.create({
              message: `Adding todo, please wait...`
            });
            toast.present();
            const is_saved = await this.todoService.Save(data);
            if (is_saved) {
              await this.getTodos();
            }
            toast.message = `Adding todo successful!`
            toast.duration = 2000;
          }
        }
      ]
    });
    alert.present();
  }

  async edit(item: Todo) {
    const alert = await this.alert.create({
      header: `Add Todo`,
      inputs: [
        {
          type: 'text',
          placeholder: 'Title',
          name: 'title',
          value: item.title
        },
        {
          type: 'textarea',
          placeholder: 'Description',
          name: 'description',
          value: item.description
        },
      ],
      buttons: [
        {
          text: `Cancel`
        },
        {
          text: `Save`,
          handler: async data => {
            const toast = await this.toast.create({
              message: `Saving todo, please wait...`
            });
            toast.present();
            const _data = {
              ...item,
              ...data
            };
            const is_saved = await this.todoService.Save(_data);
            if (is_saved) {
              await this.getTodos();
            }
            toast.message = `Saving todo successful!`
            toast.duration = 2000;
          }
        }
      ]
    });
    alert.present();
  }

  async delete(item: Todo) {
    const alert = await this.alert.create({
      header: `Delete todo`,
      message: `You are about to delete todo ${item.title}, Do you want to continue ?`,
      buttons: [
        {
          text: `Cancel`
        },
        {
          text: `Delete`,
          handler: async () => {
            const toast = await this.toast.create({
              message: `Deleting todo, please wait...`
            });
            toast.present();
            const is_deleted = await this.todoService.Delete(item);
            if (is_deleted) {
              await this.getTodos();
            }
            toast.message = `Deleting todo successful!`
            toast.duration = 2000;
          }
        },
      ]
    });
    alert.present();
  }

}
