import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyDetailsDialogComponent } from './allergy-details-dialog.component';

describe('AllergyDetailsDialogComponent', () => {
  let component: AllergyDetailsDialogComponent;
  let fixture: ComponentFixture<AllergyDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergyDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
