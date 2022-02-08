import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisModalDialogComponent } from './diagnosis-modal-dialog.component';

describe('DiagnosisModalDialogComponent', () => {
  let component: DiagnosisModalDialogComponent;
  let fixture: ComponentFixture<DiagnosisModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
