import { Order } from './../../../Models/Order';
import { OrderStatus } from './../../../Models/Enums';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule ,FormBuilder,Validators} from '@angular/forms';
import { OrderService } from '../../order/order.service';
import {ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit{

  orderStatus= OrderStatus 
  
  orders : Order[] = [] 

  orderId : number = 0
  modalOpen : boolean = false
  editFlag: boolean = false

  statusForm!:FormGroup


  
  constructor(
    private orderService:OrderService,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute
  ) {
    // this.orderStatus = OrderStatus
    
  }
  ngOnInit(): void {

    this.statusForm = this.formBuilder.group({
      status:['',]
    })
    

    this.route.paramMap.subscribe(params => {
      const key = params.get('id');
      if (key) {
        console.log("pram map was called",key);
        this.filterOrder(key as OrderStatus);  // Cast to OrderStatus if necessary
      } else {
        this.getAll();
      }
    });
  }


  filterOrder(status:OrderStatus){

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
  }

  deleteOrder(id : number){

    this.orderService.deleteItem(id).subscribe({
      next:(data:any)=>{
        this.orders = data
        console.log(data)
      }
    })
  }

  openModal(id:number) {
    this.modalOpen = true;
    this.orderId = id 
    console.log(id)
    
  }

  closeModal() {
    this.modalOpen = false;
    this.editFlag = false;
  }


  showStatus(event:Event){
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    console.log(selectedValue)
    console.log("change")
  }

  changeStatus(){

    console.log(this.orderId,this.statusForm.get('status')?.value)
    console.log(this.statusForm.value)
    this.orderService.changeStatus(this.orderId,this.statusForm.get('status')?.value).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.closeModal()
      },
      error:(error)=>{
        console.log(error)
      }
    })

  }

  getAll(){
    this.orderService.getOrders(1,10).subscribe({
      next:(data:Order[])=>{
        this.orders = data
        console.log(data)
      }
    })
  }

}
