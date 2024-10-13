import {Routes} from '@angular/router';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {TodoEditComponent} from './components/todo/todo-edit/todo-edit.component';
import {ErrorComponent} from './core/components/error/error.component';
import {TodoCreateComponent} from './components/todo/todo-create/todo-create.component';
import {TodoGridComponent} from './components/todo/todo-grid/todo-grid.component';

export const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UserListComponent},
  {path: 'users/:id/todos', component: TodoGridComponent},
  {path: 'todos/create', component: TodoCreateComponent},
  {path: 'todos/edit/:id', component: TodoEditComponent},
  {path: '**', component: ErrorComponent}
];
