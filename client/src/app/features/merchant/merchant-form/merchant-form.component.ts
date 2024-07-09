import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MerchantService } from '../merchant.service';
import { MerchantDTO, SpecialPriceDTO,Merchant } from '../merchant.model';
import { emailValidator, passwordValidator, noSpacesValidator } from './custom-validators'; 
import { EventEmitter, Output } from '@angular/core';
import { GovernateServiceService } from '../../governate/governate-service.service'
import Swal from 'sweetalert2';
import {CityService } from '../../city/city.service'
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrl:'./merchant-form.component.css'
})
export class MerchantFormComponent implements OnInit {
  @Input() initialMerchant?:any ; 
  @Output() operationSuccess: EventEmitter<string> = new EventEmitter<string>();
  merchantForm: any ;
  governates: any[] = [];
  cities: any[] = [];
  specialCities: any[][] = []; // Array of city lists for special prices

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private governateService: GovernateServiceService,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.loadGovernates()
    this.createForm();
    if (this.initialMerchant) {
      console.log(this.initialMerchant)
      this.populateForm(this.initialMerchant);
      
    }
  }
  
  loadCities(governateId: number): void {
    this.cityService.filterByGovernate(governateId).subscribe(data => {
      this.cities = data; // Assuming the API response has an items array
    });
  }
  onGovernateChange(event: Event): void {
    const selectedGovernateName = (event.target as HTMLSelectElement).value;
    const selectedGovernate = this.governates.find(g => g.name === selectedGovernateName);
    if (selectedGovernate) {
      this.loadCities(selectedGovernate.id);
    } else {
      this.cities = [];
    }
  }
  
  loadGovernates(): void {
    this.governateService.getGovernates(1,100).subscribe(data => {
      console.log('loadGovernates called', data)
      this.governates = data; // Assuming the API response has an items array
    });
  }
  onSpecialGovernateChange(event: Event, index: number): void {
    const selectedGovernateName = (event.target as HTMLSelectElement).value;
    const selectedGovernate = this.governates.find(g => g.name === selectedGovernateName);
    if (selectedGovernate) {
      this.loadSpecialCities(index, selectedGovernate.id);
    } else {
      this.specialCities[index] = [];
    const specialPriceGroup = this.specialPrices.controls[index] as FormGroup;
    specialPriceGroup.get('city')?.setValue('');
    }
  }
  // onSpecialCityChange(){
  //   this.cities = [];
  //   this.governates = [];
    
  // }

  loadSpecialCities(index: number, governateId: number): void {
    this.cityService.filterByGovernate(governateId).subscribe(data => {
      this.specialCities[index] = data; // Assuming the API response has an items array
    const specialPriceGroup = this.specialPrices.controls[index] as FormGroup;
    specialPriceGroup.get('city')?.setValue(''); // Reset city selection
    });
  }

  getCitiesForSpecialPrice(index: number): any[] {
    return this.cities;
  }

  isInvalid(index: number, controlName: string): boolean | undefined {
    const control = this.specialPrices.controls[index].get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }
  createForm(): void {
    this.merchantForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, emailValidator]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required,passwordValidator]],
      userName: ['', [Validators.required,noSpacesValidator]],
      address: ['', Validators.required],
      governate: ['', Validators.required],
      city: ['', Validators.required],
      storeName: ['', Validators.required],
      specialPickupCost: ['', Validators.required],
      inCompleteShippingRatio: ['', Validators.required],
      branchName: ['', Validators.required],
      specialPrices: this.fb.array([])
    });

    // Optional: Prepopulate with an initial special price
    this.addSpecialPrice();
  }

  populateForm(merchant: Merchant): void {
    this.merchantForm.patchValue({
      fullName: merchant.fullName,
      email: merchant.email,
      phoneNumber: merchant.phoneNumber,
      password: merchant.password,
      userName: merchant.userName,
      address: merchant.address,
      governate: merchant.governate,
      city: merchant.city,
      storeName: merchant.storeName,
      specialPickupCost: merchant.specialPickupCost,
      inCompleteShippingRatio: merchant.inCompleteShippingRatio,
      branchName: merchant.branchName
    });
    
    // this.merchantForm.get('governate').valueChanges.subscribe(selectedGovernate => {
    //   const governate = this.governates.find(g => g.name === selectedGovernate);
    //   if (governate) {
    //     this.loadCities(governate.id);
    //   } else {
    //     this.cities = [];
    //   }
    // });
    // Populate special prices
    this.clearSpecialPrices();
    merchant.specialPrices.forEach(sp => {
      this.specialPrices.push(this.fb.group({
        governate: sp.governate,
        city: sp.city,
        transportCost: sp.transportCost
      }));
    });
  }
  

  // Convenience getter for easy access to form array
  get specialPrices(): FormArray {
    return this.merchantForm.get('specialPrices') as FormArray;
  }

  // Method to add special price entry
  addSpecialPrice(): void {
  this.specialPrices.push(this.fb.group({
    governate: ['', Validators.required],
    city: ['', Validators.required],
    transportCost: ['', Validators.required]
  }));
  this.specialCities.push([]); // Initialize empty city list for the new special price
}


  // Method to remove a specific special price entry
  removeSpecialPrice(index: number): void {
  this.specialPrices.removeAt(index);
  this.specialCities.splice(index, 1); // Remove the corresponding city list
}

   
  get f() { return this.merchantForm.controls; }
  onSubmit(): void {
    // console.log(this.merchantForm.valid);
    // console.log(this.merchantForm.value);
    // console.log(this.merchantForm);
    
    if(!this.merchantForm.valid){
      console.log(this.merchantForm)
      Object.keys(this.merchantForm.controls).forEach(field => {
        const control = this.merchantForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
    if (this.merchantForm.valid) {
      console.log("valid")
      const merchantData: MerchantDTO = this.merchantForm.value;
      // Determine whether to create or update based on existence of initialMerchant data
      if (this.initialMerchant) {
        // Update existing merchant
        this.updateMerchant(merchantData);
      } else {
        // Create new merchant
        this.createMerchant(merchantData);
      }
    }
  }

  createMerchant(merchantData: MerchantDTO): void {
   // console.log("creating called")
     // Show loading alert
     Swal.fire({
      title: 'Creating Merchant...',
      text: 'Please wait while the merchant is being created.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.merchantService.createMerchant(merchantData).subscribe(
      (response) => {
        Swal.close(); // Close loading alert
        this.showSuccessAlert();
        console.log('Merchant created successfully:', response);

        this.operationSuccess.emit('success');
      },
      (error : HttpErrorResponse) => {
        //console.error('Error creating merchant:', error);

        // Extract error descriptions
        let errorDescriptions = 'An unknown error occurred.';
        if (error.error && Array.isArray(error.error)) {
          errorDescriptions = error.error.map(err  => err.description).join('\n');
        }

        // Display error descriptions with SweetAlert
        Swal.fire({
          title: 'Error!',
          text: errorDescriptions,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        

      }
    );
  }

  updateMerchant(merchantData: MerchantDTO): void {
      // Show loading alert
      Swal.fire({
        title: 'Creating Merchant...',
        text: 'Please wait while the merchant is being created.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    this.merchantService.updateMerchant(this.initialMerchant.id, merchantData).subscribe(
      (response) => {
        Swal.close(); // Close loading alert
       // console.log('Merchant updated successfully:', response);
        
        this.operationSuccess.emit('success');
      },
      (error : HttpErrorResponse) => {
        console.error('Error updating merchant:', error);
         // Extract error descriptions
         let errorDescriptions = 'An unknown error occurred.';
         if (error.error && Array.isArray(error.error)) {
           errorDescriptions = error.error.map(err  => err.description).join('\n');
         }
 
         // Display error descriptions with SweetAlert
         Swal.fire({
           title: 'Error!',
           text: errorDescriptions,
           icon: 'error',
           confirmButtonText: 'OK'
         });
      }
    );
  }

  // Clear special prices form array
  private clearSpecialPrices(): void {
    while (this.specialPrices.length !== 0) {
      this.specialPrices.removeAt(0);
    }
  }
  private showSuccessAlert(): void {
    Swal.fire({
      title: 'Success!',
      text: 'Operation completed successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
