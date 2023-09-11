import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParticipantModalComponent } from './new-participant-modal.component';

describe('NewParticipantModalComponent', () => {
  let component: NewParticipantModalComponent;
  let fixture: ComponentFixture<NewParticipantModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewParticipantModalComponent]
    });
    fixture = TestBed.createComponent(NewParticipantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
