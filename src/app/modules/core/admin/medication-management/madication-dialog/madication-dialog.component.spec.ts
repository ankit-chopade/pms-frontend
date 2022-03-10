import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadicationDialogComponent } from './madication-dialog.component';

describe('MadicationDialogComponent', () => {
  let component: MadicationDialogComponent;
  let fixture: ComponentFixture<MadicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadicationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MadicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
