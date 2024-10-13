import {Component, inject, OnInit, signal} from '@angular/core';
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

  public title = signal('');
  public loading = signal(false);

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
    const trimmedTitle = this.title().trim();
    if (!trimmedTitle) {
      this._alertService.toast('Please type a title!', 'error');
      return;
    } else {
      this.loading.set(true);
      this._todoService.createTodo(trimmedTitle).subscribe(
        value => {
          if (value) {
            this.title.set(''); //Reset task title
            this._alertService.toast('Todo was created!', 'success')
            this.loading.set(false);
          }
        })
    }
  }
}
