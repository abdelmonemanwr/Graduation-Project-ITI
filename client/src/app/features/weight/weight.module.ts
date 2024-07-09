import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WeightComponent } from './weight/weight.component';
import { WeightRoutingModule } from './weight-routing.module';
import { WeightService } from '../../services/weight.service';

@NgModule({
  declarations: [WeightComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WeightRoutingModule
  ],
  providers: [WeightService]
})
export class WeightModule { }
