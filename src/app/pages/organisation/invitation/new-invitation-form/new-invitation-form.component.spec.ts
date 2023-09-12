import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvitationFormComponent } from './new-invitation-form.component';

describe('NewInvitationFormComponent', () => {
  let component: NewInvitationFormComponent;
  let fixture: ComponentFixture<NewInvitationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInvitationFormComponent]
    });
    fixture = TestBed.createComponent(NewInvitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
