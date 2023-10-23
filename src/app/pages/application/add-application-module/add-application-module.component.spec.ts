import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationModuleComponent } from './add-application-module.component';

describe('AddApplicationModuleComponent', () => {
  let component: AddApplicationModuleComponent;
  let fixture: ComponentFixture<AddApplicationModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApplicationModuleComponent]
    });
    fixture = TestBed.createComponent(AddApplicationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
