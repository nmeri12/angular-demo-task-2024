import {Component, inject, OnInit} from '@angular/core';
import {Todo} from '../../../core/model/todo.model';
import {AsyncPipe, JsonPipe, NgClass} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '../../../core/services/app.service';
import {UserService} from '../../../core/services/user.service';
import {AlertService} from '../../../core/services/alert.service';
import {Observable} from 'rxjs';
import {LoadingComponent} from '../../../core/components/loading/loading.component';
import {TodoToolbarComponent} from '../todo-toolbar/todo-toolbar.component';
import Swal from 'sweetalert2';
import {TodoService} from '../../../core/services/todo.service';
import {Constants} from '../../../core/utils/Constants';

@Component({
  selector: 'app-todo-grid',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    RouterLink,
    NgbTooltip,
    LoadingComponent,
    NgClass,
    TodoToolbarComponent
  ],
  templateUrl: './todo-grid.component.html',
  styleUrl: './todo-grid.component.css'
})
export class TodoGridComponent implements OnInit {
  public todList$: Observable<Todo[]>;
  public columnsPerRow = Constants.DEFAULT_ITEMS_PER_ROW;

  private _route = inject(ActivatedRoute);
  private _appService = inject(AppService);
  private _userService = inject(UserService);
  private _todoService = inject(TodoService);
  private _alertService = inject(AlertService);

  ngOnInit(): void {
    this.setHeaderTitle(); //set header title
    this.fetchUserTodos();

  }

  setHeaderTitle() {
    this._appService.setHeaderTitleSubject('user Todos list');

  }

  /**
   * fetch user todos list
   * @private
   */
  private fetchUserTodos() {
    const userId = this._route.snapshot.paramMap.get('id');

    if (!userId) {
      this._alertService.dialog(Constants.ALERT_USER_ID_NOT_FOUND);
      return;
    }

    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      this._alertService.dialog(Constants.ALERT_INVALID_USER_ID);
      return;
    }

    this.todList$ = this._userService.getUserTodos(parsedUserId);
  }

  /**
   * @param option
   * Update the number of items per row
   */
  updateGridSize(option: number): void {
    this.columnsPerRow = option;
  }

  /**
   * @param id
   * delete task
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
        this._todoService.deleteTodo(id).subscribe(value => {
          if (value) {
            Swal.fire({
              title: "Deleted!",
              text: "Todo has been deleted",
              icon: "success"
            });
          }
        })
      }
    });
  }
}
