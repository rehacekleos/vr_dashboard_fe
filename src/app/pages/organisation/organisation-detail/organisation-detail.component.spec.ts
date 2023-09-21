import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationDetailComponent } from './organisation-detail.component';

describe('OrganisationDetailComponent', () => {
  let component: OrganisationDetailComponent;
  let fixture: ComponentFixture<OrganisationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisationDetailComponent]
    });
    fixture = TestBed.createComponent(OrganisationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
