import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService} from '../service/todo.service';
import {TodoModel} from '../model/todo.model';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  post: TodoModel | any;

  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById() {
    const id = this.route.snapshot.params.id;
    this.todoService.getPostById(id).subscribe(res => {
      if (res) {
        this.post = res;
      }
    });
  }

  editPost() {
    const id = this.post.id;
    this.router.navigate([`/todo/edit/${id}`]);
  }

  back() {
    this.router.navigate(['/todo']);
  }
}
