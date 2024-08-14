import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManVibrateComponent } from './man-vibrate.component';



const routes: Routes = [
  {
    path: '',
    component: ManVibrateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManVibrateRoutingModule { }
