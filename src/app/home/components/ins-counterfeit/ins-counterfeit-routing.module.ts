import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsCounterfeitComponent } from './ins-counterfeit.component';

const routes: Routes = [
  {
    path: '',
    component: InsCounterfeitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsCounterfeitRoutingModule { }
