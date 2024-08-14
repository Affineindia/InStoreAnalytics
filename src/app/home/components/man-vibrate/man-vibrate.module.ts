import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManVibrateRoutingModule } from './man-vibrate-routing.module';
import { ManVibrateComponent } from './man-vibrate.component';
import { CounterConfigModule } from '../../../shared';



@NgModule({
  declarations: [
    ManVibrateComponent
  ],
  imports: [
    CommonModule,
    ManVibrateRoutingModule,
    CounterConfigModule
  ]
})
export class ManVibrateModule { }
