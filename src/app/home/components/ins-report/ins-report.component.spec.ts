import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsReportComponent } from './ins-report.component';

describe('InsReportComponent', () => {
  let component: InsReportComponent;
  let fixture: ComponentFixture<InsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
