import { Post } from './../model/post';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  getUsersUrl: string = "https://jsonplaceholder.typicode.com/users";
  getPostsUrl: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}

  getUserData(): Observable<User[]> {

    return this.http.get<User[]>(this.getUsersUrl)
      .pipe(
        retry(1),
        catchError(error => throwError(() => `Something went wrong: ${error}`))
      );
  }

  getPostData(): Observable<Post[]> {

    return this.http.get<Post[]>(this.getPostsUrl)
      .pipe(
        retry(1),
        catchError(error => throwError(() => `Something went wrong: ${error}`))
      );
  }
}