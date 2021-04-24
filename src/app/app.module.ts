import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import {HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {ToastrModule} from 'ngx-toastr';
import { PriorityPipe } from './share/pipe/priority.pipe';
import { SearchPipe } from './share/pipe/search.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from './share/modal/modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailComponent,
    TodoCreateComponent,
    PriorityPipe,
    SearchPipe,
    ModalDeleteComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgSelectModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        FormsModule,
        NgbModule,
    ],
  providers: [],
  entryComponents: [ModalDeleteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
