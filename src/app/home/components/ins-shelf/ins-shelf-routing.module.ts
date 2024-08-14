import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsShelfComponent } from './ins-shelf.component';

const routes: Routes = [{ path: '', component: InsShelfComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsShelfRoutingModule { }
