import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AdminModule } from './admin.module';
import { AddPrivilegeComponent } from './add-privilege/add-privilege.component';
import { ListGroupComponent } from './list-group/list-group.component';

const routes: Routes = [
  { path: 'addGroup', component: AddPrivilegeComponent },
  { path: 'myGroups', component: ListGroupComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
