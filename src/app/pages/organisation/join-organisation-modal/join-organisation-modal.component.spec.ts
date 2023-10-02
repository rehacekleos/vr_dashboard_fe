import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOrganisationModalComponent } from './join-organisation-modal.component';

describe('JoinModalComponent', () => {
  let component: JoinOrganisationModalComponent;
  let fixture: ComponentFixture<JoinOrganisationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinOrganisationModalComponent]
    });
    fixture = TestBed.createComponent(JoinOrganisationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
