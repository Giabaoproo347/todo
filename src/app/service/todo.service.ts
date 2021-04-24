import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TodoModel} from '../model/todo.model';
import {API_URL} from '../share/constant';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(API_URL);
  }

  getPostById(id: string): Observable<TodoModel> {
    return this.http.get<TodoModel>(`${API_URL}/${id}`);
  }

  addPost(post: TodoModel): Observable<TodoModel> {
    return this.http.post(API_URL, post);
  }

  updatePost(id: string, body: TodoModel): Observable<TodoModel> {
    return this.http.put<TodoModel>(`${API_URL}/${id}`, body);
  }

  deletePostById(id: any): Observable<TodoModel> {
    return this.http.delete<TodoModel>(`${API_URL}/${id}`);
  }
}
