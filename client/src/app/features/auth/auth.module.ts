import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  declarations: [ LoginComponent, LogoutComponent, ForgetPasswordComponent, ResetPasswordComponent ],
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, AuthRoutingModule,  ],
  exports: [ LoginComponent, LogoutComponent, ForgetPasswordComponent ]
})

export class AuthModule { }
