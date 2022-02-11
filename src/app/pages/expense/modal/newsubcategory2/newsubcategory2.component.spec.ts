import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newsubcategory2Component } from './newsubcategory2.component';

describe('Newsubcategory2Component', () => {
  let component: Newsubcategory2Component;
  let fixture: ComponentFixture<Newsubcategory2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Newsubcategory2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Newsubcategory2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
