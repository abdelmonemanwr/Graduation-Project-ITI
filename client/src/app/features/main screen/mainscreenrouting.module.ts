
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './mainscreen/mainscreen.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainscreenroutingModule { }
