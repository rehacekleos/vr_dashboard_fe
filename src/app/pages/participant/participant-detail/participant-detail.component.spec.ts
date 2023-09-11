import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantDetailComponent } from './participant-detail.component';

describe('ParticipantDetailComponent', () => {
  let component: ParticipantDetailComponent;
  let fixture: ComponentFixture<ParticipantDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantDetailComponent]
    });
    fixture = TestBed.createComponent(ParticipantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
