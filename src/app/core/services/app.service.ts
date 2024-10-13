import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _headerTitleSubject = new BehaviorSubject('');//default title value
  public _headerTitleSubject$ = this._headerTitleSubject.asObservable();


  /**
   * set page header title
   * @param value
   */
  setHeaderTitleSubject(value: string) {
    this._headerTitleSubject.next(value)
  }
}
