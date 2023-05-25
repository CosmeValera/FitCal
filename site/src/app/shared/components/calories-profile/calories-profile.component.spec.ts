import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesProfileComponent } from './calories-profile.component';

describe('CaloriesProfileComponent', () => {
  let component: CaloriesProfileComponent;
  let fixture: ComponentFixture<CaloriesProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaloriesProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaloriesProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
