import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientProcedureModalDialogComponent } from './patient-procedure-modal-dialog.component';


describe('PatientProcedureModalComponent', () => {
  let component: PatientProcedureModalDialogComponent;
  let fixture: ComponentFixture<PatientProcedureModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProcedureModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProcedureModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
