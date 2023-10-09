import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionDetailComponent } from './description-detail.component';

describe('DescriptionDetailComponent', () => {
  let component: DescriptionDetailComponent;
  let fixture: ComponentFixture<DescriptionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionDetailComponent]
    });
    fixture = TestBed.createComponent(DescriptionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
