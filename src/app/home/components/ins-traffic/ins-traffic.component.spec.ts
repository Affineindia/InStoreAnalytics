import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsTrafficComponent } from './ins-traffic.component';

describe('InsTrafficComponent', () => {
  let component: InsTrafficComponent;
  let fixture: ComponentFixture<InsTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
