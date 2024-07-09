import { Component, OnInit } from '@angular/core';
import { RepresentativeService } from '../representative.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-representative-table',
  templateUrl: './representative-table.component.html',
  styleUrl: './representative-table.component.css',
})
export class RepresentativeTableComponent implements OnInit {
  modalTitle: string = 'اضافة مندوب';
  modalAction: string = 'اضافة';
  modalOpen: boolean = false;
  representatives: any[] = [];
  governorates: any[] = [];
  branches: any[] = [];
  selectedGovernorates: number[] = [];
  selectedBranchId: number = NaN;
  selectedPercent: number = NaN;
  selectedCompanyOrderPrecentage: number = NaN;
  selectedfullName!: string;
  selectedEmail!: string;
  selectedphoneNumber!: string;
  selectedpassword!: string;
  selectedaddress!: string;
  selectedid!: string;

  constructor(private representativeService: RepresentativeService) {}
  frmControlGovernorates = new FormControl([]);
  searchControl = new FormControl('');
  filteredRepresentatives: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  discountTypes = [
    { value: '1', viewValue: 'نسبة مئوية' },
    { value: '2', viewValue: 'نسبة محدودة' },
  ];

  getDiscountTypeValue(type: number): string {
    // Replace with actual logic based on your discount types
    return type === 1 ? 'نسبة مئوية' : 'نسبة محدودة';
  }

  ngOnInit() {
    this.fetchRepresentatives();
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filterRepresentatives(searchText || '');
    });
  }

  openModal() {
    this.fetchGovernorates();
    this.fetchBranches();
    this.modalTitle = 'اضافة مندوب';
    this.modalAction = 'اضافة';
    this.selectedBranchId = NaN;
    this.selectedPercent = NaN;
    this.selectedCompanyOrderPrecentage = NaN;
    this.selectedfullName = '';
    this.selectedEmail = '';
    this.selectedphoneNumber = '';
    this.selectedpassword = '';
    this.selectedaddress = '';
    this.frmControlGovernorates.setValue([]);
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  getGovernorateNames(governorates: any[]): string {
    return governorates.map((rg) => rg.name).join(', ');
  }

  fetchRepresentatives() {
    this.representativeService.getRepresentatives().subscribe(
      (data) => {
        this.representatives = data;
        this.filteredRepresentatives = data;
        //console.log("data: ", this.representatives)
      },
      (error) => console.error('Error fetching representatives', error)
    );
  }
  fetchGovernorates() {
    this.representativeService.getGovernorates().subscribe(
      (data) => {
        this.governorates = data.filter((g) => g.status === true);
        //console.log("governorates: ", this.governorates);
      },
      (error) => console.error('Error fetching governorates', error)
    );
  }

  fetchBranches() {
    this.representativeService.getBranches().subscribe(
      (data) => {
        this.branches = data.filter((g) => g.status === true);
        //console.log("branches: ", this.branches);
      },
      (error) => console.error('Error fetching branches', error)
    );
  }

  onSubmit(formValue: any) {
    // Handle form submission for both add and edit
    if (this.modalAction === 'اضافة') {
      this.registerRepresentative(formValue);
    } else if (this.modalAction === 'تعديل') {
      this.updateRepresentative(formValue);
    }
  }

  //curd operations
  registerRepresentative(representative: any) {
    representative = representative.form.value;
    this.selectedGovernorates = this.frmControlGovernorates.value || [];
    representative.governateIds = this.selectedGovernorates;
    representative.id = ''; // fake id
    //console.log('Form Data :', representative);
    this.representativeService.registerRepresentative(representative).subscribe(
      (response) => {
        //console.log('Representative registered successfully', response);
        this.fetchRepresentatives(); // Refresh the list
        this.closeModal();
      },
      (error) => {
        if (error.status === 403) {
          alert('You do not have permission to create a Representative.');
        } else {
          console.error('Error creating Representative:', error);
        }
      }
    );
  }

  deleteRepresentative(representative: any) {
    // console.log('Deleting representative:', representative);
    if (confirm('هل فعلا تود حذف المندوب : ' + representative.fullName)) {
      this.representativeService
        .deleteRepresentative(representative.id)
        .subscribe(
          (response) => {
            //console.log('Representative deleted successfully', response);
            this.fetchRepresentatives(); // Refresh the list after deletion
          },
          (error) => {
            if (error.status === 403) {
              alert('You do not have permission to delete a Representative.');
            } else {
              console.error('Error deleting Representative:', error);
            }
          }
        );
    }
  }

  editRepresentative(representative: any) {
    this.fetchGovernorates();
    this.fetchBranches();
    this.modalTitle = 'تعديل مندوب';
    this.modalAction = 'تعديل';
    //console.log('Updating representative:', representative);
    this.selectedBranchId = representative.branch_Id;
    this.selectedPercent = representative.salePrecentage.toString();
    this.selectedCompanyOrderPrecentage = representative.companyOrderPrecentage;
    this.selectedfullName = representative.fullName;
    this.selectedEmail = representative.email;
    this.selectedphoneNumber = representative.phoneNumber;
    this.selectedpassword = representative.password;
    this.selectedaddress = representative.address;
    this.selectedid = representative.id;
    let selectedGovernoratesIds = representative.governorates.map(
      (rg: any) => rg.id
    );
    this.frmControlGovernorates.setValue(selectedGovernoratesIds);
    this.modalOpen = true;
  }

  updateRepresentative(representative: any) {
    representative = representative.form.value;
    representative.id = this.selectedid;
    this.selectedGovernorates = this.frmControlGovernorates.value || [];
    representative.governateIds = this.selectedGovernorates;
    //console.log('Updating representative:', representative);
    this.representativeService
      .updateRepresentative(representative.id, representative)
      .subscribe(
        () => {
          this.modalOpen = false;
          this.fetchRepresentatives(); // Refresh the list
        },
        (error) => {
          if (error.status === 403) {
            alert('You do not have permission to update a Representative.');
          } else {
            console.error('Error updating Representative:', error);
          }
        }
      );
  }

  // search
  filterRepresentatives(searchText: string) {
    if (!searchText) {
      this.filteredRepresentatives = this.representatives;
      return;
    }

    this.filteredRepresentatives = this.representatives.filter((rep) =>
      rep.fullName.toLowerCase().includes(searchText.toLowerCase())
    );

    this.currentPage = 1; // Reset to the first page after filtering
  }

  onSearch() {
    const searchText = this.searchControl.value || '';
    this.filterRepresentatives(searchText);
  }

  // paging
  get paginatedRepresentatives() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredRepresentatives.slice(start, end);
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
    return Math.ceil(this.filteredRepresentatives.length / this.itemsPerPage);
  }
}
