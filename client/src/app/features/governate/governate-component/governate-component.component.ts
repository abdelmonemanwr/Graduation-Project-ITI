import { Governate } from './../../../Models/Governate';
import { GovernateServiceService } from './../governate-service.service';
import { Component, ElementRef, OnInit, ViewChild,Input } from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { FormGroup, FormsModule, ReactiveFormsModule ,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-governate-component',
  templateUrl: './governate-component.component.html',
  styleUrl: './governate-component.component.css'
})
export class GovernateComponentComponent implements OnInit {

  totalItems: number = 0; 
  pageNumber: number = 1;
  pageSize: number = 10;

  governates : Governate[] | null = null 

  modalOpen : boolean = false

  governateForm!:FormGroup

  editFlag: boolean = false

  governateName : string = ''

  constructor(private  governateService : GovernateServiceService,private formBuilder:FormBuilder,private router:Router) {

  }
  ngOnInit(): void {

    this.loadGovernates()

    this.governateForm = this.formBuilder.group({
      name:['',Validators.required],
      status:[false,Validators.required]
    })
  }

  governateHandler(){

    if(this.editFlag){
      
      console.log("clicked")
      let governate : Governate ={
        id : this.governateForm.get('id')?.value ,
        name : this.governateForm.get('name')?.value  ,
        status : this.governateForm.get('status')?.value  
      }

      console.log("edited governate",governate.id , governate)
      this.governateService.editItem(governate.id,governate).subscribe({
        next:(data:any)=>{
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
          });
        }
        ,
        error:(error)=>{

          console.log(error)
        }
      })
    }
    else {
      this.addGovernate()
    }
  }

  search(){

    console.log(this.governateName)

    this.governateService.searchByName(this.governateName).subscribe({
      next:(data:Governate)=>{
        this.governates = []
        this.governates.push(data)
      }
      ,
      error:(error)=>{
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      }
    })
  }

  addGovernate() {

    
    let governate : Governate ={
      id : 0 ,
      name : '',
      status : false
    }
    if (this.governateForm.invalid){
      return 
    }
    governate = this.governateForm.value

   // console.log(governate)

    this.governateService.addItem(governate).subscribe({
      next:(data:any)=>{
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      }
    })
  }


  editGovernate(governate:Governate){

    this.editFlag = true;
    this.openModal()
    this.governateForm = this.formBuilder.group({
      id:[governate.id],
      name:[governate.name,Validators.required],
      status:[governate.status,Validators.required]
    })

  }

 deleteGovernate(governateId : number){
    this.governateService.deleteItem(governateId).subscribe({
      next:(data)=>{
        console.log(data)
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      }
      ,
      error:(error)=>{
        console.log(error)
  }
    })
 }

  openModal() {
    this.modalOpen = true;
    
  }

  closeModal() {
    this.modalOpen = false;
    this.editFlag = false;
  }
  loadGovernates() {
    this.governateService.getGovernates(this.pageNumber,this.pageSize).subscribe({
      next:(data:Governate[])=>{
        console.log(data)
        this.governates = data 
        this.totalItems = 30;
      }
    })
  }
   
  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadGovernates();
  }

}
