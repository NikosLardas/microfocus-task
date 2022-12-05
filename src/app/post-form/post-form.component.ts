import { UserPost } from './../model/user-post';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { MainService } from '../services/main.service';

// import * from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { PostFormGuard } from '../guards/post-form.guard';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm!: FormGroup;
  currentUser!: User;
  currentPost!: UserPost;
  newPost: boolean = true;

  deleteConfirmModal!: bootstrap.Modal;
  navigateAwayConfirmModal!: bootstrap.Modal;

  constructor(private service: MainService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      message: ['', [Validators.required, Validators.maxLength(2000)]]
    });

    this.currentUser = this.service.currentUser;
    this.currentPost = this.service.currentPost;

    if (this.currentPost != null) {
      this.fillData();
    }
  }

  formSubmit() {

    let title = this.postForm.get('title')?.value;
    let message = this.postForm.get('message')?.value;

    if (this.newPost) {

      let newUserPost: UserPost = new UserPost(
        this.currentUser.name,
        this.currentUser.company.name,
        title,
        message,
        `http://www.${this.currentUser.website}`);

      this.service.userPosts.unshift(newUserPost);

    } else {

      let currentPostIndex = this.service.userPosts.indexOf(this.currentPost);

      // Get form values
      this.currentPost.title = title;
      this.currentPost.body = message;

      this.service.userPosts[currentPostIndex] = this.currentPost;
    }

    localStorage.setItem("userPosts", JSON.stringify(this.service.userPosts));

    this.router.navigateByUrl("/");
  }

  fillData() {
    this.postForm.get('title')?.setValue(this.currentPost.title);
    this.postForm.get('message')?.setValue(this.currentPost.body);

    this.newPost = false;
  }

  deletePost() {

    this.deleteConfirmModal.hide();

    let currentPostIndex = this.service.userPosts.indexOf(this.currentPost);

    this.service.userPosts.splice(currentPostIndex, 1);

    localStorage.setItem("userPosts", JSON.stringify(this.service.userPosts));

    this.router.navigateByUrl("/");

  }

  openModal(element: any) {
    this.deleteConfirmModal = new bootstrap.Modal(element, {});
    this.deleteConfirmModal?.show();
  }

  navigateHome() {
    this.router.navigateByUrl("/");
  }

}