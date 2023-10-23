import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationPolarChartComponent } from './rotation-polar-chart.component';

describe('RotationPolarChartComponent', () => {
  let component: RotationPolarChartComponent;
  let fixture: ComponentFixture<RotationPolarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RotationPolarChartComponent]
    });
    fixture = TestBed.createComponent(RotationPolarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
