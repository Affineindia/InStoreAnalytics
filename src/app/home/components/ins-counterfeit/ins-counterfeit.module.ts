import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsCounterfeitRoutingModule } from './ins-counterfeit-routing.module';
import { InsCounterfeitComponent } from './ins-counterfeit.component';

import { CounterConfigModule } from '../../../shared';

@NgModule({
  declarations: [
    InsCounterfeitComponent
  ],
  imports: [
    CommonModule,
    InsCounterfeitRoutingModule,
    CounterConfigModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InsCounterfeitModule { }
