import { Component } from '@angular/core';
import { TodoInterface } from './shared/interfaces/todo-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent {
  public title: String = 'myTodo List';
}