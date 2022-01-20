import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpocuentaListComponent } from './tpocuenta-list.component';

describe('TpocuentaListComponent', () => {
  let component: TpocuentaListComponent;
  let fixture: ComponentFixture<TpocuentaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpocuentaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpocuentaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
