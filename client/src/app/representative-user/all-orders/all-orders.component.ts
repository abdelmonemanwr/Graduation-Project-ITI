import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule ,FormBuilder,Validators} from '@angular/forms';
import { OrderService } from '../../features/order/order.service';
import { Order } from '../../Models/Order';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderStatus } from '../../Models/Enums';
import { AuthService } from '../../features/auth/auth.service';


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

  representative_id : string = ''

  status : any 

  constructor(
    private orderService:OrderService,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private auth: AuthService,
    private router:Router
  ) {
    
  }
  ngOnInit(): void {

    this.statusForm = this.formBuilder.group({
      status:['',]
    })
    

    this.getAll()
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
    this.status = target.value;
  }

  changeStatus(){
     this.orderService.changeStatus(this.orderId,this.status).subscribe({
      next:(data:any)=>{
        this.closeModal()
        this.router.navigate(['/representative'])
      },
      error:(error)=>{
        console.log(error)
      }
    })

  }

  getAll(){

    this.auth.getUserDetails().subscribe({
      next:(data:any)=>{
          this.representative_id = data.id
          this.orderService.getRepresentativeOrders(this.representative_id).subscribe({
            next:(data:Order[])=>{
              this.orders = data
              this.orders.forEach(order => {
                order.orderDate = new Date(order.orderDate);
              });
              this.route.paramMap.subscribe(params => {
              const id = params.get('id');
                if (id) {
                  this.orders =  this.orders.filter(o=>o.orderStatus == id)
                  console.log(this.orders)
                }
              });
            }
      
          })
      }}
    )
  }

}
