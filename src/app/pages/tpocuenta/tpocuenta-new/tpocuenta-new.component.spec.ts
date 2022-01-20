import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpocuentaNewComponent } from './tpocuenta-new.component';

describe('TpocuentaNewComponent', () => {
  let component: TpocuentaNewComponent;
  let fixture: ComponentFixture<TpocuentaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpocuentaNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpocuentaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
