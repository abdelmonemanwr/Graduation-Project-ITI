import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingTypeRoutingModule } from './shippingtype-routing.module';
import { ShippingTypeTableComponent } from './shippingtype-table/shippingtype-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [ShippingTypeTableComponent],
  imports: [
    CommonModule,
    ShippingTypeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  exports:[]
})
export class ShippingTypeModule {}
