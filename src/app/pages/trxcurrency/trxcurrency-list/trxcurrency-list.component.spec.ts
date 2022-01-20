import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrxcurrencyListComponent } from './trxcurrency-list.component';

describe('TrxcurrencyListComponent', () => {
  let component: TrxcurrencyListComponent;
  let fixture: ComponentFixture<TrxcurrencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrxcurrencyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrxcurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
