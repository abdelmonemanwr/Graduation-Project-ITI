export interface Merchant {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    userName: string;
    address: string;
    governate: string;
    city: string;
    storeName: string;
    specialPickupCost: number;
    inCompleteShippingRatio: number;
    branchName: string;
    specialPrices: SpecialPrice[];
    isDeleted : boolean;
  }
  
  export interface MerchantDTO {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    userName: string;
    address: string;
    governate: string;
    city: string;
    storeName: string;
    specialPickupCost: number;
    inCompleteShippingRatio: number;
    branchName: string;
    specialPrices: SpecialPriceDTO[];
  }
  
  export interface SpecialPriceDTO {
    transportCost: number;
    governate: string;
    city: string;
  }
  
  export interface SpecialPrice {
    transportCost: number;
    governate: string;
    city: string;
  }
  