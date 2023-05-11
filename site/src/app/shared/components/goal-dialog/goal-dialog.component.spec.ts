import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDialogComponent } from './goal-dialog.component';

describe('GoalDialogComponent', () => {
  let component: GoalDialogComponent;
  let fixture: ComponentFixture<GoalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
