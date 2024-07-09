import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CityRoutingModule } from './city-routing.module';
import { CityTableComponent } from './city-table/city-table.component';
import { CityComponent } from './city/city.component';
import { GovernateModule } from '../governate/governate.module';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CityTableComponent,
    CityComponent,

  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CityModule { }
