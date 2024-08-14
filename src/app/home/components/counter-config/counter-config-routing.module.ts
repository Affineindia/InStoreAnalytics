import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounterConfigComponent } from './counter-config.component';

const routes: Routes = [{ path: '', component: CounterConfigComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterConfigRoutingModule { }
