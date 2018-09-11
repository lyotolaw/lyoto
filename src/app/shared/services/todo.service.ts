import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

//importer les modules d'observation 
import { Observable, Subject} from 'rxjs';
import {TodoInterface} from './../interfaces/todo-interface';
import { Constants} from './../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  push(todo: TodoInterface): any {
    throw new Error("Method not implemented.");
  }
/**
 * Définit un Sujet observable de type TodoInterface
 */
  private todoSubject: Subject<TodoInterface> = new Subject <TodoInterface>();
  
  /**
   * Injection de dépendance HttpClient
   * @param _api: HttpClient Transport vers le backend
   */

  constructor(private _api: HttpClient) { }


  public getTodos(id: number = null): Observable<TodoInterface[]> {
    if (id !== null) {
     return this._api.get<TodoInterface[]>(
        Constants._API_ROOT + '/' + id
      );
    } else {
      return this._api.get<TodoInterface[]>(
        Constants._API_ROOT
      );
    }
  }
  /**
   * Insère un todo dans la base de données et diffuse le nouveau todo créé
   */
public addTodo (todo: TodoInterface) {
  this._api.post<TodoInterface[]>(
    Constants._API_ROOT,
    todo
  ).subscribe((addedTodo) => {
    addedTodo[0].isChecked = false;
    this.sendTodo(addedTodo[0]);

    const _emptyTodo = {
      title: '',
      begin: new Date(),
      end: new Date()
    };
    this.sendTodo(_emptyTodo);
  })
}

public deleteTodo (todo: TodoInterface):void {
this._api.delete(
  Constants._API_ROOT + '/' +todo.id
).subscribe((result) => {
  //NOOP
});
}

/**
 * Met à jour un todo
 * @param todo : TodoInterface : todo à mettre à jour 
 */
public updateTodo(todo: TodoInterface):void {
  this._api.put<TodoInterface>(
    Constants._API_ROOT + '/'+todo.id,
    todo
  ).subscribe((result)=> {
    // on n'oublie pas de transmettre le todo modifié
    const _emptyTodo = {
      title: '',
      begin: new Date(),
      end: new Date()
    };
    this.sendTodo(todo);
    this.sendTodo(_emptyTodo);
  });
  }




  /**
   * Méthode permettant aux autres classes de souscrire (s'abonner) le sujet 
   */
  public getTodo(): Observable<TodoInterface> {
    return this.todoSubject.asObservable();
  }

  /**
   * Diffuse le sujet vers les abonnés 
   * @param todo TodoInterface un todo qui passe par là
   */

   public sendTodo(todo:TodoInterface) {
     this.todoSubject.next(todo);
   }
}
