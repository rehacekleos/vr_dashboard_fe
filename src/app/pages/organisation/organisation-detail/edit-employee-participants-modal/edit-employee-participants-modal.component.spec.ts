import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeParticipantsModalComponent } from './edit-employee-participants-modal.component';

describe('EditEmployeeParticipantsModalComponent', () => {
  let component: EditEmployeeParticipantsModalComponent;
  let fixture: ComponentFixture<EditEmployeeParticipantsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmployeeParticipantsModalComponent]
    });
    fixture = TestBed.createComponent(EditEmployeeParticipantsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
