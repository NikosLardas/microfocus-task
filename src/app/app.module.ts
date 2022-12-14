import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainService } from './services/main.service';
import { PostFormComponent } from './post-form/post-form.component';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PostFormGuard } from './guards/post-form.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostFormComponent,
    LoginComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MainService,PostFormGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }