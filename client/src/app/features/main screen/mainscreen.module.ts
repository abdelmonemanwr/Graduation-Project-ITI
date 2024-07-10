import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './mainscreen/mainscreen.component';
import { MainscreenroutingModule } from './mainscreenrouting.module';

@NgModule({
  declarations: [
    MainScreenComponent
  ],
  imports: [
    CommonModule,MainscreenroutingModule,
  ],

  exports:[MainScreenComponent]
})
export class mainscreenModule { }