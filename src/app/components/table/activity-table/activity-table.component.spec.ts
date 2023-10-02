import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTableComponent } from './activity-table.component';

describe('ActivityTableComponent', () => {
  let component: ActivityTableComponent;
  let fixture: ComponentFixture<ActivityTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityTableComponent]
    });
    fixture = TestBed.createComponent(ActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
