import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantscreenComponent } from './mainscreen/Merchantscreen.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';


const routes: Routes = [
  {path:'',component:MerchantscreenComponent},
  {path:'order/add',component:OrderFormComponent},
  {path:'order/edit/:id',component:OrderFormComponent},
  {path:'order/all',component:AllOrdersComponent},
 {path:'order/all/:id',component:AllOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantUserRoutingModule { }
