import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrosPercComponent } from './macros-perc.component';

describe('MacrosPercComponent', () => {
  let component: MacrosPercComponent;
  let fixture: ComponentFixture<MacrosPercComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacrosPercComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacrosPercComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
