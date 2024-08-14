import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManCorrosionRoutingModule } from './man-corrosion-routing.module';
import { ManCorrosionComponent } from './man-corrosion.component';
import { CounterConfigModule } from '../../../shared';

@NgModule({
  declarations: [
    ManCorrosionComponent
  ],
  imports: [
    CommonModule,
    ManCorrosionRoutingModule,
    CounterConfigModule
  ]
})
export class ManCorrosionModule { }
