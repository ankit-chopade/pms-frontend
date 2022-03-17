import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianInboxComponent } from './physician-inbox.component';

describe('PhysicianInboxComponent', () => {
  let component: PhysicianInboxComponent;
  let fixture: ComponentFixture<PhysicianInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicianInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
