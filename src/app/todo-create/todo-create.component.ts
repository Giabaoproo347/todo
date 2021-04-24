import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NORMAL, PRIORITY_LIST} from '../share/constant';
import {DateAdapter} from '@angular/material/core';
import {TodoService} from '../service/todo.service';
import {TodoModel} from '../model/todo.model';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {

  postForm: FormGroup;
  priorityList = PRIORITY_LIST;
  isUpdate: boolean = false;
  today = new Date();
  posts: TodoModel[] = [];
  post: TodoModel | any;
  idActive: any;


  constructor(private fb: FormBuilder,
              private dateAdapter: DateAdapter<Date>,
              private todoService: TodoService,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
    this.dateAdapter.setLocale('en-GB');
    this.postForm = this.fb.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['']
    });

    this.postForm.patchValue({
      dueDate: this.today,
      priority: NORMAL
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.idActive = param.get('id');
    });
    this.isUpdate = !!this.idActive;

    if (!this.isUpdate) {
      this.getPosts();
    } else {
      this.getPost();
    }
  }

  onSubmit() {
    if (!this.isUpdate) {
      let postsLen = this.posts.length;
      this.form.id.setValue(postsLen + 1);
      let post: TodoModel;
      post = this.postForm.value;
      this.todoService.addPost(post).subscribe(res => {
        if (res) {
          this.toastrService.success('Added post success', 'Success');
          localStorage.removeItem('posts');
        } else {
          this.toastrService.error('Occur error', 'Error');
        }
      });
    } else {
      this.todoService.updatePost(this.idActive, this.postForm.value).subscribe(res => {
        if (res) {
          this.toastrService.success('Updated post success', 'Success');
          localStorage.removeItem('posts');
        } else {
          this.toastrService.error('Occur error', 'Error');
        }
      });
    }
    this.back();
  }

  getPosts() {
    const postsCached: TodoModel[] | any = localStorage.getItem('posts');
    if (postsCached) {
      this.posts = JSON.parse(postsCached);
    } else {
      this.todoService.getPosts().subscribe((response) => {
        if (response) {
          this.posts = response;
          localStorage.setItem('posts', JSON.stringify(this.posts));
        }
      });
    }
  }

  getPost() {
    this.todoService.getPostById(this.idActive).subscribe(res => {
      if (res) {
        this.post = res;
        this.postForm.patchValue({
          id: this.post.id,
          title: this.post.title,
          description: this.post.description,
          dueDate: this.post.dueDate,
          priority: this.post.priority
        });
        console.log(this.post);
      }
    });
  }

  get form() {
    return this.postForm.controls;
  }

  back() {
    this.router.navigate(['/todo']);
  }

}
