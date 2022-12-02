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

  // Search Form variable declaration
  loginForm!: FormGroup;
  userExists: boolean = true;

  constructor(private service: MainService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  formSubmit() {

    let currentUser = this.service.users.find(user => user.username === this.loginForm.get('username')?.value)

    if (currentUser != undefined) {

      localStorage.setItem("userId",currentUser.id.toString());
      this.service.currentUser = currentUser;

      this.router.navigateByUrl('/');

    } else {
      this.userExists = false;
    }
  }
}