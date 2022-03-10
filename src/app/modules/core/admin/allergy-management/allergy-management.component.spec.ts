import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyManagementComponent } from './allergy-management.component';

describe('AllergyManagementComponent', () => {
  let component: AllergyManagementComponent;
  let fixture: ComponentFixture<AllergyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
