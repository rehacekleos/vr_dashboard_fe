import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOrganisationComponent } from './no-organisation.component';

describe('NoOrganisationComponent', () => {
  let component: NoOrganisationComponent;
  let fixture: ComponentFixture<NoOrganisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoOrganisationComponent]
    });
    fixture = TestBed.createComponent(NoOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
