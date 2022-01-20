import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpocuentaEditComponent } from './tpocuenta-edit.component';

describe('TpocuentaEditComponent', () => {
  let component: TpocuentaEditComponent;
  let fixture: ComponentFixture<TpocuentaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpocuentaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpocuentaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
