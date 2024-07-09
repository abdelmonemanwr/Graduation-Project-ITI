import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantService } from './merchant.service';
import { MerchantsRoutingModule } from './merchants-routing.module';
import { MerchantModalComponent } from './merchant-modal/merchant-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MerchantFormComponent } from './merchant-form/merchant-form.component';
@NgModule({
  declarations: [
    MerchantListComponent,
    MerchantModalComponent,
    MerchantFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MerchantsRoutingModule,
    MatDialogModule,
    MatDialogModule,
    


  ],
  providers: [MerchantService],
  exports: [
    MerchantListComponent,
   
  ]
})
export class MerchantsModule { }
