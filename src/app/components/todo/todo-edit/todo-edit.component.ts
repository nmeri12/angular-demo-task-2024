import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe, CommonModule} from '@angular/common';
import {LoadingComponent} from '../../../core/components/loading/loading.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../core/services/app.service';
import {TodoService} from '../../../core/services/todo.service';
import {AlertService} from '../../../core/services/alert.service';
import {Observable, tap} from 'rxjs';
import {Todo} from '../../../core/model/todo.model';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncPipe,
    LoadingComponent
  ],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.css'
})
export class TodoEditComponent implements OnInit {
  public todo$: Observable<Todo>;
  public form:  FormGroup ;
  public submitted = false;
  public loading = false;

  private _route = inject(ActivatedRoute);
  private _appService = inject(AppService);
  private _todoService = inject(TodoService);
  private _alertService = inject(AlertService);
  private _router = inject(Router);
  private _fb = inject(FormBuilder);

  ngOnInit(): void {
    this._appService.setHeaderTitleSubject('edit todo');
    this.initializeForm();
    this.fetchTodo();
  }

  /**
   * Initializes form
   */
  private initializeForm(): void {
    this.form = this._fb.group({
      title: ['', Validators.required],
      id: [{ value: '', disabled: true }],
      userId: [{ value: '', disabled: true }],
      completed: [false]
    });
  }

  /**
   * fetch selected task
   */
  private fetchTodo() {
    const todoId = this._route.snapshot.paramMap.get('id');
    if (todoId) {
      const parsedUserId = Number(todoId);
      if (!isNaN(parsedUserId)) {
        this.todo$ = this._todoService.getTodo(parsedUserId).pipe(
          tap(todo => {
            this.form.patchValue({
              id: todo.id,
              userId: todo.userId,
              title: todo.title,
              completed: todo.completed
            });
          })
        );
      } else {
        this._alertService.dialog('Invalid todo ID');
      }
    } else {
      this._alertService.dialog('Todo ID not found');
      // or navigate to err page
    }
  }


  /**
   * Get form controls
   */

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  /**
   * edit task and navigate to user todos list
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const updatedTodo: Todo = {...this.form.getRawValue(), id: this.form.get('id')!.value};
    this._todoService.updateTodo(updatedTodo).subscribe(value => {
      const userID = this.form.get('userId')!.value;
      if (userID && value) {
        this._alertService.toast('Todo was updated!', 'success');
        this.loading = false;
        this._router.navigate([`/users/${userID}/todos`]);
      }
    });
  }

}
