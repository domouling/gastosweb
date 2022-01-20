import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipogastoNewComponent } from './tipogasto-new.component';

describe('TipogastoNewComponent', () => {
  let component: TipogastoNewComponent;
  let fixture: ComponentFixture<TipogastoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipogastoNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipogastoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
