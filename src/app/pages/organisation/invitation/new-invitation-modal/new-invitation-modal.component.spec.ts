import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvitationModalComponent } from './new-invitation-modal.component';

describe('NewInvitationModalComponent', () => {
  let component: NewInvitationModalComponent;
  let fixture: ComponentFixture<NewInvitationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInvitationModalComponent]
    });
    fixture = TestBed.createComponent(NewInvitationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
