import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VillageCostComponent } from './village-cost/village-cost.component';
const routes: Routes = [
  { path: '', component: VillageCostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VillageCostRoutingModule { }
