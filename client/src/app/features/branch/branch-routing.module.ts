import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchTableComponent } from './branch-table/branch-table.component';

const routes: Routes = [
  {path:'',component:BranchTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
