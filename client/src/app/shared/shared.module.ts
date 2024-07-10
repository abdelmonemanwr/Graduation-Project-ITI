import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';
import { SidebarComponent } from './sidebar/sidebar.component';
@NgModule({
  declarations: [ NotFoundComponent,SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [ NotFoundComponent, SidebarComponent ],
  providers: [
    ApiService
  ],
})
export class SharedModule { }
