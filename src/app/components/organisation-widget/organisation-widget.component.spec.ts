import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationWidgetComponent } from './organisation-widget.component';

describe('OrganisationWidgetComponent', () => {
  let component: OrganisationWidgetComponent;
  let fixture: ComponentFixture<OrganisationWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisationWidgetComponent]
    });
    fixture = TestBed.createComponent(OrganisationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
