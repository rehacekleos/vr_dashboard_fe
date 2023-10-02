import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganisationModalComponent } from './create-organisation-modal.component';

describe('CreateOrJoinOrganisationModalComponent', () => {
  let component: CreateOrganisationModalComponent;
  let fixture: ComponentFixture<CreateOrganisationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrganisationModalComponent]
    });
    fixture = TestBed.createComponent(CreateOrganisationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
