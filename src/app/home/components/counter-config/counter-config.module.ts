import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterConfigRoutingModule } from './counter-config-routing.module';
import { CounterConfigComponent } from './counter-config.component';


@NgModule({
  declarations: [CounterConfigComponent],
  imports: [
    CommonModule,
    CounterConfigRoutingModule
  ]
})
export class CounterConfigModule { }
