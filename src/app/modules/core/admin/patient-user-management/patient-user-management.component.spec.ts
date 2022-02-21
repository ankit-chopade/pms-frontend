import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUserManagementComponent } from './patient-user-management.component';

describe('PatientUserManagementComponent', () => {
  let component: PatientUserManagementComponent;
  let fixture: ComponentFixture<PatientUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientUserManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
