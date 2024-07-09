import { Component, OnInit,ViewChild} from '@angular/core';
import { MerchantService } from '../merchant.service';
import { Merchant } from '../merchant.model';
import { MatDialog } from '@angular/material/dialog';
import { MerchantFormComponent } from '../merchant-form/merchant-form.component';
//import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MerchantModalComponent } from '../merchant-modal/merchant-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MerchantDTO } from '../merchant.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {
  deleteMerchant(merchantId: string): void {
    // Show confirmation alert
    Swal.fire({
      title: 'هل انت متأكد?',
      text: "سوف تقيل بتغير حاله هذا المستخدم",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete service method
        this.merchantService.deleteMerchant(merchantId).subscribe(
          () => {
            // On success, show a success alert and refresh the list
            Swal.fire(
              '!تم',
              'تم تغيير حاله المستخدم',
              'success'
            );
            this.loadMerchants(); // Reload the merchant list
          },
          (error) => {
            // On error, show an error alert
            console.error('Error deleting merchant:', error);
            Swal.fire(
              '!خطأ',
              'حدث خطأ اثناء اغاء تفعيل تعديل حاله المستخدم',
              'error'
            );
          }
        );
      }
    });
  }

  
  merchants: Merchant[] = [];
  page = 1;
  pageSize = 5;
  totalMerchants = 0;
  

  constructor(private merchantService: MerchantService,public dialog: MatDialog,private modalService: NgbModal ) {
    console.log('merchant intialized')
  }

  ngOnInit(): void {
    this.loadMerchants();
    console.log('merchant intialized')
  }

  loadMerchants(): void {
    this.merchantService.getMerchants(this.page, this.pageSize).subscribe(response => {
      this.merchants = response;
      console.log(this.merchants)
      this.totalMerchants = response.length;
      console.log(this.totalMerchants)
    });
  }
  onPageNext( ): void {
    if(this.page >= Math.ceil(this.totalMerchants / this.pageSize)) return
    this.page = this.page +1;
    this.loadMerchants();
  }
  onPagePrevious(): void {
    if(this.page <= 1) return
    this.page = this.page - 1;
    this.loadMerchants();
  }
  onPageReset(): void {
    this.page = 1;
    this.loadMerchants();
   
  }
  openMerchantDetail(merchantId: string): void {
    this.merchantService.getMerchantById(merchantId).subscribe((merchant) => {
      const dialogRef = this.dialog.open(MerchantModalComponent, {
        width: '40vw',
        data: { merchant }
      });
      dialogRef.afterClosed().subscribe(result => {
        //this.loadMerchants();
        console.log('The dialog was closed');
      });
    });
  }
  openMerchantFormModal(merchant?: Merchant): void {
    const modalRef = this.modalService.open(MerchantFormComponent, {
      windowClass: 'FormModal', 
      size: 'xl',
      
    });
    modalRef.componentInstance.initialMerchant = merchant; 
    modalRef.componentInstance.operationSuccess.subscribe((result: string) => {
      if (result === 'success') {
        this.loadMerchants(); 
        this.showSuccessAlert();
      }
    });
    modalRef.result.then(
      (result) => {
        
      
        
        console.log('Modal closed with result:', result);
        
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
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

