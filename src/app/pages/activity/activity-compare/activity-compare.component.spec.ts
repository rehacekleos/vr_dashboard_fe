import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCompareComponent } from './activity-compare.component';

describe('ActivityCompareComponent', () => {
  let component: ActivityCompareComponent;
  let fixture: ComponentFixture<ActivityCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityCompareComponent]
    });
    fixture = TestBed.createComponent(ActivityCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
