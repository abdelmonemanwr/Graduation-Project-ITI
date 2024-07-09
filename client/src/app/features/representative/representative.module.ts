import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepresentativeRoutingModule } from './representative-routing.module';
import { RepresentativeTableComponent } from './representative-table/representative-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RepresentativeTableComponent } from './representative-table/representative-table.component';

@NgModule({
  declarations: [RepresentativeTableComponent],
  imports: [
    CommonModule,
    RepresentativeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [],
})
export class RepresentativeModule {}
