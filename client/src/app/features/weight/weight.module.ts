import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WeightComponent } from './weight/weight.component';
import { WeightRoutingModule } from './weight-routing.module';
import { WeightService } from './weight.service';

@NgModule({
  declarations: [WeightComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WeightRoutingModule,
  ],
  providers: [WeightService]
})
export class WeightModule { }
