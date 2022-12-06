/*
  Typescript Code for the Home Component
  Author: Nikos Lardas
  Created: 12.2022

  Note: The UserPosts array that is stored in localStorage 
  should be encrypted for security reasons
*/


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

  // Home component functionality variables
  users!: User[];
  posts!: Post[];
  userPosts: UserPost[] = [];
  loading: boolean = true;
  userLoggedIn: boolean = false;
  currentUser!: User;
  postAction: String = "";
  showMessage: boolean = true;
  
  // Pagination variables declaration/definition
  numberOfPages!: number;
  currentPage: number = 1;
  currentIndex: number = 10;
  paginatedResults!: UserPost[];

  constructor(private service: MainService, private router: Router) {}

  ngOnInit(): void {

    // Get user Id from localStorage
    let currentUserId = localStorage.getItem("userId");

    // Get latest action of user
    this.postAction = this.service.postAction;

    // Fetch data from API endpoints through service method
    this.service.getAllData().subscribe({
      next: data => {
        // Assign response values
        this.users = data[0];
        this.posts = data[1];
        this.service.users = this.users;

        // If user is logged in, assign user variables
        if (currentUserId != null) {
          this.service.currentUser = this.users.find(user => user.id.toString() == currentUserId)!;
          this.userLoggedIn = true;
          this.currentUser = this.service.currentUser;
        }
      },
      error: error => console.log(error),
      complete: () => {

        // If localStorage does not contain userPosts (e.g. First application load)
        // call method for creating userPosts
        if (localStorage.getItem('userPosts') == null) {
          this.createUserPosts(currentUserId);
        } else {
          // Retrieve userPosts and assign variables
          this.userPosts = JSON.parse(localStorage.getItem('userPosts')!);
          this.loading = false;
          this.service.userPosts = this.userPosts;

          // If user logged in, sort UserPosts to display the current user posts first
          if (currentUserId != null) this.sortForUser();

          // Paginate UserPosts
          this.handlePagination();
        }
      }
    });

    // Display corresponding message for user action
    if(this.postAction != '') {
      this.showSuccessMessage();
    }
  }

  // Method to create userPosts based on array of user and posts from API
  createUserPosts(currentUserId: String | null) {
        
    for (let user of this.users) {
      for (let post of this.posts) {
        if(user.id == post.userId) this.userPosts.push(
          new UserPost(user.name,user.company.name,post.title,post.body,`http://www.${user.website}`)
        );
      }
    }

    // Store userPosts in localStorage
    localStorage.setItem("userPosts", JSON.stringify(this.userPosts));

    //sort UserPosts
    if (currentUserId != null) this.sortForUser();
    
    this.loading = false;
    this.service.userPosts = this.userPosts;

    this.handlePagination();
  }

  // Method to sort userPosts to show posts of current user first
  sortForUser() {
    this.userPosts.sort((n1,n2) => {

      if ((n1.fullname == this.currentUser.name) && n2.fullname != this.currentUser.name) {
          return -1;
      }
  
      if ((n1.fullname != this.currentUser.name) && n2.fullname == this.currentUser.name) {
          return 1;
      }
  
      return 0;
    });
  }

  // Method to paginate userPosts
  handlePagination() {
    this.numberOfPages = Math.ceil(this.userPosts.length/10);
    this.paginatedResults = this.userPosts.slice(this.currentIndex - 10, this.currentIndex);
  }

  // Method to navigate to Login page
  navigateLogin() {
    this.router.navigateByUrl('/login');
  }

  // Method to navigate to Add Post page
  navigateAddPost() {
    this.service.newPost = true;
    this.router.navigateByUrl('/post/add');
  }

  // Method to navigate to Edit Post page
  navigateEditForm(currentPost: UserPost) {
    this.service.newPost = false;
    this.service.currentPost = currentPost;
    this.router.navigateByUrl('/post/edit');
  }

  // Method to logout and refresh page
  logout() {
    localStorage.removeItem("userId");
    window.location.reload();
  }

  // Method to navigate to the previous Table Page
  navigatePreviousPage() {
    // If the user is not on the first Table Page
    if ((this.currentPage - 1) >= 1) {

      // Reduce currentPage by one
      this.currentPage = this.currentPage - 1;

      // Load previous 10 userPosts
      this.paginatedResults = this.userPosts.slice(this.currentIndex - 20, this.currentIndex - 10);
      
      // Move the list index accordingly
      this.currentIndex = this.currentIndex - 10;
    }
  }

  // Method to navigate to the next Table Page
  navigateNextPage() {
    
    // If the user is not on the last Table Page
    if ((this.currentPage + 1) <= this.numberOfPages) {

      // Increase currentPage by one
      this.currentPage = this.currentPage + 1;

      // Load next 10 userPosts
      this.paginatedResults = this.userPosts.slice(this.currentIndex, this.currentIndex + 10);
      
      // Move the list index accordingly
      this.currentIndex = this.currentIndex + 10;
    }
  }

  // Method to temporarily display success message for user action  
  showSuccessMessage() {
    setTimeout( () => {
      this.showMessage = false;;
   }, 5000);
   this.service.postAction = '';
  }
}