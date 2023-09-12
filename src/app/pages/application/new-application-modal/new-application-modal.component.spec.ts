import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplicationModalComponent } from './new-application-modal.component';

describe('NewApplicationModalComponent', () => {
  let component: NewApplicationModalComponent;
  let fixture: ComponentFixture<NewApplicationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewApplicationModalComponent]
    });
    fixture = TestBed.createComponent(NewApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
