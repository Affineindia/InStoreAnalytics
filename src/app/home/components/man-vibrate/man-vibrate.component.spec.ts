import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManVibrateComponent } from './man-vibrate.component';

describe('ManVibrateComponent', () => {
  let component: ManVibrateComponent;
  let fixture: ComponentFixture<ManVibrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManVibrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManVibrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
