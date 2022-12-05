import { TestBed } from '@angular/core/testing';

import { PostFormGuard } from './post-form.guard';

describe('PostFormGuard', () => {
  let guard: PostFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PostFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
