/*
    Typescript Code for the Post Form Guard
    Author: Nikos Lardas
    Created: 12.2022
*/

import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';

@Injectable({
  providedIn: 'root'
})
export class PostFormGuard implements CanDeactivate<PostFormComponent> {

  // Display confirmation dialog if user navigates away
  // from the form with unsaved data
  canDeactivate(component: PostFormComponent): boolean {

    if(component.postForm.dirty && !component.formSubmitted) {
      return confirm("Are you sure you want to navigate away and lose your changes to the form?");
    }

    return true;
  } 
}