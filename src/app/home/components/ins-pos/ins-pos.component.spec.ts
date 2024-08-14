import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsPosComponent } from './ins-pos.component';

describe('InsPosComponent', () => {
  let component: InsPosComponent;
  let fixture: ComponentFixture<InsPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
