import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSchedulingComponent } from './patient-scheduling.component';

describe('PatientSchedulingComponent', () => {
  let component: PatientSchedulingComponent;
  let fixture: ComponentFixture<PatientSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
