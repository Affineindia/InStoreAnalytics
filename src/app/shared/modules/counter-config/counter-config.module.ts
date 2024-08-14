import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterConfigRoutingModule } from './counter-config-routing.module';
import { CounterConfigComponent } from './counter-config.component';


@NgModule({
  declarations: [CounterConfigComponent],
  imports: [
    CommonModule,
    CounterConfigRoutingModule
  ],
  exports: [
    CounterConfigComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CounterConfigModule { }
