import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanIconComponent } from './boolean-icon.component';

describe('BooleanIconComponent', () => {
  let component: BooleanIconComponent;
  let fixture: ComponentFixture<BooleanIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooleanIconComponent]
    });
    fixture = TestBed.createComponent(BooleanIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
