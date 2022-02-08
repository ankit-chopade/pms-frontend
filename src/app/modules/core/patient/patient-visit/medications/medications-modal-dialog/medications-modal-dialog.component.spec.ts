import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsModalDialogComponent } from './medications-modal-dialog.component';

describe('MedicationsModalDialogComponent', () => {
  let component: MedicationsModalDialogComponent;
  let fixture: ComponentFixture<MedicationsModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationsModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationsModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
