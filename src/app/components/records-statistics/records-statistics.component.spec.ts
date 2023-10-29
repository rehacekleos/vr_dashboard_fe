import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsStatisticsComponent } from './records-statistics.component';

describe('RecordsStatisticsComponent', () => {
  let component: RecordsStatisticsComponent;
  let fixture: ComponentFixture<RecordsStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsStatisticsComponent]
    });
    fixture = TestBed.createComponent(RecordsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
