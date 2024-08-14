import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstoreRoutingModule } from './instore-routing.module';
import { InstoreComponent } from './instore.component';

@NgModule({
  declarations: [
    InstoreComponent
  ],
  imports: [
    CommonModule,
    InstoreRoutingModule
  ]
})
export class InstoreModule { }
