/*
  Typescript Code for the Login Component
  Author: Nikos Lardas
  Created: 12.2022
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Login component functionality variables
  loginForm!: FormGroup;
  userExists: boolean = true;

  constructor(private service: MainService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // loginForm definition with Validators
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  // Method to handle form submission
  formSubmit() {

    let currentUser = this.service.users.find(user => user.username === this.loginForm.get('username')?.value)

    // If the user name corresponds to an existing user
    if (currentUser != undefined) {
      
      // save user id in localStorage, assign user variable and navigate to home page
      localStorage.setItem("userId",currentUser.id.toString());
      this.service.currentUser = currentUser;

      this.router.navigateByUrl('/');

    } else {
      // otherwise assign variable to display error message
      this.userExists = false;
    }
  }
}