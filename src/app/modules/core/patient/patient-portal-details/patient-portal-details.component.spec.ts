import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPortalDetailsComponent } from './patient-portal-details.component';

describe('PatientPortalDetailsComponent', () => {
  let component: PatientPortalDetailsComponent;
  let fixture: ComponentFixture<PatientPortalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPortalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPortalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
