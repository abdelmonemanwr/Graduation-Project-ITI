import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeightComponent } from './weight/weight.component';

const routes: Routes = [
  { path: '', component: WeightComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightRoutingModule { }
