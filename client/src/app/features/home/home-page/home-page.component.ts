import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  cards = [
    { number: 0, text: 'تم التسليم' },
    { number: 0, text: 'تم التسليم للمندوب' },
    { number: 0, text: 'قيد الانتظار' },
    { number: 0, text: 'جديد' },
    { number: 0, text: 'تم الالغاء من قبل المستلم' },
    { number: 0, text: 'تم التسليم جزئيا' },
    { number: 0, text: 'تم التأجيل' },
    { number: 0, text: 'لا يمكن الوصول' },
    { number: 0, text: 'رفض من الموظف' },
    { number: 0, text: 'رفض مع سداد جزء' },
    { number: 0, text: 'تم الرفض مع الدفع' }
  ];
}
