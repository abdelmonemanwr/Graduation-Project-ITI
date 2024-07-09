import { PrivilegeService } from './../../features/admin/Services/privilege.service';
import { Component, OnInit } from '@angular/core';
import { GroupPrivilegeDTO } from '../../features/admin/interfaces/group-privilege-dto';
import { AuthService } from '../../features/auth/auth.service';
import { map } from 'rxjs';
import { PrivilegeDTO } from '../../features/admin/interfaces/privilege-dto';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  dropdownOpen = false;
  privileges: GroupPrivilegeDTO[] | null = null;

  constructor(private authService: AuthService, private privilegeService: PrivilegeService) {}

  ngOnInit(): void {
    this.privileges = this.authService.getPrivileges();
    console.log(this.privileges)
  }
  
  hasPrivilege(privilegeName: string, permission: 'add' | 'delete' | 'update' | 'view'): boolean {
    // if (!this.privileges) 
    //   return false;
    // return this.privileges.some(curPrivilege => 
    //   this.privilegeService.getPrivilegeById(curPrivilege.privelege_Id).pipe(
    //     map((privilegeDTO: PrivilegeDTO) => 
    //       privilegeDTO.name.toLowerCase() === privilegeName.toLowerCase() && curPrivilege[permission] === true
    //     )
    //   ).toPromise()
    // );

    // this.privileges?.forEach(curPrivilege => console.log(curPrivilege))
      let privelegeFlag = false 

    //   this.privileges?.some(curPrivilege => {
    //     this.privilegeService.getPrivilegeById(curPrivilege.privelege_Id).subscribe({
    //       next:(privelegeDto:PrivilegeDTO)=>{
            
    //         if(privelegeDto.name.toLowerCase() === privilegeName.toLowerCase() && curPrivilege[permission] === true)
    //         {
    //           privelegeFlag = true ;
    //         }
    //       }
    //     })
    //   }
    // );

    console.log(this.privileges?.forEach(cur=>console.log(cur)))
    return privelegeFlag ;
  }
}