import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-branch-table',
  templateUrl: './branch-table.component.html',
  styleUrl: './branch-table.component.css',
})
export class BranchTableComponent implements OnInit {
  modalTitle: string = 'اضافة فرع';
  modalAction: string = 'اضافة';
  modalOpen: boolean = false;
  branches: any[] = [];

  selectedName!: string;
  selectedStatus!: boolean;
  selectedAddingDate!: string;
  selectedid!: string;

  constructor(private branchService: BranchService) {}
  searchControl = new FormControl('');
  filteredBranches: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {
    this.fetchBranches();
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filterRepresentatives(searchText || '');
    });
  }

  openModal() {
    this.modalTitle = 'اضافة فرع';
    this.modalAction = 'اضافة';
    this.selectedName = '';
    this.selectedStatus = false;
    this.selectedAddingDate = '';
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  fetchBranches() {
    this.branchService.getBranches().subscribe(
      (data) => {
        this.branches = data;
        this.filteredBranches = data;
        //console.log('data: ', this.branches);
      },
      (error) => console.error('Error fetching branches', error)
    );
  }

  onSubmit(formValue: any) {
    // Handle form submission for both add and edit
    if (this.modalAction === 'اضافة') {
      this.createBranch(formValue);
    } else if (this.modalAction === 'تعديل') {
      this.updateBranch(formValue);
    }
  }

  //curd operations
  createBranch(branch: any) {
    branch = branch.form.value;
    branch.id = 0; // fake id
    // console.log('Form Data :', branch);
    this.branchService.createBranch(branch).subscribe(
      (response) => {
        //console.log('Representative registered successfully', response);
        this.fetchBranches();
        this.closeModal();
      },
      (error) => {
        if (error.status === 403) {
          alert('You do not have permission to create a branch.');
        } else {
          console.error('Error registering branch', error);
        }
      }
    );
  }

  deleteBranch(branch: any) {
    // console.log('Deleting branch:', branch);
    if (confirm('هل فعلا تود حذف الفرع : ' + branch.name)) {
      this.branchService.deleteBranch(branch.id).subscribe(
        (response) => {
          //console.log('Representative deleted successfully', response);
          this.fetchBranches();
        },
        (error) => {
          if (error.status === 403) {
            alert('You do not have permission to delete a branch.');
          } else {
            alert('حدث خطأ اثناء الحذف\n ' + error.error.message);
          }
        }
      );
    }
  }

  editBranch(branch: any) {
    this.modalTitle = 'تعديل فرع';
    this.modalAction = 'تعديل';
    this.selectedName = branch.name;
    this.selectedStatus = branch.status;
    // Create a date object from branch.addingDate
    const date = new Date(branch.addingDate);
    // Get the year, month, and date from the date object
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    // Format the date as 'YYYY-MM-DD'
    this.selectedAddingDate = `${year}-${month}-${day}`;
    // console.log('Updating branch:', branch.addingDate);
    // console.log('Formatted Date:', this.selectedAddingDate);
    this.selectedid = branch.id;
    this.modalOpen = true;
  }

  showDate(d: Date): string {
    let sa: string = d.toString();
    sa = sa.split('T')[0];
    return sa;
  }

  updateBranch(branch: any) {
    branch = branch.form.value;
    branch.id = this.selectedid;
    console.log('Updating branch:', branch);
    this.branchService.updateBranch(branch.id, branch).subscribe(
      () => {
        this.modalOpen = false;
        this.fetchBranches();
      },
      (error) => {
        if (error.status === 403) {
          alert('You do not have permission to edit a branch.');
        } else {
          console.error('Error updating branch:', error);
        }
      }
    );
  }

  // search
  filterRepresentatives(searchText: string) {
    if (!searchText) {
      this.filteredBranches = this.branches;
      return;
    }

    this.filteredBranches = this.branches.filter((branch) =>
      branch.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.currentPage = 1;
  }

  onSearch() {
    const searchText = this.searchControl.value || '';
    this.filterRepresentatives(searchText);
  }

  // paging
  get paginatedBranches() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredBranches.slice(start, end);
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
    return Math.ceil(this.filteredBranches.length / this.itemsPerPage);
  }
}
