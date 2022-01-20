import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrxcurrencyNewComponent } from './trxcurrency-new.component';

describe('TrxcurrencyNewComponent', () => {
  let component: TrxcurrencyNewComponent;
  let fixture: ComponentFixture<TrxcurrencyNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrxcurrencyNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrxcurrencyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
