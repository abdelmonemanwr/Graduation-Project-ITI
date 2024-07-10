import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from '../interfaces/login-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginCredentials: LoginDTO = {
        email: this.email?.value,
        password: this.password?.value,
        rememberMe: this.rememberMe?.value
      };
      this.authService.login(loginCredentials).subscribe({
        next: (response) => {
          this.snackBar.open('تم تسجيل الدخول بنجاح', 'اغلاق', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            direction: 'rtl'
          });
          console.log("Login done successfully as " + response.role + ":)");
          console.log(`login credentials ${JSON.stringify(loginCredentials)}`)
          console.log(`login credentials ${JSON.stringify(response)}`)
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.redirectUser(response.role);
        },
        error: (error) => {
          console.error('Login failed:', error);
          if (error.status === 400 && error.error?.errors) {
            const validationErrors = error.error.errors;
            if (validationErrors.Email) {
              console.error('Email validation errors:', validationErrors.Email);
            }
          } else {
            console.error('Unexpected error:', error.message);
          }
        }
      });
    } else {
      this.validateFormFields(this.loginForm);
    }
  }

  private redirectUser(role: string) {
    if (role === 'admin'){
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'employee') {
      this.router.navigate(['/employee-dashboard']);
    } else if (role === 'merchant') {
      this.router.navigate(['/merchant']);
    // } else if (role === 'supportive') {
    //   this.router.navigate(['/supportive-dashboard']);
    // }
    }
  }

  // forgetPassword(){

  // }
}
