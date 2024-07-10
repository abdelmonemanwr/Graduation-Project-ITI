import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepresentativeUserRoutingModule } from './representative-user-routing.module';
import { RepresentativeMainScreenComponent } from './mainscreen/RepresentativeMainScreen.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RepresentativeMainScreenComponent,AllOrdersComponent],
  imports: [
    CommonModule,
    RepresentativeUserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RepresentativeUserModule { }
