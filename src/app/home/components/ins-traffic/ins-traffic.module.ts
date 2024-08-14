import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsTrafficRoutingModule } from './ins-traffic-routing.module';
import { InsTrafficComponent } from './ins-traffic.component';
import { ChartModule } from 'angular-highcharts';

import { CounterConfigModule } from '../../../shared';


@NgModule({
  declarations: [
    InsTrafficComponent
  ],
  imports: [
    CommonModule,
    InsTrafficRoutingModule,
    ChartModule,
    CounterConfigModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InsTrafficModule { }
