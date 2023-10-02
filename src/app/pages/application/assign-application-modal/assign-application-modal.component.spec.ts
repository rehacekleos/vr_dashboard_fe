import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignApplicationModalComponent } from './assign-application-modal.component';

describe('AssignApplicationModalComponent', () => {
  let component: AssignApplicationModalComponent;
  let fixture: ComponentFixture<AssignApplicationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignApplicationModalComponent]
    });
    fixture = TestBed.createComponent(AssignApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
