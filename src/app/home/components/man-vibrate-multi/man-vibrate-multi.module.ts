import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManVibrateMultiRoutingModule } from './man-vibrate-multi-routing.module';
import { ManVibrateMultiComponent } from './man-vibrate-multi.component';
import { CounterConfigModule } from '../../../shared';


@NgModule({
  declarations: [ManVibrateMultiComponent],
  imports: [
    CommonModule,
    ManVibrateMultiRoutingModule,
    CounterConfigModule
  ]
})
export class ManVibrateMultiModule { }
