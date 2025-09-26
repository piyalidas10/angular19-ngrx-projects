import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';
import { UserService } from '../../services/user/user.service';
import { User } from '../../types/user.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css',
})
export class UserSignupComponent {
  userSignupForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0; //0-success, 1-warning, 2-error

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userSignupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: [''],
        address: [''],
        city: [''],
        state: [''],
        pin: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: matchPasswords,
      }
    );
  }
  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('firstName');
  }
  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password');
  }
  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.userSignupForm.invalid) {
      this.alertMessage = 'Please fill all required fields correctly.';
      this.alertType = 1;
      this.userSignupForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, address, city, state, pin, email, password } =
      this.userSignupForm.value;

    const newUser: User = {
      firstName,
      lastName,
      address,
      city,
      state,
      pin,
      email,
      password,
    };
    this.userSignupForm.disable();

    this.userService.createUser(newUser).subscribe({
      next: (result) => {
        this.userSignupForm.enable();
        if (result.message === 'Success') {
          this.alertMessage = 'User created successfully';
          this.alertType = 0;
          this.userSignupForm.reset();
        } else if (result.message === 'Email already exists') {
          this.alertMessage = result.message;
          this.alertType = 1;
        }
      },
      error: (err) => {
        this.userSignupForm.enable();
        this.alertMessage = err.message || 'An error occurred';
        this.alertType = 2;
      },
    });
  }
}
