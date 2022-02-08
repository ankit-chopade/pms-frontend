import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDemographicsDetailsComponent } from './patient-demographics-details.component';

describe('PatientDetaillComponent', () => {
  let component: PatientDemographicsDetailsComponent;
  let fixture: ComponentFixture<PatientDemographicsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDemographicsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDemographicsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
