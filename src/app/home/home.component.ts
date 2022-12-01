import { UserPost } from './../model/user-post';
import { Post } from './../model/post';
import { User } from './../model/user';
import { MainService } from '../services/main.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  userLoggedIn: boolean = false;
  currentUser!: User;
  loading: boolean = true;

  constructor(private service: MainService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    if(this.firstLoad) {
      
      this.firstLoad = false;

      this.service.getAllData().subscribe({
        next: data => {
          this.users = data[0];
          this.posts = data[1];
        },
        error: error => console.log(error),
        complete: () => this.createUserPosts()
      });
    }
  }

  createUserPosts() {
        
    for (let user of this.users) {
      for (let post of this.posts) {
        if(user.id === post.userId) this.userPosts.push(new UserPost(user.name,user.company.name,post.title,post.body,`http://www.${user.website}`));
      }
    }
    
    this.loading = false;
    this.service.userPosts = this.userPosts;
  }

  navigatePostForm() {
    this.router.navigateByUrl('/login');
  }
}