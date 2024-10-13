import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, UpperCasePipe} from '@angular/common';
import {UserService} from '../../../core/services/user.service';
import {Observable} from 'rxjs';
import {USER_TABLE_HEADERS} from '../../../core/model/user_table_header';
import {LoadingComponent} from '../../../core/components/loading/loading.component';
import {AppService} from '../../../core/services/app.service';
import {NgbOffcanvas, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from '@angular/router';
import {UserInfoComponent} from '../user-info/user-info.component';
import {InitialsPipe} from '../../../core/pipes/initials.pipe';
import {CustomFilterPipe} from '../../../core/pipes/custom-filter.pipe';
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import {User} from '../../../core/model/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    UpperCasePipe,
    AsyncPipe,
    LoadingComponent,
    NgbTooltip,
    RouterLink,
    InitialsPipe,
    CustomFilterPipe,
    FormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  public users$: Observable<User[]>;
  public headers: string[] = USER_TABLE_HEADERS;
  public searchText: string = '';

  private _userService = inject(UserService);
  private _appService = inject(AppService);
  private _offCanvasService = inject(NgbOffcanvas);

  ngOnInit() {
    this._appService.setHeaderTitleSubject('user list'); //set header title
    this.fetchUsers();
  }

  /**
   * fetch users
   * @private
   */
  private fetchUsers() {
    this.users$ = this._userService.getAllUsers();
  }

  /**
   * open user info sidebar
   * @param id
   */
  onViewUser(id: number) {
    const offCanvasRef = this._offCanvasService.open(UserInfoComponent);
    offCanvasRef.componentInstance.userID = id;
  }

  /**
   * delete uesr
   * @param id
   */
  onDelete(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(id).subscribe(value => {
          if (value) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted",
              icon: "success"
            });
          }
        })
      }
    });
  }
}
