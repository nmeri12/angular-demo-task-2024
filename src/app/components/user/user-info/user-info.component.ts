import {Component, inject, input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../core/model/user.model';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../core/services/user.service';
import {AsyncPipe, UpperCasePipe} from '@angular/common';
import {LoadingComponent} from '../../../core/components/loading/loading.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    AsyncPipe,
    UpperCasePipe,
    LoadingComponent
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {

  public activeOffCanvas = inject(NgbActiveOffcanvas);
  public userID = input.required<number>();
  public user$: Observable<User>;

  private _userService = inject(UserService);

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  /**
   * fetch user infos
   */
  fetchUserInfo() {
    if(this.userID){
      this.user$ = this._userService.getUser(this.userID);
    }
  }

}
