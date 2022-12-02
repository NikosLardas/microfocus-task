import { UserPost } from './../model/user-post';
import { Post } from './../model/post';
import { User } from './../model/user';
import { MainService } from '../services/main.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users!: User[];
  posts!: Post[];
  userPosts: UserPost[] = [];
  firstLoad: boolean = true;
  loading: boolean = true;
  userLoggedIn: boolean = false;
  currentUser!: User;

  constructor(private service: MainService, private router: Router) { }

  ngOnInit(): void {

    let currentUserId = localStorage.getItem("userId");

    // I could potentially add the user handling in 
    // a different separate method to be called from onInit
    
    if(sessionStorage.getItem("loaded") == null) {
      
      this.firstLoad = false;

      this.service.getAllData().subscribe({
        next: data => {
          this.users = data[0];
          this.posts = data[1];
          this.service.users = this.users;

          if (currentUserId != null) {
            this.service.currentUser = this.users.find(user => user.id.toString() == currentUserId)!;
            this.userLoggedIn = true;
            this.currentUser = this.service.currentUser;
          }

          sessionStorage.setItem("loaded","true");
        },
        error: error => console.log(error),
        complete: () => this.createUserPosts()
      });
    } else {

      if(currentUserId != null) {
        this.userLoggedIn = true;
        this.currentUser = this.service.currentUser;
      }
      this.createUserPosts();
      this.loading = false;
    }
  }

  createUserPosts() {
        
    for (let user of this.users) {
      for (let post of this.posts) {
        if(user.id == post.userId) this.userPosts.push(new UserPost(user.name,user.company.name,post.title,post.body,`http://www.${user.website}`));
      }
    }
    
    this.loading = false;
    this.service.userPosts = this.userPosts;
  }

  navigatePostForm() {
    this.router.navigateByUrl('/login');
  }
}