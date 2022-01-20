import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipogastoEditComponent } from './tipogasto-edit.component';

describe('TipogastoEditComponent', () => {
  let component: TipogastoEditComponent;
  let fixture: ComponentFixture<TipogastoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipogastoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipogastoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
