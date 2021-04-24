import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {TodoDetailComponent} from '../todo-detail/todo-detail.component';
import {TodoCreateComponent} from '../todo-create/todo-create.component';
import {HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent
  },
  {
    path: 'detail/:id',
    component: TodoDetailComponent
  },
  {
    path: 'create',
    component: TodoCreateComponent
  },
  {
    path: 'edit/:id',
    component: TodoCreateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatDatepickerModule
  ]
})

export class TodoModule {
}
