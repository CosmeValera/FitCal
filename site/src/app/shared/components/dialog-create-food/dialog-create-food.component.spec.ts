import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateFoodComponent } from './dialog-create-food.component';

describe('DialogCreateFoodComponent', () => {
  let component: DialogCreateFoodComponent;
  let fixture: ComponentFixture<DialogCreateFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateFoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
