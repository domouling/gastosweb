import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subcategory2ListComponent } from './subcategory2-list.component';

describe('Subcategory2ListComponent', () => {
  let component: Subcategory2ListComponent;
  let fixture: ComponentFixture<Subcategory2ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Subcategory2ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Subcategory2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
