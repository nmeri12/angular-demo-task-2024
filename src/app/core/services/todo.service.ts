import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private _http = inject(HttpClient);

  /**
   * create new Todo
   * @param title
   */
  createTodo(title:string): Observable<Todo> {
    return this._http.post<Todo>(`${this._apiUrl}`, title);
  }

  /**
   * get task
   * @param id
   */
  getTodo(id: number): Observable<Todo> {
    return this._http.get<Todo>(`${this._apiUrl}/${id}`);
  }

  /**
   * update existing task
   * @param todo
   */
  updateTodo(todo: Todo): Observable<String> {
    return this._http.put<String>(`${this._apiUrl}/${todo.id}`, todo);
  }

  /**
   * delete existing Task
   * @param id
   * @return message
   */
  deleteTodo(id: number): Observable<string> {
    return this._http.delete<string>(`${this._apiUrl}/${id}`);
  }

}
