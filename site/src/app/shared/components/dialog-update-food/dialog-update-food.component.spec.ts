import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateFoodComponent } from './dialog-update-food.component';

describe('DialogUpdateFoodComponent', () => {
  let component: DialogUpdateFoodComponent;
  let fixture: ComponentFixture<DialogUpdateFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateFoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
