import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManVibrateMultiComponent } from './man-vibrate-multi.component';

describe('ManVibrateMultiComponent', () => {
  let component: ManVibrateMultiComponent;
  let fixture: ComponentFixture<ManVibrateMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManVibrateMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManVibrateMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
