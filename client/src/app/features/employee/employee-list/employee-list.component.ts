import { AuthService } from './../../auth/auth.service';
import { error } from 'console';
import { EmployeeService } from '../employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../Models/Employee';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees : Employee[]  = []

  p: number = 1; // current page

  userId : string = '' 

  employeeName : string =''

  constructor(private employeeService : EmployeeService,private authService : AuthService,private router :Router) {


  }


  ngOnInit(): void {

    this.employeeService.getAll().subscribe({
      next:(data:Employee[] )=>{
        console.log(data)
        this.employees= data
      },
      error:(error)=>{
        console.log(error)
      }
    })

    // this.authService.getUserDetails().subscribe({
    //   next:(data:any)=>{
    //     console.log(data)
    //     this.userId = data.id
    //     console.log(this.userId)
    //   }
    // })
  }

  search(){


    this.employeeService.searchByName(this.employeeName).subscribe({
      next:(data:Employee)=>{
        this.employees = []
        this.employees.push(data)
        // const currentUrl = this.router.url;
        // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        //   this.router.navigate([currentUrl]);
        // });
      }
      ,
      error:(error)=>{
       console.log(error);
      }
    })
  }

  delete(id:string){

    this.employeeService.deleteItem(id).subscribe({
        next:(response)=>{
          console.log("response",response);
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
          });
        },

        error:(error)=>{
          console.log("error:" ,error.errors);
        }
    })
  }
}
