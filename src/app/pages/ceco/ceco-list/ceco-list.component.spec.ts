import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CecoListComponent } from './ceco-list.component';

describe('CecoListComponent', () => {
  let component: CecoListComponent;
  let fixture: ComponentFixture<CecoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CecoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CecoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
