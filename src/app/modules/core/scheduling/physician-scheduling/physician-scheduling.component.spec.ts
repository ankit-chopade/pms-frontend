import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianSchedulingComponent } from './physician-scheduling.component';

describe('PhysicianSchedulingComponent', () => {
  let component: PhysicianSchedulingComponent;
  let fixture: ComponentFixture<PhysicianSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicianSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
