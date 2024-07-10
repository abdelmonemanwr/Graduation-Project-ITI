import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantUserRoutingModule } from './merchant-user-routing.module';
import { MerchantscreenComponent } from './mainscreen/Merchantscreen.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';




@NgModule({
  declarations: [MerchantscreenComponent,OrderFormComponent,AllOrdersComponent],
  imports: [
    CommonModule,
    MerchantUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
              
  ]
})
export class MerchantUserModule { }
