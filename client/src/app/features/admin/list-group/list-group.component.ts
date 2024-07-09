import { Component, OnInit } from '@angular/core';
import { GroupService } from '../Services/group.service';
import { Group } from '../interfaces/group';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {
  searchTerm: string = '';
  groups: Group[] = [];
  totalGroups: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(private groupService: GroupService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getAllGroups(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.groups = data;
        this.totalGroups = data.length;
        this.calculatePagination();
        console.log("groups after loading: ",JSON.stringify(this.groups));
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      }
    });
  }

  addGroup() {
    this.router.navigate(['/admin/addGroup']);
  }

  editGroup(group: Group) {
     this.router.navigate(['/admin/editGroup', group.id]);
  }

  deleteGroup(groupId: string) {
    console.log(`group id: ${groupId}`);
    this.groupService.deleteGroup(groupId).subscribe({
      next: (response) => {
        this.loadGroups();
        console.log(`response : ${response}`)
        const snackBarRef = this.snackBar.open('تم حذف المجموعة بنجاح', 'إغلاق', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          direction: 'rtl'
        });
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
      },
      error: (error) => {
        console.error('Error deleting group:', error);
        const snackBarRef = this.snackBar.open('حدث خطأ أثناء حذف المجموعة', 'إغلاق', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          direction: 'rtl'
        });
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
      }
    });
  }

  searchGroups() {
    this.searchTerm = this.searchTerm.toLowerCase();
    const found = this.groups.find(group => group.name === this.searchTerm);
    if (found !== undefined) {
      //this.router.navigate(['/admin/editGroup', found.id]);
      const snackBarRef = this.snackBar.open('المجموعة موجودة بالفعل', 'إغلاق', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        direction: 'rtl'
      });
      snackBarRef.onAction().subscribe(() => {
        snackBarRef.dismiss();
      });
    }
    else{
      const snackBarRef = this.snackBar.open('المجموعة غير موجودة', 'إغلاق', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        direction: 'rtl'
      });
      snackBarRef.onAction().subscribe(() => {
        snackBarRef.dismiss();
      });
    }
    this.searchTerm = "";
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.loadGroups();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.totalGroups / this.pageSize);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}
