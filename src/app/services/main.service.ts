import { Post } from './../model/post';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { UserPost } from '../model/user-post';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  getUsersUrl: string = "https://jsonplaceholder.typicode.com/users";
  getPostsUrl: string = "https://jsonplaceholder.typicode.com/posts";
  userPosts!: UserPost[];

  constructor(private http: HttpClient) {}

  getAllData(): Observable<any> {
    return forkJoin([this.http.get<User[]>(this.getUsersUrl),this.http.get<Post[]>(this.getPostsUrl)]);
  }
}