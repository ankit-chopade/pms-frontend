import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagonosisDialogComponent } from './diagonosis-dialog.component';

describe('DiagonosisDialogComponent', () => {
  let component: DiagonosisDialogComponent;
  let fixture: ComponentFixture<DiagonosisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagonosisDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagonosisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
