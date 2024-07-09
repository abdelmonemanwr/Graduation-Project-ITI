import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderStatus } from '../../../Models/Enums';
import { Order } from '../../../Models/Order';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-reports',
  templateUrl: './order-reports.component.html',
  styleUrls: ['./order-reports.component.css']
})

export class OrderReportsComponent implements OnInit {
  orders: Order[] = [];
  selectedStatus!: OrderStatus  // def choice
  startDate: Date = new Date();
  endDate: Date = new Date();
  // displayedColumns: string[] = ['index', 'id', 'orderStatus', 'merchantId', 'customerName', 'customerPhone1', 'governateId', 'cityId', 'orderCost', 'totalCost', 'shippingCost', 'orderDate'];
  totalOrders: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  orderStatus= OrderStatus 


  constructor(private orderService: OrderService) {}

  ngOnInit(): void {

    this.getOrders();
    
  }

  getOrders(): void {
    this.orderService.getOrders(this.currentPage, this.itemsPerPage).subscribe((data) => {
      this.orders = data;
      this.totalOrders = data.length;
    });
  }

  filterOrders(): void {
    console.log(this.selectedStatus)
    if(this.selectedStatus == undefined){
      this.getOrders();
    }
    else{
      this.orderService.filterOrderByStatusAndDate(this.selectedStatus, this.startDate, this.endDate).subscribe((data) => {
        this.orders = data;
        console.log(data)
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.getOrders();
  }


  getEnumKeys<T extends object>(enumType: T): (keyof T)[] {
    return Object.keys(enumType).filter(key => isNaN(Number(key as any))) as (keyof T)[];
  }

  getEnumKey<T extends object>(enumType: T,key:any): any {
    for (const status in OrderStatus) {
      if (OrderStatus.hasOwnProperty(status)) {
        const value = OrderStatus[status as keyof typeof OrderStatus];
        return value
      }
    }
  }
}
