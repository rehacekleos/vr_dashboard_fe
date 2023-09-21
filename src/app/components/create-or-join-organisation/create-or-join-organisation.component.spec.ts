import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrJoinOrganisationComponent } from './create-or-join-organisation.component';

describe('CreateOrJoinOrganisationComponent', () => {
  let component: CreateOrJoinOrganisationComponent;
  let fixture: ComponentFixture<CreateOrJoinOrganisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrJoinOrganisationComponent]
    });
    fixture = TestBed.createComponent(CreateOrJoinOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
