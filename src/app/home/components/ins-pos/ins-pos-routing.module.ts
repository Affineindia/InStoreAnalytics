import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsPosComponent } from './ins-pos.component';

const routes: Routes = [
  {
    path: '',
    component: InsPosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsPosRoutingModule { }
