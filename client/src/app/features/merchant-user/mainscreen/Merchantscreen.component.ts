import { OrderStatus } from './../../../Models/Enums';
import { Component } from '@angular/core';
import { OrderService } from '../../order/order.service';
import { Order } from '../../../Models/Order';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-mainscreen',
  templateUrl: './Merchantscreen.component.html',
  styleUrls: ['./mainscreen.component.css']
})
export class MerchantscreenComponent {

  orderStatus =  OrderStatus

  orderStatusKeys = Object.keys(OrderStatus).filter(key => isNaN(Number(key)));
  
  orders : Order[] = []

  merchant_Id = ''

  constructor(private orderService:OrderService,private authService : AuthService) { }

  ngOnInit(): void {

    this.getMerchantId()
  }

  getEnumKeys<T extends object>(enumType: T): (keyof T)[] {
    return Object.keys(enumType).filter(key => isNaN(Number(key as any))) as (keyof T)[];
  }

  getMerchantId()
  {
     this.authService.getUserDetails().subscribe({
      next:(data:any)=>{
          this.merchant_Id = data.id
          this.orderService.getMerchantOrders(this.merchant_Id).subscribe({
            next:(data:Order[])=>{
              this.orders = data
            }
      
          })
      }}
    ) 
  }


  getOrderNumbersByStatus(status :any):number{
    return this.orders.filter(o=>o.orderStatus == status ).length
  }


  filterOrder(status:any){

    this.orderService.filterOrderByStatus(status).subscribe({

      next:(data:any)=>{
        this.orders = data
        console.log(data)
      }
      ,
      error:(data:any)=>{
        console.log(data)
      }
    })

    console.log(status)
  }

}