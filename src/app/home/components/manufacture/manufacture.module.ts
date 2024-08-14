import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureRoutingModule } from './manufacture-routing.module';
import { ManufactureComponent } from './manufacture.component';


@NgModule({
  declarations: [
    ManufactureComponent
  ],
  imports: [
    CommonModule,
    ManufactureRoutingModule
  ]
})
export class ManufactureModule { }
