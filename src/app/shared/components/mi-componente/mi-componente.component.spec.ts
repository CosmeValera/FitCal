import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiComponenteComponent } from './mi-componente.component';

describe('MiComponenteComponent', () => {
  let component: MiComponenteComponent;
  let fixture: ComponentFixture<MiComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiComponenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
