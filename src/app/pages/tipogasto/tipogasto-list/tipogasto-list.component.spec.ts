import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipogastoListComponent } from './tipogasto-list.component';

describe('TipogastoListComponent', () => {
  let component: TipogastoListComponent;
  let fixture: ComponentFixture<TipogastoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipogastoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipogastoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
