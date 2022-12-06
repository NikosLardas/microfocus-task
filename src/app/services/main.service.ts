/*
  Typescript Code for the Main Service
  Author: Nikos Lardas
  Created: 12.2022
*/

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

  // Main Service variables for application functionality and API calls
  getUsersUrl: string = "https://jsonplaceholder.typicode.com/users";
  getPostsUrl: string = "https://jsonplaceholder.typicode.com/posts";
  users!: User[];
  userPosts!: UserPost[];
  currentUser!: User;
  currentPost!: UserPost;
  newPost: boolean = true;
  postAction: String = "";

  constructor(private http: HttpClient) {}

  // Method to retrieve the data from the two API endpoints,
  // and group them together with forkJoin to be used on Home component
  getAllData(): Observable<any> {

    return forkJoin([this.http.get<User[]>(this.getUsersUrl),this.http.get<Post[]>(this.getPostsUrl)]).pipe(
      // retry api calls one more time in case of failure
      retry(1),
      // catch and display possible errors
      catchError(error => throwError(() => `Something went wrong: ${error}`))
    );;
  }
}