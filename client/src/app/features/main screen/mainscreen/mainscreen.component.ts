// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-mainscreen',
//   templateUrl: './mainscreen.component.html',
//   styleUrls: ['./mainscreen.component.css']
// })
// export class MainScreenComponent {
//   cards = [
//     { number: 0, text: 'تم التسليم' },
//     { number: 0, text: 'تم التسليم للمندوب' },
//     { number: 0, text: 'قيد الانتظار' },
//     { number: 0, text: 'جديد' },
//     { number: 0, text: 'تم الالغاء من قبل المستلم' },
//     { number: 0, text: 'تم التسليم جزئيا' },
//     { number: 0, text: 'تم التأجيل' },
//     { number: 0, text: 'لا يمكن الوصول' },
//     { number: 0, text: 'رفض من الموظف' },
//     { number: 0, text: 'رفض مع سداد جزء' },
//     { number: 0, text: 'تم الرفض مع الدفع' }
//   ];
// }
import { Component } from '@angular/core';
//import { OrderService } from 'src/app/modules/shared/services/order.service';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.css']
})
export class MainScreenComponent {
  //countOfOrders: any;
  //StatusNames:any=this.orderService.StatusNamesExpectNewPendingAndRejectRepresentative;

  /*constructor(
    private orderService:OrderService,
    private navTitleService:NavTitleService) { }

  ngOnInit(): void {
   /* this.navTitleService.title.next('الرئيسية')
    this.countOfOrders=[0,0,0,0,0,0,0,0]
    this.orderService.CountOrdersForRepresentativeByStatus().subscribe((res) => {
      this.countOfOrders = res;
    })
  }*/
}