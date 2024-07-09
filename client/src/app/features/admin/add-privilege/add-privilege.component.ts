import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrivilegeService } from '../Services/privilege.service';
import { GroupService } from '../Services/group.service';
import { GroupDTO } from '../interfaces/group-dto';
import { PrivilegeDTO } from '../interfaces/privilege-dto';
import { GroupPrivilegeDTO } from '../interfaces/group-privilege-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Group } from '../interfaces/group';

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
      groupName: ['', [Validators.required], [this.groupNameValidator.bind(this)]],
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
            // bind name to the group name control
            groupNameControl?.setValue(groupDTO.name);
            // store the data in local variables
            this.groupNameInEditMode = groupDTO.name;
            this.userPrivileges = groupDTO.groupPrivileges;
          },
          error: (error) => {
            console.error('Failed to fetch groupDTO data fro m server', error.message);
          }
        });
      }
    });

    this.privilegeService.getPrivileges().subscribe({
      next: (data: PrivilegeDTO[]) => {
        this.privileges = data;
        console.log(`user Privileges: ${JSON.stringify(this.userPrivileges)}`);
        this.setPrivileges(data, this.userPrivileges);
      },
      error: (error) => {
        console.error('Failed to fetch privileges from server', error);
      }
    });

    const groupNameControl = this.groupForm.get('groupName');
    groupNameControl?.valueChanges.subscribe({
      next: (groupName: string) => {
        if (groupName) {
          if(this.addMode){
            this.validateGroupName(groupName);
          } else {
            if(groupName !== this.groupNameInEditMode ){
              this.validateGroupName(groupName);
            }
          }
        }
      }
    });

  }

  validateGroupName(groupName: string) {
    this.groupService.getGroupByName(groupName).subscribe({
      next: (exists: boolean) => {
        if ((exists && this.addMode) || (!this.addMode && groupName !== this.groupNameInEditMode) ) {
          const snackBarRef = this.snackBar.open('هذه المجموعة موجودة بالفعل', 'إغلاق', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            direction: 'rtl'
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
    const chosenPrivileges = this.privilegesFormArray.controls
      .filter(control => control.value.Add || control.value.Update || control.value.View || control.value.Delete)
      .map(control => control.value);
    //console.log(`selected privileges: ${JSON.stringify(chosenPrivileges)}`);
    return chosenPrivileges;
  }

  onSubmit() {
    if (this.groupForm.invalid) {
      const snackBarRef = this.snackBar.open('من فضلك قم بإدخال اسم المجموعة', 'إغلاق', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        direction: 'rtl'
      });
      snackBarRef.onAction().subscribe(() => {
        snackBarRef.dismiss();
      });
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
        next: (response) => {
          //console.log(`Updated group data: ${JSON.stringify(response)}`);
          this.router.navigate(['/admin/myGroups']);
          const snackBarRef = this.snackBar.open('تم تحديث المجموعة بنجاح!', 'إغلاق', {
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
          console.error(`Failed to update group: ${error}`);
          const snackBarRef = this.snackBar.open('حدث خطأ أثناء تحديث المجموعة', 'إغلاق', {
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
    } else {
      // Create new group
      this.groupService.createGroup(newGroup).subscribe({
        next: (response) => {
          //console.log(`New group data: ${JSON.stringify(response)}`);
          this.router.navigate(['/admin/myGroups']);
          const snackBarRef = this.snackBar.open('تم إنشاء المجموعة بنجاح!', 'إغلاق', {
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
          console.error(`Failed to create group: ${error}`);
          const snackBarRef = this.snackBar.open('حدث خطأ أثناء إنشاء المجموعة', 'إغلاق', {
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
  }

  groupNameValidator(control: AbstractControl) {
    return new Promise((resolve) => {
      if (!control.value) {
        resolve(null);
      } else {
        this.groupService.getGroupByName(control.value).pipe(
          catchError(() => of(false))
        ).subscribe({
          next: (exists: boolean) => {
            if (exists) {
              resolve({ groupExists: true });
            } else {
              resolve(null);
            }
          },
          error: (error) => {
            console.error('Error checking group name:', error);
            resolve(null);
          }
        });
      }
    });
  }
}
