import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproviderComponent } from './newprovider.component';

describe('NewproviderComponent', () => {
  let component: NewproviderComponent;
  let fixture: ComponentFixture<NewproviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewproviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
