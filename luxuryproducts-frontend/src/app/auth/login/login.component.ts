import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response.model';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoggedIn: boolean = false;
  loginError = false; // Tracks if there was a login error

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public onSubmit(): void {
    this.loginError = false; // Reset login error state on each submission

    this.authService.login(this.loginForm.value)
        .subscribe({
          next: (authResponse: AuthResponse) => {
            this.router.navigate(['/home']); // Redirect to home on successful login
          },
          error: (err) => {
            console.error(err); // For debugging purposes
            this.loginError = true; // Set login error state to true
          }
        });
  }

  public navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
