import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPortalScreenComponent } from './patient-portal-screen.component';

describe('PatientPortalScreenComponent', () => {
  let component: PatientPortalScreenComponent;
  let fixture: ComponentFixture<PatientPortalScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPortalScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPortalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
