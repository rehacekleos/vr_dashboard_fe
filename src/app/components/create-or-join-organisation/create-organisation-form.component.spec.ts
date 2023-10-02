import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganisationFormComponent } from './create-organisation-form.component';

describe('CreateOrJoinOrganisationComponent', () => {
  let component: CreateOrganisationFormComponent;
  let fixture: ComponentFixture<CreateOrganisationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrganisationFormComponent]
    });
    fixture = TestBed.createComponent(CreateOrganisationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
