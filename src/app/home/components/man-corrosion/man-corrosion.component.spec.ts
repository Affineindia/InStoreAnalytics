import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManCorrosionComponent } from './man-corrosion.component';

describe('ManCorrosionComponent', () => {
  let component: ManCorrosionComponent;
  let fixture: ComponentFixture<ManCorrosionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManCorrosionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManCorrosionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
