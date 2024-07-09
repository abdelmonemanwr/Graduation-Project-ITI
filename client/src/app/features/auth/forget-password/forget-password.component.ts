import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.forgetPasswordForm.valid) {
      const forgetPasswordCredentials = {
        email: this.forgetPasswordForm.value.email
      };
      this.authService.forgetPassword(forgetPasswordCredentials).subscribe({
          next: (response) => {
            console.log('Password reset email sent:', response);          
          },
          error: (error) => {
              console.error('Password reset failed:', error);
          }
        });
    }
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.style.textAlign = inputElement.value ? 'left' : 'right';
  }

  get email() {
    return this.forgetPasswordForm.get('email');
  }
}
