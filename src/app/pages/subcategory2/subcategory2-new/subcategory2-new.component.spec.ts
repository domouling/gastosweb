import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subcategory2NewComponent } from './subcategory2-new.component';

describe('Subcategory2NewComponent', () => {
  let component: Subcategory2NewComponent;
  let fixture: ComponentFixture<Subcategory2NewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Subcategory2NewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Subcategory2NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
