import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManDamageComponent } from './man-damage.component';

describe('ManDamageComponent', () => {
  let component: ManDamageComponent;
  let fixture: ComponentFixture<ManDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
