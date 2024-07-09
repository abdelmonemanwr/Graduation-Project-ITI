import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [ NotFoundComponent, PaginationComponent, SidebarComponent ],
  imports: [CommonModule, RouterModule],
  exports: [ NotFoundComponent, PaginationComponent, SidebarComponent ],
  providers: [
    ApiService
  ],
})
export class SharedModule { }
