import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightDaysComponent } from './weight-days.component';

describe('WeightDaysComponent', () => {
  let component: WeightDaysComponent;
  let fixture: ComponentFixture<WeightDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
