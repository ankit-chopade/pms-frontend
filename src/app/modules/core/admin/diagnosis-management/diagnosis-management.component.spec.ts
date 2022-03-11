import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagnosisManagementComponent } from './diagnosis-management.component';


describe('DiagnosisManagementComponent', () => {
  let component: DiagnosisManagementComponent;
  let fixture: ComponentFixture<DiagnosisManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
