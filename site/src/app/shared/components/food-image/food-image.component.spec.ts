import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodImageComponent } from './food-image.component';

describe('FoodImageComponent', () => {
  let component: FoodImageComponent;
  let fixture: ComponentFixture<FoodImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
