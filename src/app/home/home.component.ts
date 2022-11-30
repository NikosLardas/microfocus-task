import { UserPost } from './../model/user-post';
import { Post } from './../model/post';
import { User } from './../model/user';
import { MainService } from '../services/main.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private service:MainService) { }

  ngOnInit(): void {
    
    if(this.firstLoad) {
      
      this.firstLoad = false;

      this.service.getUserData().subscribe({
        next: data => {
          this.users = data;
          console.log(this.users);
        },
        error: error => console.log(error),
        complete: () => this.getPostsData()
      });

    }
  }

  getPostsData() {
    this.service.getPostData().subscribe({
      next: data => {
        this.posts = data;
        console.log(this.posts);
      },
      error: error => console.log(error),
      complete: () => this.createUserPosts()
    });
  }

  createUserPosts() {
        
    for (let user of this.users) {
      for (let post of this.posts) {
        if(user.id === post.userId) this.userPosts.push(new UserPost(user.name,user.company.name,post.title,post.body));
      }
    }
  }
  
}