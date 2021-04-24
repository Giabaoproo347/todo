import {Component, OnInit} from '@angular/core';
import {TodoService} from '../service/todo.service';
import {TodoModel} from '../model/todo.model';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalDeleteComponent} from '../share/modal/modal-delete/modal-delete.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  post: TodoModel[] = [];
  posts$: BehaviorSubject<TodoModel[]> = new BehaviorSubject<TodoModel[]>([]);
  idActive: string = '';
  isChecked: boolean = false;
  searchTitle: string = '';
  checkedList: any[] = [];

  constructor(private todoService: TodoService,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    const postsCached: TodoModel[] | any = localStorage.getItem('posts');
    if (postsCached) {
      this.post = JSON.parse(postsCached);
      this.post.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      this.posts$.next(this.post);
    } else {
      this.todoService.getPosts().subscribe((response) => {
        if (response) {
          this.post = response;
          this.post.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
          this.posts$.next(this.post);
          localStorage.setItem('posts', JSON.stringify(this.post));
        }
      });
    }
  }

  navigateToDetail(post: TodoModel) {
    this.router.navigate([`/todo/detail/${post.id}`]);
  }

  removePost(post: TodoModel) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.result.then(res => {
      if (res == 'OK') {
        this.todoService.deletePostById(post.id).subscribe(res => {
          if (res) {
            this.toastrService.success('Deleted post success', 'Success');
            this.clearCached();
            this.getPosts();
          } else {
            this.toastrService.error('Occur error', 'Error');
          }
        });
      }
    });
  }

  onChangeCheckbox(post: TodoModel, event: any) {
    if (event.target.checked) {
      this.checkedList.push(post.id);
      console.log(this.checkedList, 'checkList');
    } else {
      this.checkedList.splice(this.checkedList.indexOf(post.id), 1);
      console.log(this.checkedList, 'checkList');
    }
  }

  removeAllPost() {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.result.then(res => {
      if (res == 'OK') {
        this.checkedList.forEach(r => {
          if (r) {
            this.todoService.deletePostById(r).subscribe(res => {
              if (res) {
                this.toastrService.success('Removed success', 'Success');
                this.clearCached();
                this.getPosts();
              }
            });
          }
        });
      }
    });

  }

  clearCached() {
    localStorage.removeItem('posts');
  }
}
