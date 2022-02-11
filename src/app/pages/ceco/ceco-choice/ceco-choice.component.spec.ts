import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CecoChoiceComponent } from './ceco-choice.component';

describe('CecoChoiceComponent', () => {
  let component: CecoChoiceComponent;
  let fixture: ComponentFixture<CecoChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CecoChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CecoChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
