import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrxcurrencyEditComponent } from './trxcurrency-edit.component';

describe('TrxcurrencyEditComponent', () => {
  let component: TrxcurrencyEditComponent;
  let fixture: ComponentFixture<TrxcurrencyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrxcurrencyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrxcurrencyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
