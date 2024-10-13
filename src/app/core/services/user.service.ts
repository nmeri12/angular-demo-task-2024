import {inject, Injectable, InputSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from '../model/todo.model';
import {catchError, Observable} from 'rxjs';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private _http = inject(HttpClient);

  /**
   * Fetch all users
   * @return user list
   */
  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._apiUrl}`);
  }

  /**
   * get single user
   */
  getUser(id: InputSignal<number>): Observable<User> {
    return this._http.get<User>(`${this._apiUrl}/${id}`);
  }

  /**
   * fetch user Todos
   * @param userId
   * @return todos list of desired user
   */
  getUserTodos(userId: number): Observable<Todo[]> {
    return this._http.get<Todo[]>(`${this._apiUrl}/${userId}/todos`);
  }

  /**
   * delete existing user
   * @param userId
   * @return message
   */
  deleteUser(userId: number): Observable<string> {
    return this._http.delete<string>(`${this._apiUrl}/${userId}`);
  }

}
