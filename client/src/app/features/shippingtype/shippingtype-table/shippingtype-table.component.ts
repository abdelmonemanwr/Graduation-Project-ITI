import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShippingTypeService } from '../shippingtype.service';

@Component({
  selector: 'app-branch-table',
  templateUrl: './shippingtype-table.component.html',
  styleUrl: './shippingtype-table.component.css',
})
export class ShippingTypeTableComponent implements OnInit {
  modalTitle: string = 'اضافة نوع شحن';
  modalAction: string = 'اضافة';
  modalOpen: boolean = false;
  shippingTypes: any[] = [];

  selectedName!: string;
  selectedStatus!: boolean;
  selectedAdditionalShippingValue!: number;
  selectedid!: string;

  constructor(private shippingTypeService: ShippingTypeService) {}
  searchControl = new FormControl('');
  filteredShippingTypes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {
    this.fetchShippingTypes();
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filtertypes(searchText || '');
    });
  }

  openModal() {
    this.modalTitle = 'اضافة نوع شحن';
    this.modalAction = 'اضافة';
    this.selectedName = '';
    this.selectedStatus = false;
    this.selectedAdditionalShippingValue = NaN;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  fetchShippingTypes() {
    this.shippingTypeService.getShippingTypes().subscribe(
      (data) => {
        this.shippingTypes = data;
        this.filteredShippingTypes = data;
        console.log('data: ', this.shippingTypes);
      },
      (error) => console.error('Error fetching shippingTypes', error)
    );
  }

  onSubmit(formValue: any) {
    // Handle form submission for both add and edit
    if (this.modalAction === 'اضافة') {
      this.create(formValue);
    } else if (this.modalAction === 'تعديل') {
      this.update(formValue);
    }
  }

  //curd operations
  create(shippingType: any) {
    shippingType = shippingType.form.value;
    shippingType.id = 0; // fake id
    // console.log('Form Data :', shippingType);
    this.shippingTypeService.createShippingType(shippingType).subscribe(
      (response) => {
        this.fetchShippingTypes();
        this.closeModal();
      },
      (error) => console.error('Error registering shippingType', error)
    );
  }

  deleteType(shippingType: any) {
    // console.log('Deleting shippingType:', shippingType);
    if (confirm('هل فعلا تود حذف النوع : ' + shippingType.name)) {
      this.shippingTypeService.deleteShippingType(shippingType.id).subscribe(
        (response) => {
          this.fetchShippingTypes();
        },
        (error) => alert('حدث خطأ اثناء الحذف\n ' + error.error)
      );
    }
  }

  editType(shippingType: any) {
    this.modalTitle = 'تعديل نوع شحن';
    this.modalAction = 'تعديل';
    this.selectedName = shippingType.name;
    this.selectedStatus = shippingType.status;
    this.selectedAdditionalShippingValue = shippingType.additionalShippingValue;
    this.selectedid = shippingType.id;
    this.modalOpen = true;
  }

  update(shippingType: any) {
    shippingType = shippingType.form.value;
    shippingType.id = this.selectedid;
    console.log('Updating shippingType:', shippingType);
    this.shippingTypeService.updateShippingType(shippingType.id, shippingType).subscribe(
      () => {
        this.modalOpen = false;
        this.fetchShippingTypes();
      },
      (error) => {
        console.error('Error updating shippingType:', error);
      }
    );
  }

  // search
  filtertypes(searchText: string) {
    if (!searchText) {
      this.filteredShippingTypes = this.shippingTypes;
      return;
    }

    this.filteredShippingTypes = this.shippingTypes.filter((shippingType) =>
      shippingType.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.currentPage = 1;
  }

  onSearch() {
    const searchText = this.searchControl.value || '';
    this.filtertypes(searchText);
  }

  // paging
  get paginatedBranches() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredShippingTypes.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredShippingTypes.length / this.itemsPerPage);
  }
}
