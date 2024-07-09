// merchant-detail-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-merchant-modal',
  templateUrl: './merchant-modal.component.html',
  styleUrls: ['./merchant-modal.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Default option
})
export class MerchantModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MerchantModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
