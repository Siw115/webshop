import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response.model';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public loginForm: FormGroup;
  registerError = false; // Tracks if there was a login error

  constructor(private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }


  public onSubmit(): void {
    this.registerError = false; // Reset login error state on each submission


    this.authService
    .register(this.loginForm.value)
    .subscribe({
      next: (authResponse: AuthResponse) => {
        this.navigateToHome();
      },
      error: (err) => {
        console.error(err); // For debugging purposes
        this.registerError = true; // Set login error state to true
      }
    });
}

  public navigateToHome() {
    this.authService.navigateToHome();
  }
}
