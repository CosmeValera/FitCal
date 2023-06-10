import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GramosDialogComponent } from './gramos-dialog.component';

describe('GramosDialogComponent', () => {
  let component: GramosDialogComponent;
  let fixture: ComponentFixture<GramosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GramosDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GramosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
