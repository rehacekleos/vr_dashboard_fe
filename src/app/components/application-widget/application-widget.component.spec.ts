import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationWidgetComponent } from './application-widget.component';

describe('ApplicationWidgetComponent', () => {
  let component: ApplicationWidgetComponent;
  let fixture: ComponentFixture<ApplicationWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationWidgetComponent]
    });
    fixture = TestBed.createComponent(ApplicationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
