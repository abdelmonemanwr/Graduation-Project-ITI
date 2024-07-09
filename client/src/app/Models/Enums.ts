// export enum OrderStatus {
//     New = 'New',
//     Pending = 'Pending',
//     DeliveredToRepresentitive = 'DeliveredToRepresentitive',
//     DeliveredToCustomer = 'DeliveredToCustomer',
//     UnReachable = 'UnReachable',
//     Postponed = 'Postponed',
//     DeliveredPartially = 'DeliveredPartially',
//     CustomerCanceled = 'CustomerCanceled',
//     RejectedWithPaying = 'RejectedWithPaying',
//     RejectedWithPartialPaying = 'RejectedWithPartialPaying',
//     RejectedFromEmployee = 'RejectedFromEmployee'
//   }

export enum OrderStatus {
  New = 'جديد',
  Pending = 'قيد الانتظار',
  DeliveredToRepresentitive = 'تم التسليم للمندوب',
  DeliveredToCustomer = 'تم التسليم',
  UnReachable = 'لا يمكن الوصول',
  Postponed = 'تم التاجيل ',
  DeliveredPartially = 'تم التسليم جزئيا',
  CustomerCanceled = 'تم الالغاء من قبل المستلم',
  RejectedWithPaying = 'تم الرفض مع الدفع',
  RejectedWithPartialPaying = 'رفض مع سداد جزء',
  RejectedFromEmployee = 'رفض ولم يتم الدفع'
}
  
  export enum OrderType {
    Normal = 'الاستلام من الفرع ',
    PickUp = 'الاستلام من التاجر'
  }
  
  export enum PaymentType {
    PayOnDeliver = 'الدفع عند التوصيل',
    Deposit = 'الدفع مقدما',
    PackageForPackage = 'طرد مقابل طرد'
  }