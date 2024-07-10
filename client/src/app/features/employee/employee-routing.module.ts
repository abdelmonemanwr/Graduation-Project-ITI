import { OrderReportsComponent } from './../order/order-reports/order-reports.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MainScreenComponent } from '../main screen/mainscreen/mainscreen.component';
import { AddPrivilegeComponent } from '../admin/add-privilege/add-privilege.component';
import { ListGroupComponent } from '../admin/list-group/list-group.component';
import { BranchTableComponent } from '../branch/branch-table/branch-table.component';
import { MerchantListComponent } from '../merchant/merchant-list/merchant-list.component';
import { RepresentativeTableComponent } from '../representative/representative-table/representative-table.component';
import { CityComponent } from '../city/city/city.component';
import { GovernateComponentComponent } from '../governate/governate-component/governate-component.component';
import { VillageCostComponent } from '../village-cost/village-cost/village-cost.component';
import { ShippingTypeTableComponent } from '../shippingtype/shippingtype-table/shippingtype-table.component';
import { WeightComponent } from '../weight/weight/weight.component';
import { AllOrdersComponent } from '../order/all-orders/all-orders.component';

const routes: Routes = [
  {path: '', component:MainScreenComponent},
  {path: 'add', component:AddEmployeeComponent},
  {path: 'all', component:EmployeeListComponent},
  {path: 'edit/:id',component:AddEmployeeComponent},
  {path: 'addGroup',component: AddPrivilegeComponent },
  {path: 'myGroups',component: ListGroupComponent },
  {path:'branch',component:BranchTableComponent},
  {path:'merchant/all',component:MerchantListComponent},
  {path:'representative/all',component:RepresentativeTableComponent},
  {path:'city',component:CityComponent},
  {path:'governate',component:GovernateComponentComponent},
  {path:'village-cost',component:VillageCostComponent},
  // {path:'order/all',component:AllOrdersComponent},
  // {path:'order/reports',component:OrderReportsComponent},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
