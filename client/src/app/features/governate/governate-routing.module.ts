import { GovernateComponentComponent } from './governate-component/governate-component.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GovernateComponent } from './governate/governate.component';

const routes: Routes = [
  { path: '', component: GovernateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovernateRoutingModule { }