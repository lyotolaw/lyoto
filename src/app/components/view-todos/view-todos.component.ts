import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { TodoService} from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';


@Component({
  selector: 'view-todos',
  templateUrl: './view-todos.component.html',
  styleUrls: ['./view-todos.component.scss']
})
export class ViewTodosComponent implements OnInit {
  
/**
 * @var todos: TodoInterface[]
 * Tableau des todos
 */

/**
 * @var aTodo: String
 * Nouveau todo à ajouter à notre tableau
 */

public aTodo: String;

  /**
 * Abonnement à un todo qui vient de l'espace (meuh non... de TodoService)
 */
  private todoSubscription: Subscription;


public checkedStatus : Boolean;

  /**
   * Tableau de todos à afficher
   * @var TodoInterface[]
   */
  public todos: TodoInterface[];

  constructor(private todoService:TodoService) { 
    
    this.todos = []; //Définit le tableau des todos à afficher
    
    this.todoSubscription = this.todoService.getTodo()
      .subscribe((todo)=> {
        console.log('Observable Todo : '+ JSON.stringify(todo));
        //Ajoute le todo à la liste des todos
       // s'il n'existe pas déjà...
       //Attention, s'il existe, je dois remplacer par les nouvelles valeurs
       const index = this.todos.findIndex((obj) => obj.id == todo.id);
        if (index === -1 && todo.hasOwnProperty('id')) {
          this.todos.push(todo);
        }else {
          this.todos[index]= todo;
        }       
    });
  }

  /**
   * Après construction de l'objet, on charge la liste des  todos existant dans la base
   */
  ngOnInit() {
    // récupère les todos existants dans la base 
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log ('Il y a ' + this.todos.length + ' todos à afficher');
    });
  }

public delete (index: number):void {
  
  const _todo = this.todos[index]; // récupère le todo
  this.todos.splice(index, 1); // dépile l'élément du tableau 
  this.todoService.deleteTodo(_todo); // appelle le service
}


public toggle(index:number): void {
this.todos[index].isChecked = !this.todos[index].isChecked;
}
/**
* Supprimer les todos cochés
*/

public deleteCheckedTwo() {
const _todos: TodoInterface[]=[];
for (const todo of this.todos) {
 if (!todo.isChecked) {
   _todos.push(todo);
 } else {
   this.todoService.deleteTodo(todo);
 }
}
this.todos = _todos;
}
/**
* Détermine si aucune boite est cochée
*/
public noneChecked(): Boolean {
let status: Boolean = true;
for (const todo of this.todos) {
  if (todo.isChecked) {
status = false;
  }
}
return status;
}
/**
* Détermine si le bouton "Ajouter" doit être actif ou non 
*/
public notEnoughForMe(): Boolean {
return this.aTodo.length >= 5 ? false : true;
}

public checkUnCheckAll() {
this.checkedStatus = !this.checkedStatus;
// Appelle la méthode privée pour changer le statut des todos
this._check();
}


/**
* Détermine l'état d'un todo checked or not
* @param TodoInterface todo le todo à tester
*/
public isChecked(todo: TodoInterface): Boolean {
return todo.isChecked;
}

public update(todo: TodoInterface):void {
  console.log('Modif du todo : ' + todo.id);
  this.todoService.sendTodo(todo);
}


private _check():void {
for (let index = 0; index < this.todos.length; index ++) {
  this.todos[index].isChecked = this.checkedStatus;
}
}

}
