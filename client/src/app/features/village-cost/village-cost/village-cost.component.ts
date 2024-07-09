
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VillageCostService } from '../../../services/village-cost.service';

@Component({
  selector: 'app-village-cost',
  templateUrl: './village-cost.component.html',
  styleUrls: ['./village-cost.component.css']
})
export class VillageCostComponent implements OnInit {
  villageCostForm: FormGroup;
  isEditMode = false; // Flag to determine if form is in edit mode

  constructor(
    private fb: FormBuilder,
    private villageCostService: VillageCostService
  ) {
    this.villageCostForm = this.fb.group({
      id: [''],
      price: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.villageCostService.getAllVillageCosts().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const villageCost = data[0]; // Assuming only one record exists based on your backend logic
          this.villageCostForm.patchValue({
            id: villageCost.id,
            price: villageCost.price
          });
          this.isEditMode = true;
        } else {
          this.isEditMode = false;
        }
      },
      error => {
        console.error('Error fetching village costs:', error);
      }
    );
  }

  onSubmit() {
    if (this.villageCostForm.invalid) {
      return;
    }

    const formData = this.villageCostForm.value;
    if (this.isEditMode) {
      // Update existing record
      this.villageCostService.updateVillageCost(formData.id, formData).subscribe(
        response => {
          console.log('Village cost updated successfully', response);
          alert('تم تحديث السعر بنجاح');
        },
        error => {
          console.error('Error updating village cost', error);
          alert('لم يتم تحديث السعر');
        }
      );
    } else {
      // Add new record
      this.villageCostService.addVillageCost(formData).subscribe(
        response => {
          console.log('Village cost added successfully', response);
          alert('تم حفظ السعر بنجاح');
        },
        error => {
          console.error('Error adding village cost', error);
          alert('لم يتم حفظ السعر');
        }
      );
    }
  }
}
