import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconifyComponent } from './iconify.component';

describe('IconifyComponent', () => {
  let component: IconifyComponent;
  let fixture: ComponentFixture<IconifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconifyComponent]
    });
    fixture = TestBed.createComponent(IconifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
