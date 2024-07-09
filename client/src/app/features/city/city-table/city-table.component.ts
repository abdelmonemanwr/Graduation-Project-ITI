import { City } from '../../../Models/City';
import { Component, ElementRef, OnInit, ViewChild,Input } from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { FormGroup, FormsModule, ReactiveFormsModule ,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from '../city.service';
import { Governate } from '../../../Models/Governate';
import { GovernateServiceService } from '../../governate/governate-service.service';
@Component({
  selector: 'app-city-table',
  templateUrl: './city-table.component.html',
  styleUrl: './city-table.component.css'
})
export class CityTableComponent implements OnInit {

  totalItems: number = 0; // Add this to track the total number of cities
  pageNumber: number = 1;
  pageSize: number = 10;
  
  modalOpen : boolean = false

  cities : City[] | null = null 

  governates?: Governate[]

  cityForm!:FormGroup

  editFlag: boolean = false

  cityName : string = ''

  gover_id : number = 0

  constructor(private cityService : CityService,private governateService : GovernateServiceService,private formBuilder:FormBuilder,private router:Router) {

  }
  ngOnInit(): void {

    this.loadCities()
    this.governateService.getAll().subscribe({
      next:(data:Governate[])=>{

        this.governates = data 
      }

    })

   
    this.cityForm = this.formBuilder.group({
      id:[0],
      name : ['',Validators.required],
      normalCost:['',Validators.required],
      pickUpCost :['',Validators.required],
      governate_Id :[0],

    })


  }
  // hanelNext (){

  //   this.page = this.page + 1
  //   this.loadData()
  // }
  cityHandler(){

    if(this.editFlag){
      let city : City ={
        id : this.cityForm.get('id')?.value ,
        name : this.cityForm.get('name')?.value  ,
        normalCost : this.cityForm.get('normalCost')?.value,
        pickUpCost : this.cityForm.get('pickUpCost')?.value,
        governate_Id :this.cityForm.get('governate_Id')?.value,
      }
      this.cityService.editItem(city.id , city).subscribe({
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
      this.addCity()
    }
  }

  search(){

    console.log(this.cityName)

    this.cityService.searchByName(this.cityName).subscribe({
      next:(data:City)=>{
        this.cities = []
        this.cities.push(data)
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

  addCity() {

    let city : City ={
      id : 0,
      name : '',
      normalCost:0,
      pickUpCost :0,
      governate_Id : 0
    };

    console.log(this.cityForm)
    if (this.cityForm.invalid){
      console.log("invalid")
      return 
    }

    city = this.cityForm.value
  
    console.log(city)

    this.cityService.addItem(city).subscribe({
      next:(data:any)=>{
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      }
    })
  }


  editCity(city:City){

    this.editFlag = true;
    this.openModal()
    this.cityForm = this.formBuilder.group({
      id : [city.id] ,
      name : [city.name,Validators.required],
      normalCost:[city.normalCost,Validators.required],
      pickUpCost :[city.pickUpCost,Validators.required],
      governate_Id :[city.governate_Id]
    })

  }

 deleteCity(cityId : number){
    this.cityService.deleteItem(cityId).subscribe({
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
   loadCities() {
  
    this.cityService.getCities(this.pageNumber, this.pageSize).subscribe({
      next:(data:City[])=>{
        this.cities = data 
        this.totalItems = 30;
      }
    })
  }
  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadCities();
  }

  filterByGovernate(event : Event){

    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    
    if(parseInt(selectedValue) == 0){
      this.cityService.getAll().subscribe({
        next:(data:City[])=>{
          this.cities = data
        }
      }
    )
    }
    if(selectedValue != null){

      this.cityService.filterByGovernate(parseInt(selectedValue)).subscribe({
        next:(data:City[])=>{
          this.cities = data
        }
      })
    }
  }

  openModal() {
    this.modalOpen = true;
    
   
    
  }

  closeModal() {
    this.modalOpen = false;
  }
  
}


