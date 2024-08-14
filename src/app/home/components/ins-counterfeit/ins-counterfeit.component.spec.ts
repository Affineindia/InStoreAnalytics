import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsCounterfeitComponent } from './ins-counterfeit.component';

describe('InsCounterfeitComponent', () => {
  let component: InsCounterfeitComponent;
  let fixture: ComponentFixture<InsCounterfeitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsCounterfeitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsCounterfeitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
