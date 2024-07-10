import { MerchantGuard } from './guards/merchant.guard';
import { VillageCostModule } from './features/village-cost/village-cost.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
const routes: Routes = [
  {path:'governate',loadChildren:()=>import('./features/governate/governate.module').then(m=>m.GovernateModule)},
  {path:'city',loadChildren:()=>import('./features/city/city.module').then(m=>m.CityModule)},
  {path:'employee',loadChildren:()=>import('./features/employee/employee.module').then(m=>m.EmployeeModule)},
  { path: 'merchants', loadChildren: () => import('./features/merchant/merchants.module').then(m => m.MerchantsModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard] },
  { path: 'main-screen', loadChildren: () => import('./features/main screen/mainscreen.module').then(m => m.mainscreenModule), canActivate: [authGuard] },
  { path: 'weight', loadChildren: () => import('./features/weight/weight.module').then(m => m.WeightModule), canActivate: [authGuard] },
  { path: 'village-cost', loadChildren: () => import('./features/village-cost/village-cost.module').then(m => m.VillageCostModule), canActivate: [authGuard] },
  { path: 'branch', loadChildren: () => import('./features/branch/branch.module').then(m => m.BranchModule), canActivate: [authGuard] },
  { path: 'representative', loadChildren: () => import('./features/representative/representative.module').then(m => m.RepresentativeModule), canActivate: [authGuard] },
  { path: 'shippingtype', loadChildren: () => import('./features/shippingtype/shippingtype.module').then(m => m.ShippingTypeModule), canActivate: [authGuard] },
  { path: 'order', loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule)},
  { path: 'mainscreen', loadChildren: () => import('./features/main screen/mainscreen.module').then(m=>m.mainscreenModule)},
  // { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
  {path:'merchant',loadChildren:()=>import('./features/merchant-user/merchant-user.module').then(m=>m.MerchantUserModule),canActivate:[MerchantGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
