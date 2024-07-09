import { Component } from '@angular/core';

@Component({
  selector: 'app-governate',
  templateUrl: './governate.component.html',
  styleUrl: './governate.component.css'
})


export class GovernateComponent {


  itemsPerPage = 10;
  currentPage = 1;
  paginatedItems: any[] = [];

  ngOnInit(): void {
    this.updatePaginatedItems();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    // this.paginatedItems = this.items.slice(startIndex, endIndex);
  }
}
