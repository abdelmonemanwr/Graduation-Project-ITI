import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeightService } from '../../../services/weight.service';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {
  weightForm: FormGroup;
  isEditMode = false; // Flag to determine if form is in edit mode

  constructor(
    private fb: FormBuilder,
    private weightService: WeightService
  ) {
    this.weightForm = this.fb.group({
      id: [''],
      additionalKgPrice: ['', Validators.required],
      maximumWeight: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.weightService.getWeightSettings().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const weightSettings = data[0]; // Assuming only one record exists based on your backend logic
          this.weightForm.patchValue({
            id: weightSettings.id,
            additionalKgPrice: weightSettings.additionalKgPrice,
            maximumWeight: weightSettings.maximumWeight
          });
          this.isEditMode = true;
        } else {
          this.isEditMode = false;
        }
      },
      error => {
        console.error('Error fetching weight settings:', error);
      }
    );
  }

  onSubmit() {
    if (this.weightForm.invalid) {
      return;
    }

    const formData = this.weightForm.value;
    if (this.isEditMode) {
      // Update existing record
      this.weightService.updateWeightSettings(formData.id, formData).subscribe(
        response => {
          console.log('Weight settings updated successfully', response);
          alert('تم تحديث الإعدادات بنجاح');
        },
        error => {
          console.error('Error updating weight settings', error);
          alert('لم يتم تحديث الإعدادات');
        }
      );
    } else {
      // Add new record
      this.weightService.addWeightSettings(formData).subscribe(
        response => {
          console.log('Weight settings added successfully', response);
          alert('تم حفظ الإعدادات بنجاح');
        },
        error => {
          console.error('Error adding weight settings', error);
          alert('لم يتم حفظ الإعدادات');
        }
      );
    }
  }
}
