import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManCorrosionComponent } from './man-corrosion.component';

const routes: Routes = [
  {
    path: '',
    component: ManCorrosionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManCorrosionRoutingModule { }
