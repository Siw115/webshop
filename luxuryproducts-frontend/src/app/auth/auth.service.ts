import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { AuthResponse } from './auth-response.model';
import { AuthRequest } from './auth-request.model';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // BehaviorSubject to keep track of user's login status
  public $userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { }

    public login(authRequest: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(environment.base_url + '/auth/login', authRequest)
            .pipe(
                tap((authResponse: AuthResponse) => {
                    this.tokenService.storeToken(authResponse.token);
                    this.$userIsLoggedIn.next(true);
                }),
                catchError((error) => {
                    console.error('Login error:', error);
                    return throwError(() => new Error('Login failed, please try again.'));
                })
            );
    }

    public register(authRequest: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(environment.base_url + '/auth/register', authRequest)
            .pipe(
                tap((authResponse: AuthResponse) => {
                    this.tokenService.storeToken(authResponse.token);
                    this.$userIsLoggedIn.next(true);
                }),
                catchError((error) => {
                    console.error('Registration error:', error);
                    return throwError(() => new Error('Registration failed, please try again.'));
                })
            );
    }

    public logOut(): void {
        this.tokenService.dropToken();
        this.$userIsLoggedIn.next(false);
        this.router.navigate(['/']);
    }

    navigateToHome() {
        this.router.navigate(['/home']);
    }

    getUserRoles(): string[] {
        const roles = this.tokenService.getUserRoles();
        console.log('User roles:', roles); // Add logging
        return roles;
    }

}
