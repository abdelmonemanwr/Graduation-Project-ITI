import { OrderFormComponent } from './order-form/order-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { OrderReportsComponent } from './order-reports/order-reports.component';

const routes: Routes = [
  {path:'add',component:OrderFormComponent},
  {path:'all',component:AllOrdersComponent},
  {path:'edit/:id',component:OrderFormComponent},
  {path:'reports',component:OrderReportsComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
