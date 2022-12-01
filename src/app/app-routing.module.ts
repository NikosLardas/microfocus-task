import { ErrorPageComponent } from './error-page/error-page.component';
import { PostFormComponent } from './post-form/post-form.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Routing Paths defined with corresponding components
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post/add', component: PostFormComponent},
  { path: 'post/edit', component: PostFormComponent},
  { path: '**', component: ErrorPageComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }