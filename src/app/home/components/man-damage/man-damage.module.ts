import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManDamageRoutingModule } from './man-damage-routing.module';
import { ManDamageComponent } from './man-damage.component';

@NgModule({
  declarations: [
    ManDamageComponent
  ],
  imports: [
    CommonModule,
    ManDamageRoutingModule
  ]
})
export class ManDamageModule { }
