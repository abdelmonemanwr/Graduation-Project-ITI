import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityTableComponent } from './city-table/city-table.component';
import { CityComponent } from './city/city.component';

const routes: Routes = [
  {path:'',component:CityTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
