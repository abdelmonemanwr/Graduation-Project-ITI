import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VillageCostComponent } from './village-cost/village-cost.component';
import { VillageCostRoutingModule } from './village-cost-routing.module';
import { VillageCostService } from '../../services/village-cost.service';
@NgModule({
  declarations: [VillageCostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VillageCostRoutingModule
  ],
  providers: [VillageCostService]
})
export class VillageCostModule { }
