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
  loading: boolean = true;
  userLoggedIn: boolean = false;
  currentUser!: User;
  postAction: String = "";
  
  // Pagination variables
  numberOfPages!: number;
  currentPage: number = 1;
  currentIndex: number = 10;
  paginatedResults!: UserPost[];

  constructor(private service: MainService, private router: Router) {}

  ngOnInit(): void {

    let currentUserId = localStorage.getItem("userId");

    this.postAction = this.service.postAction;

    // Double check everything works correctly!!!!
    // Maybe separate things to different methods to be clear
    // UserPosts in localStorage should be encrypted
    // Recheck how I'm checking what happened before and posting message (postAction)
    // Clear all files, then make comments and submit

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
      },
      error: error => console.log(error),
      complete: () => {
        if (localStorage.getItem('userPosts') == null) {
          this.createUserPosts();
        } else {
          this.userPosts = JSON.parse(localStorage.getItem('userPosts')!);
          this.loading = false;
          this.service.userPosts = this.userPosts
          this.handlePagination();
        }
      }
    });
  }

  createUserPosts() {
        
    for (let user of this.users) {
      for (let post of this.posts) {
        if(user.id == post.userId) this.userPosts.push(new UserPost(user.name,user.company.name,post.title,post.body,`http://www.${user.website}`));
      }
    }

    localStorage.setItem("userPosts", JSON.stringify(this.userPosts));
    
    this.loading = false;
    this.service.userPosts = this.userPosts;

    this.handlePagination();
  }

  handlePagination() {
    this.numberOfPages = Math.ceil(this.userPosts.length/10);
    this.paginatedResults = this.userPosts.slice(this.currentIndex - 10, this.currentIndex);
  }

  navigateLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateAddPost() {
    this.router.navigateByUrl('/post/add');
  }

  navigateEditForm(currentPost: UserPost) {

    this.service.currentPost = currentPost;
    this.router.navigateByUrl('/post/edit');
  }

  logout() {
    localStorage.removeItem("userId");
    window.location.reload();
  }

  // Navigate to the previous Table Page
  navigatePreviousPage() {
    // If the user is not on the First Table Page
    if ((this.currentPage - 1) >= 1) {

      // Reduce currentPage by one
      this.currentPage = this.currentPage - 1;

      // Load previous 10 Article Records
      this.paginatedResults = this.userPosts.slice(this.currentIndex - 20, this.currentIndex - 10);
      
      // Move the list index accordingly
      this.currentIndex = this.currentIndex - 10;
    }
  }

  // Navigate to the next Table Page
  navigateNextPage() {

    if ((this.currentPage + 1) <= this.numberOfPages) {

      // Increase currentPage by one
      this.currentPage = this.currentPage + 1;

      // Load next 10 Article Records
      this.paginatedResults = this.userPosts.slice(this.currentIndex, this.currentIndex + 10);
      
      // Move the list index accordingly
      this.currentIndex = this.currentIndex + 10;
    }
  }
}