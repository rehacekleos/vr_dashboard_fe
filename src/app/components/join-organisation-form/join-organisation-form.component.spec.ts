import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOrganisationFormComponent } from './join-organisation-form.component';

describe('JoinOrganisationFormComponent', () => {
  let component: JoinOrganisationFormComponent;
  let fixture: ComponentFixture<JoinOrganisationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinOrganisationFormComponent]
    });
    fixture = TestBed.createComponent(JoinOrganisationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
