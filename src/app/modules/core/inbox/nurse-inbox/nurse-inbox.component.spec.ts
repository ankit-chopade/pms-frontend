import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInboxComponent } from './nurse-inbox.component';

describe('NurseInboxComponent', () => {
  let component: NurseInboxComponent;
  let fixture: ComponentFixture<NurseInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
