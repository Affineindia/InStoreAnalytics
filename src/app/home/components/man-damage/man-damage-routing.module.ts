import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManDamageComponent } from './man-damage.component';

const routes: Routes = [
  {
    path: '',
    component: ManDamageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManDamageRoutingModule { }
