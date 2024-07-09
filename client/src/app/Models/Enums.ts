export enum OrderStatus {
    New = 'New',
    Pending = 'Pending',
    DeliveredToRepresentitive = 'DeliveredToRepresentitive',
    DeliveredToCustomer = 'DeliveredToCustomer',
    UnReachable = 'UnReachable',
    Postponed = 'Postponed',
    DeliveredPartially = 'DeliveredPartially',
    CustomerCanceled = 'CustomerCanceled',
    RejectedWithPaying = 'RejectedWithPaying',
    RejectedWithPartialPaying = 'RejectedWithPartialPaying',
    RejectedFromEmployee = 'RejectedFromEmployee'
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