import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepresentativeMainScreenComponent } from './mainscreen/RepresentativeMainScreen.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

const routes: Routes = [
  {path:'',component:RepresentativeMainScreenComponent},
  {path:'order/all',component:AllOrdersComponent},
  {path:'order/all/:id',component:AllOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepresentativeUserRoutingModule { }
