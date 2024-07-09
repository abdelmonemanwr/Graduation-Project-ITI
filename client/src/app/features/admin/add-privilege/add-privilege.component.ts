import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrivilegeService } from '../Services/privilege.service';
import { GroupService } from '../Services/group.service';
import { GroupDTO } from '../interfaces/group-dto';
import { PrivilegeDTO } from '../interfaces/privilege-dto';
import { GroupPrivilegeDTO } from '../interfaces/group-privilege-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-privilege',
  templateUrl: './add-privilege.component.html',
  styleUrls: ['./add-privilege.component.css']
})

export class AddPrivilegeComponent implements OnInit {
  groupForm: FormGroup;
  privileges: PrivilegeDTO[] = [];
  groupId: string | null = null;
  addMode: boolean = true;
  groupNameInEditMode: string | null = null;
  userPrivileges: GroupPrivilegeDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private privilegeService: PrivilegeService,
    private groupService: GroupService
  ) {
    this.groupForm = this.fb.group({
      groupName: ['', {
        validators: [],
        asyncValidators: this.validateGroupName.bind(this),
        updateOn: 'change'
      }],
      privileges: this.fb.array([])
    });
  }

  get privilegesFormArray() {
    return this.groupForm.get('privileges') as FormArray;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('id');
      if (this.groupId) {
        this.addMode = false;
        this.groupService.getGroupDTOById(this.groupId).subscribe({
          next: (groupDTO: GroupDTO) => {
            const groupNameControl = this.groupForm.get('groupName');
            groupNameControl?.setValue(groupDTO.name);
            // store the data in local variables
            this.groupNameInEditMode = groupDTO.name;
            this.userPrivileges = groupDTO.groupPrivileges;
            this.privilegeService.getPrivileges().subscribe({
              next: (data: PrivilegeDTO[]) => {
                this.privileges = data;
                this.setPrivileges(data, this.userPrivileges);
              },
              error: (error) => {
                console.error('Failed to fetch privileges from server in edit mode', error.message);
              }
            });
          },
          error: (error) => {
            console.error('Failed to fetch groupDTO data from server in edit mode', error.message);
          }
        });
      }
      else {
        this.privilegeService.getPrivileges().subscribe({
          next: (data: PrivilegeDTO[]) => {
            this.privileges = data;
            this.setPrivileges(data, []);
          },
          error: (error) => {
            console.error('Failed to fetch privileges from server in add mode', error.message);
          }
        });
      }
    });

    const groupNameControl = this.groupForm.get('groupName');
    groupNameControl?.valueChanges.subscribe({
      next: (groupName: string) => {
        if (groupName && !this.addMode && groupName === this.groupNameInEditMode){
          groupNameControl.setErrors(null);
        }
      }
        }
      }
    });

  }

  private setPrivileges(privileges: PrivilegeDTO[], userPrivileges: GroupPrivilegeDTO[]) {
    const privilegeFGs: FormGroup[] = privileges.map(privilege => {
      const curUserPrivilege = userPrivileges.find(gp => gp.privelege_Id === privilege.id);
      return this.fb.group({
        Privelege_Id: [privilege.id],
        Add: [curUserPrivilege ? curUserPrivilege.add : false],
        Update: [curUserPrivilege ? curUserPrivilege.update : false],
        View: [curUserPrivilege ? curUserPrivilege.view : false],
        Delete: [curUserPrivilege ? curUserPrivilege.delete : false]
      });
          snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
    });
          const groupNameControl = this.groupForm.get('groupName');
          groupNameControl?.setErrors({ groupExists: true });
        }
      },
      error: (error) => {
        console.error('Error checking group name:', error);
      }
    });
  }

  private setPrivileges(privileges: PrivilegeDTO[], userPrivileges: GroupPrivilegeDTO[]) {
    const privilegeFGs = privileges.map(privilege => this.fb.group({
      Privelege_Id: [privilege.id],
      Add: [userPrivileges.find(gp => gp.Privelege_Id === privilege.id)?.Add || false],
      Update: [userPrivileges.find(gp => gp.Privelege_Id === privilege.id)?.Update || false],
      View: [userPrivileges.find(gp => gp.Privelege_Id === privilege.id)?.View || false],
      Delete: [userPrivileges.find(gp => gp.Privelege_Id === privilege.id)?.Delete || false]
    }));
    const privilegeFormArray = this.fb.array(privilegeFGs);
    this.groupForm.setControl('privileges', privilegeFormArray);
    console.log(`user privileges xyz: ${JSON.stringify(userPrivileges)}`);
    console.log(`privileges xyz: ${JSON.stringify(privilegeFormArray.value)}`);
  }

  getSelectedPrivileges(): GroupPrivilegeDTO[] {
    return this.privilegesFormArray.controls
      .filter(control => control.value.Add || control.value.Update || control.value.View || control.value.Delete)
      .map(control => control.value);
    //console.log(`selected privileges: ${JSON.stringify(chosenPrivileges)}`);
    return chosenPrivileges;
  }

  onSubmit() {
    if (this.groupForm.invalid) {
      this.handleFormErrors();
      return;
    }

    const selectedPrivileges: GroupPrivilegeDTO[] = this.getSelectedPrivileges();
    const newGroup: GroupDTO = {
      name: this.groupForm.value.groupName,
      groupPrivileges: selectedPrivileges
    };

    // Update existing group
    if (this.groupId) {
      this.groupService.updateGroup(this.groupId, newGroup).subscribe({
        next: () => this.handleSuccess('تم تحديث المجموعة بنجاح!'),
        error: (error) => this.handleError('فشل تحديث المجموعة!', error)
      });
    } else {
      this.groupService.createGroup(newGroup).subscribe({
        next: () => this.handleSuccess('تم إنشاء المجموعة بنجاح!'),
        error: (error) => this.handleError('فشل إنشاء المجموعة!', error)
      });
    }
  }

  private handleFormErrors() {
    const snackBarRef = this.snackBar.open('من فضلك قم بإدخال اسم المجموعة', 'إغلاق', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      direction: 'rtl'
    });
    snackBarRef.onAction().subscribe(() => snackBarRef.dismiss());
  }

  private handleSuccess(message: string) {
    this.router.navigate(['/admin/myGroups']);
    const snackBarRef = this.snackBar.open(message, 'إغلاق', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      direction: 'rtl'
    });
    snackBarRef.onAction().subscribe(() => snackBarRef.dismiss());
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    const snackBarRef = this.snackBar.open(`حدث خطأ أثناء ${message}`, 'إغلاق', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      direction: 'rtl'
    });
    snackBarRef.onAction().subscribe(() => snackBarRef.dismiss());
  }

  get privilegesFormArray() {
    return this.groupForm.get('privileges') as FormArray;
  }

  validateGroupName(control: AbstractControl): Observable<{ [key: string]: any } | null> {
    const groupName = control.value;

    if (groupName === this.groupNameInEditMode) {
      return of(null);
    } else {
      return this.groupService.getGroupByName(groupName).pipe(
        map(exists => exists ? { groupExists: true } : null),
        catchError(() => of(null))
      );
    }
    });
  }
}
