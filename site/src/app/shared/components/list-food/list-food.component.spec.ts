import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodComponent } from './list-food.component';

describe('ListFoodComponent', () => {
  let component: ListFoodComponent;
  let fixture: ComponentFixture<ListFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
