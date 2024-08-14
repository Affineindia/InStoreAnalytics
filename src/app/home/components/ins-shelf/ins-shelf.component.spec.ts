import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsShelfComponent } from './ins-shelf.component';

describe('InsShelfComponent', () => {
  let component: InsShelfComponent;
  let fixture: ComponentFixture<InsShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsShelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
