import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostDialogComponent } from './user-post-dialog.component';

describe('UserPostDialogComponent', () => {
  let component: UserPostDialogComponent;
  let fixture: ComponentFixture<UserPostDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPostDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
