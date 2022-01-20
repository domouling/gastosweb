import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CecoNewComponent } from './ceco-new.component';

describe('CecoNewComponent', () => {
  let component: CecoNewComponent;
  let fixture: ComponentFixture<CecoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CecoNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CecoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
