import { Post } from './../model/post';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, retry, catchError, throwError } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { UserPost } from '../model/user-post';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  getUsersUrl: string = "https://jsonplaceholder.typicode.com/users";
  getPostsUrl: string = "https://jsonplaceholder.typicode.com/posts";
  users!: User[];
  userPosts!: UserPost[];
  currentUser!: User;
  currentPost!: UserPost;
  postAction: String = "";

  constructor(private http: HttpClient) {}

  getAllData(): Observable<any> {

    return forkJoin([this.http.get<User[]>(this.getUsersUrl),this.http.get<Post[]>(this.getPostsUrl)]).pipe(
      // retry api calls one more time in case of failure
      retry(1),
      // catch and display possible errors
      catchError(error => throwError(() => `Something went wrong: ${error}`))
    );;
  }
}