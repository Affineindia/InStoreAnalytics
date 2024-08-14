import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsTrafficComponent } from './ins-traffic.component';

const routes: Routes = [
  {
    path: '',
    component: InsTrafficComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsTrafficRoutingModule { }
