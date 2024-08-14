import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstoreComponent } from './instore.component';

describe('InstoreComponent', () => {
  let component: InstoreComponent;
  let fixture: ComponentFixture<InstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
