import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';

@Injectable({
  providedIn: 'root'
})
export class PostFormGuard implements CanDeactivate<PostFormComponent> {
  canDeactivate(component: PostFormComponent): boolean {

    if(component.postForm.dirty) {
      return confirm("Are you sure you want to navigate away and lose changes to the form?");
    }

    return true;
  }
  
}
