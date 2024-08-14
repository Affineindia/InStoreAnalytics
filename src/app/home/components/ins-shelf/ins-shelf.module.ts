import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsShelfRoutingModule } from './ins-shelf-routing.module';
import { InsShelfComponent } from './ins-shelf.component';
import { CounterConfigModule } from '../../../shared';


@NgModule({
  declarations: [InsShelfComponent],
  imports: [
    CommonModule,
    InsShelfRoutingModule,
    CounterConfigModule
  ]
})
export class InsShelfModule { }
