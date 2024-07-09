import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingTypeTableComponent } from './shippingtype-table/shippingtype-table.component';

const routes: Routes = [
  {path:'',component:ShippingTypeTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingTypeRoutingModule { }
