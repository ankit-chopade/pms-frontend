import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureManagementComponent } from './procedure-management.component';

describe('ProcedureManagementComponent', () => {
  let component: ProcedureManagementComponent;
  let fixture: ComponentFixture<ProcedureManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
