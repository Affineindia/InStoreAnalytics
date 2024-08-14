import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsReportComponent } from './ins-report.component';

const routes: Routes = [
  {
    path: '',
    component: InsReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsReportRoutingModule { }
