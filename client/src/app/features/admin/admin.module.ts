import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPrivilegeComponent } from './add-privilege/add-privilege.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { ListGroupComponent } from './list-group/list-group.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ ListGroupComponent, AddPrivilegeComponent, ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatTableModule, MatPaginatorModule, MatButtonModule,
    MatInputModule, MatIconModule, MatFormFieldModule,
    AdminRoutingModule
  ]
})

export class AdminModule { }


// [
//   { path: 'addGroup', component: AddPrivilegeComponent },
//    { path: 'editGroup/:id', component: AddPrivilegeComponent },
//   { path: 'myGroups', component: ListGroupComponent }
// ]