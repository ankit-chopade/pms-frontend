import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagonsisManagementComponent } from './diagonsis-management.component';

describe('DiagonsisManagementComponent', () => {
  let component: DiagonsisManagementComponent;
  let fixture: ComponentFixture<DiagonsisManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagonsisManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagonsisManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
