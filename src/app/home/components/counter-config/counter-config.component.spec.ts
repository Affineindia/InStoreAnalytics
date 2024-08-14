import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterConfigComponent } from './counter-config.component';

describe('CounterConfigComponent', () => {
  let component: CounterConfigComponent;
  let fixture: ComponentFixture<CounterConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
