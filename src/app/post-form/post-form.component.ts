/*
  Typescript Code for the Post Form Component
  Author: Nikos Lardas
  Created: 12.2022
*/

import { UserPost } from './../model/user-post';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { MainService } from '../services/main.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  // Post Form component functionality variables
  postForm!: FormGroup;
  currentUser!: User;
  currentPost!: UserPost;
  newPost: boolean = true;
  formSubmitted: boolean = false;

  // Confirmation of userPost deletion Modal
  deleteConfirmModal!: bootstrap.Modal;

  constructor(private service: MainService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    // Post form definition with Validators
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      message: ['', [Validators.required, Validators.maxLength(2000)]]
    });

    this.currentUser = this.service.currentUser;
    this.currentPost = this.service.currentPost;
    this.newPost = this.service.newPost;
    this.formSubmitted = false;

    // If post is being edited, fill form field values
    if (!this.newPost) {
      this.fillData();
    }
  }

  // Method to handle form submission
  formSubmit() {

    this.formSubmitted = true;

    // Get form values
    let title = this.postForm.get('title')?.value;
    let message = this.postForm.get('message')?.value;

    if (this.newPost) {

      // Create new userPost based on form values
      let newUserPost: UserPost = new UserPost(
        this.currentUser.name,
        this.currentUser.company.name,
        title,
        message,
        `http://www.${this.currentUser.website}`);

      // Add new userPost to beginning of userPosts array
      this.service.userPosts.unshift(newUserPost);
      // Define user action
      this.service.postAction = "create";

    } else {

      // Retrieve current userPost index
      let currentPostIndex = this.service.userPosts.indexOf(this.currentPost);

      // Replace currentPost values with form values
      this.currentPost.title = title;
      this.currentPost.body = message;

      // Replace userPost with updated userPost
      this.service.userPosts[currentPostIndex] = this.currentPost;
      // Define user action
      this.service.postAction = "update";
    }

    // Updated userPosts in localStorage
    localStorage.setItem("userPosts", JSON.stringify(this.service.userPosts));

    // Navigate to home page
    this.router.navigateByUrl("/");
  }

  // Method to fill form values with userPost data on edit state
  fillData() {
    this.postForm.get('title')?.setValue(this.currentPost.title);
    this.postForm.get('message')?.setValue(this.currentPost.body);
  }

  // Method to delete a userPost
  deletePost() {

    this.formSubmitted = true;
    // If user confirmed the userPost deletion, hide moda
    this.deleteConfirmModal.hide();

    // Remove userPost from userPosts array and save the updated array to localStorage
    let currentPostIndex = this.service.userPosts.indexOf(this.currentPost);
    this.service.userPosts.splice(currentPostIndex, 1);
    localStorage.setItem("userPosts", JSON.stringify(this.service.userPosts));

    // Define user action
    this.service.postAction = "delete"
    // Navigate to Home page    
    this.router.navigateByUrl("/");
  }

  // Method to show modal for delete userPost confirmation
  openModal(element: any) {
    this.deleteConfirmModal = new bootstrap.Modal(element, {});
    this.deleteConfirmModal?.show();
  }

  // Method to navigate back to home page
  navigateHome() {
    this.router.navigateByUrl("/");
  }
}