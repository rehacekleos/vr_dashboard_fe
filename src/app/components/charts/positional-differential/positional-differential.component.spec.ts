import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionalDifferentialComponent } from './positional-differential.component';

describe('PositionalDifferentialComponent', () => {
  let component: PositionalDifferentialComponent;
  let fixture: ComponentFixture<PositionalDifferentialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionalDifferentialComponent]
    });
    fixture = TestBed.createComponent(PositionalDifferentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
