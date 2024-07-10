import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [ NotFoundComponent, SidebarComponent,PaginationComponent],
  imports: [CommonModule, RouterModule],
  exports: [ NotFoundComponent, SidebarComponent,PaginationComponent],
  providers: [
    ApiService
  ],
})
export class SharedModule { }
