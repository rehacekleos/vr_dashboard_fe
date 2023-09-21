import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrJoinOrganisationModalComponent } from './create-or-join-organisation-modal.component';

describe('CreateOrJoinOrganisationModalComponent', () => {
  let component: CreateOrJoinOrganisationModalComponent;
  let fixture: ComponentFixture<CreateOrJoinOrganisationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrJoinOrganisationModalComponent]
    });
    fixture = TestBed.createComponent(CreateOrJoinOrganisationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
