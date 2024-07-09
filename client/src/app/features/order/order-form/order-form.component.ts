import { OrderStatus, PaymentType ,OrderType} from './../../../Models/Enums';
import { ShippingTypeService } from './../../../services/shippingtype.service';
import { CityService } from './../../city/city.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router} from '@angular/router';
import { NgModule } from '@angular/core';
import { Order } from '../../../Models/Order';
import { GovernateServiceService } from '../../governate/governate-service.service';
import { City } from '../../../Models/City';
import { Governate } from '../../../Models/Governate';
import { BranchService } from '../../../services/branch.service';
import { MerchantService } from '../../merchant/merchant.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { ProductOrder } from '../../../Models/ProductOrder';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})


export class OrderFormComponent implements OnInit {
  modalOpen: boolean = false;
  editFlag: boolean = false;
  orderForm: FormGroup;
  productForm:FormGroup
  orderId: number | null = null;
  products: ProductOrder[] = [];
  selectedTab: string = 'customer';
  editingProductIndex: number | null = null;


  merchantId : string = ''
  orderTypes = OrderType 
  paymetTypes = PaymentType 
  shippingTypes : any = [] ; 
  branches : any = []
  cities : City[] = [];
  governates : Governate[] = [];
  OrderStatus = OrderStatus

  // paymentType !: number  
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router :Router,
    private cityService:CityService,
    private governateService:GovernateServiceService,
    private shippingService : ShippingTypeService,
    private branchService : BranchService,
    private authService : AuthService
  ) {
    this.orderForm = this.fb.group({
      id: [null],
      customerName: ['', Validators.required],
      customerPhone1: ['', Validators.required],
      customerPhone2: [''],
      customerEmail: ['', [Validators.email]],
      villageOrStreet: [''],
      villageDeliver: [false],
      orderCost: [null],
      totalWeight: [null],
      notes: [''],
      orderStatus: [null],
      orderType: [],
      paymentType:[PaymentType],
      totalCost: [null],
      shippingCost: [null],
      orderDate: [null],
      branch_Id: [null],
      shipping_Id: [null],
      merchant_Id: [''],
      representative_Id: [''],
      governate_Id: [null],
      city_Id: [null],
      productOrders: this.fb.array([]) // Initialize the form array
    });

    this.productForm = this.fb.group({
      // id :[''],
      name:[''],
      quantity: [''],
      unitPrice: [''],
      unitWeight: ['']
    })
  }

  ngOnInit() {

    this.selectedTab ='customer';

    console.log(this.getEnumKeys(this.orderTypes))
    console.log(this.orderTypes.Normal)
    this.orderService.getOrders(1,10).subscribe( {
      next:(data:any)=>{
        console.log(data)
      }
    });

    this.getMerchantId()
  
    this.cityService.getAll().subscribe({
      next:(data:City[])=>{
          this.cities= data
      }
    })

    this.governateService.getAll().subscribe({
      next:(data:Governate[])=>{
          this.governates= data
      }
    })

    this.shippingService.getShippingTypes().subscribe({
      next:(data:any[])=>{
        this.shippingTypes = data
        console.log(data)
      }
    })

    this.branchService.getBranches().subscribe({
      next:(data:any[])=>{
        console.log(data)
        this.branches =data
      }
    })

    

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.orderId = +id;
        this.loadOrder(this.orderId);
        this.editFlag = true ;
      }
    });

  }

  loadOrder(id: number) {
    this.orderService.getOrderById(id).subscribe((order: Order) => {
      this.orderForm.patchValue(order);
      // this.paymetTypes = order.paymentType
      console.log(order.orderType)
      this.orderForm.get('orderType')?.setValue(order.orderType)
      // this.orderForm.get('paymentType')?.setValue(this.paymetTypes[order.paymentType])
      // this.orderForm.get('orderType')?.setValue(order.orderType)
      this.products = order.productOrders || [];
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  openModal(product?: any,productIndex?:number) {

    if (product && productIndex !=null) {
      this.editFlag = true;
      this.editingProductIndex = productIndex
      this.productForm.get('id')?.setValue(product.id)
      this.productForm.get('name')?.setValue(product.name)
      this.productForm.get('quantity')?.setValue(product.quantity)
      this.productForm.get('unitPrice')?.setValue(product.unitPrice)
      this.productForm.get('unitWeight')?.setValue(product.unitWeight)
    } else {
      this.editFlag = false;
      this.productForm.get('id')?.setValue('')
      this.productForm.get('name')?.setValue('')
      this.productForm.get('quantity')?.setValue('')
      this.productForm.get('unitPrice')?.setValue('')
      this.productForm.get('unitWeight')?.setValue('')
    }
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.editFlag = false
  }

  addOrEditProduct() {
    if (this.editFlag && this.editingProductIndex !==null) {
      this.products[this.editingProductIndex] = this.productForm.value     
    } else {
     this.products.push(this.productForm.value)
    }
    this.closeModal();
  }

  deleteProduct(name: string) {
    this.products = this.products.filter(p => p.name !== name);
    console.log(this.products)
  }

  handleSubmit() {
    
    console.log(this.calculateOrderCost())
    console.log(this.calculateTotalWeight())

    // console.log(this.orderForm)
    console.log(this.products)
    if (this.orderForm.valid) {
      console.log("valid")
      let orderData: Order = this.orderForm.value;
      orderData.productOrders = this.products;
      orderData.orderCost = this.calculateOrderCost()
      orderData.totalWeight = this.calculateTotalWeight()
      
      console.log(orderData)
      console.log(this.products)
      if (this.orderId) {
        orderData.id = this.orderId
        console.log(orderData)
        this.orderService.editItem(this.orderId, orderData).subscribe( {
          next:(data:any)=>{
            console.log(data)
            this.router.navigate(['order/all'])
          },
          error:(data:any)=>{
            console.log(data)
        }
      });
      } else {
        orderData.id= 0
        orderData.orderStatus = this.OrderStatus.New
        orderData.representative_Id=null
        this.orderService.addItem(orderData).subscribe({
            next:(data:any)=>{
              console.log(data)
              this.router.navigate(['order/all'])

            },
            error:(data:any)=>{
              console.log(data)
            }
        });
      }
    }
  }

  getEnumKeys<T extends object>(enumType: T): (keyof T)[] {
    return Object.keys(enumType).filter(key => isNaN(Number(key as any))) as (keyof T)[];
  }

  getMerchantId() 
  {
     this.authService.getUserDetails().subscribe({
      next:(data:any)=>{
        this.orderForm.get('merchant_Id')?.setValue(data.id)
        console.log("merchant",this.orderForm.get('merchant_Id')?.value)
      }}
    ) 
  }

  calculateOrderCost() {
    const totalCost = this.products.reduce((sum, product) => {
      return sum + (product.unitPrice*product.quantity || 0); 
    }, 0);
    return totalCost;
  }


  calculateTotalWeight(){
    const totalWeight = this.products.reduce((total,product)=>{
      return total+(product.unitWeight*product.quantity|| 0 );
    },0)

    return totalWeight ;
  }

  



}