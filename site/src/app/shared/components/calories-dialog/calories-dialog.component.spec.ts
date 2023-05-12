import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesDialogComponent } from './calories-dialog.component';

describe('CaloriesDialogComponent', () => {
  let component: CaloriesDialogComponent;
  let fixture: ComponentFixture<CaloriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaloriesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaloriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
