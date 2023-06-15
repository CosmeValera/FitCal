import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrosPercentagesComponent } from './macros-percentages.component';

describe('MacrosPercentagesComponent', () => {
  let component: MacrosPercentagesComponent;
  let fixture: ComponentFixture<MacrosPercentagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacrosPercentagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacrosPercentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
