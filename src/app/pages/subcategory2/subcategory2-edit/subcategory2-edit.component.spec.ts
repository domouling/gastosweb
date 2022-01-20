import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subcategory2EditComponent } from './subcategory2-edit.component';

describe('Subcategory2EditComponent', () => {
  let component: Subcategory2EditComponent;
  let fixture: ComponentFixture<Subcategory2EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Subcategory2EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Subcategory2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
