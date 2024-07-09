    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    import { MerchantListComponent } from './merchant-list/merchant-list.component';
    import { MerchantFormComponent } from './merchant-form/merchant-form.component';
    
    const routes: Routes = [
        { path: '', component: MerchantListComponent },
        { path: 'new', component: MerchantFormComponent },
        { path: 'edit/:id', component: MerchantFormComponent }
    ];

    @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
    })
    export class MerchantsRoutingModule { }
