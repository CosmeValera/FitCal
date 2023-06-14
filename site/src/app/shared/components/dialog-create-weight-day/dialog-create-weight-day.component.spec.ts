import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateWeightDayComponent } from './dialog-create-weight-day.component';

describe('DialogCreateWeightDayComponent', () => {
  let component: DialogCreateWeightDayComponent;
  let fixture: ComponentFixture<DialogCreateWeightDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateWeightDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateWeightDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
