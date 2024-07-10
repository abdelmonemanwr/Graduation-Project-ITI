import { Component } from '@angular/core';
import { OrderStatus } from '../../Models/Enums';
import { Order } from '../../Models/Order';
import { OrderService } from '../../features/order/order.service';
import { AuthService } from '../../features/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './RepresentativeMainScreen.component.html',
  styleUrls: ['./RepresentativeMainScreen.component.css']
})
export class RepresentativeMainScreenComponent {

  orderStatus =  OrderStatus

  orderStatusKeys = Object.keys(OrderStatus).filter(key => isNaN(Number(key)));
  
  orders : Order[] = []

  represent_id = ''

  constructor(private orderService:OrderService,private authService : AuthService,private router:Router) { }

  ngOnInit(): void {

    this.getRepresentativeData()
  }

  getEnumKeys<T extends object>(enumType: T): (keyof T)[] {
    return Object.keys(enumType).filter(key => isNaN(Number(key as any))) as (keyof T)[];
  }

  getRepresentativeData()
  {
     this.authService.getUserDetails().subscribe({
      next:(data:any)=>{
          this.represent_id = data.id
          console.log(this.represent_id)
          this.orderService.getRepresentativeOrders(this.represent_id).subscribe({
            next:(data:Order[])=>{
              this.orders = data
              console.log(data)
            }
      
          })
      }}
    ) 
  }


  getOrderNumbersByStatus(status :any):number{
    return this.orders.filter(o=>o.orderStatus == status ).length
  }

  representativeOrder(key :any) : boolean{
    if (key != this.orderStatus.DeliveredToRepresentitive || key == this.orderStatus.RejectedFromEmployee || key == this.orderStatus.Pending){

      return true
    }

    return false ;
  }

}