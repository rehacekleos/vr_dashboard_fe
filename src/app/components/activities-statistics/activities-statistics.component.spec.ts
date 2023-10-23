import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesStatisticsComponent } from './activities-statistics.component';

describe('ActivitiesStatisticsComponent', () => {
  let component: ActivitiesStatisticsComponent;
  let fixture: ComponentFixture<ActivitiesStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesStatisticsComponent]
    });
    fixture = TestBed.createComponent(ActivitiesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
