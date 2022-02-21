import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseSchedulingComponent } from './nurse-scheduling.component';

describe('NurseSchedulingComponent', () => {
  let component: NurseSchedulingComponent;
  let fixture: ComponentFixture<NurseSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
