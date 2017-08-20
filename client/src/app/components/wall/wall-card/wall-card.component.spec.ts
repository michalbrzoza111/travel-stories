import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallCardComponent } from './wall-card.component';

describe('WallCardComponent', () => {
  let component: WallCardComponent;
  let fixture: ComponentFixture<WallCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
