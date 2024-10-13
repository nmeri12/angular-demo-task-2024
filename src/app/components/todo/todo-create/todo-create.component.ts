import {Component, inject, OnInit} from '@angular/core';
import {AppService} from '../../../core/services/app.service';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../../core/services/alert.service';
import {TodoService} from '../../../core/services/todo.service';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [
    FormsModule,
    NgbAlertModule
  ],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.css'
})
export class TodoCreateComponent implements OnInit {

  public title: string = ''; //task title
  public loading = false;

  //inject services
  private _appService = inject(AppService);
  private _alertService = inject(AlertService);
  private _todoService = inject(TodoService);

  ngOnInit(): void {
    this._appService.setHeaderTitleSubject('Create New Todo');
  }

  /**
   * add new task
   */
  onSubmit() {
    const trimmedTitle = this.title.trim();
    if (!trimmedTitle) {
      this._alertService.toast('Please type a title!', 'error');
      return;
    } else {
      this.loading = true;
      this._todoService.createTodo(trimmedTitle).subscribe(
        value => {
          if (value) {
            this.title = ''; //Reset task title
            this._alertService.toast('Todo was created!', 'success')
            this.loading = false;
          }
        })
    }
  }
}
