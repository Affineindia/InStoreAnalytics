import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstoreComponent } from './instore.component';

const routes: Routes = [
  {
    path: '',
    component: InstoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstoreRoutingModule { }
