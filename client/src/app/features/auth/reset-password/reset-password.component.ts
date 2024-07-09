import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ResetPasswordDTO } from '../interfaces/reset-password-dto';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  email: string;
  token: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validator: this.mustMatch('newPassword', 'confirmNewPassword') });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const resetPasswordCredentials: ResetPasswordDTO = {
        email: this.email,
        token: this.token,
        newPassword: this.resetPasswordForm.value.newPassword
      };
      this.authService.resetPassword(resetPasswordCredentials).subscribe({
        next: (response) => {
          console.log('Password reset successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Password reset failed:', error);
        }
      });
    }
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.resetPasswordForm.get('confirmNewPassword');
  }
}
