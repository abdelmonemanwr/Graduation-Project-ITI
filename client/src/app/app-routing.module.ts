import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard] },
  { path: 'main-screen', loadChildren: () => import('./features/main screen/mainscreen.module').then(m => m.mainscreenModule), canActivate: [authGuard] },
  { path: 'weight', loadChildren: () => import('./features/weight/weight.module').then(m => m.WeightModule), canActivate: [authGuard] },
  { path: 'village-cost', loadChildren: () => import('./features/village-cost/village-cost.module').then(m => m.VillageCostModule), canActivate: [authGuard] },
  { path: 'branch', loadChildren: () => import('./features/branch/branch.module').then(m => m.BranchModule), canActivate: [authGuard] },
  { path: 'representative', loadChildren: () => import('./features/representative/representative.module').then(m => m.RepresentativeModule), canActivate: [authGuard] },
  { path: 'shippingtype', loadChildren: () => import('./features/shippingtype/shippingtype.module').then(m => m.ShippingTypeModule), canActivate: [authGuard] },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
