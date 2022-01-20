import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CecoEditComponent } from './ceco-edit.component';

describe('CecoEditComponent', () => {
  let component: CecoEditComponent;
  let fixture: ComponentFixture<CecoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CecoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CecoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
