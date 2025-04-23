import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasValidToken());

  constructor() {}

  private hasValidToken(): boolean {
    const token = this.loadToken();
    return token != null && !this.tokenExpired(token);
  }

  public getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  public storeToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticated.next(true);
  }

  public loadToken(): string | null {
    return localStorage.getItem('token');
  }

  public dropToken(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
  }

  private getPayload(token: string): any {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  private tokenExpired(token: string): boolean {
    const expiry = this.getPayload(token).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }

  public isValid(): boolean {
    const token = this.loadToken();
    return token != null && !this.tokenExpired(token);
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  getUserIdentifier(): string | null {
    const token = this.loadToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      console.log('Decoded token:', decodedToken); // Add logging
      return decodedToken ? decodedToken.email : null;
    }
    return null;
  }

  getUserEmail(): string | null {
    const token = this.loadToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.email : null; // Assuming 'email' is the claim in the token
    }
    return null;
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  private isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate ? expirationDate.valueOf() < new Date().valueOf() : true;
  }

  // Add method to get roles from token
  getUserRoles(): string[] {
    const token = this.loadToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.roles || [];
    }
    return [];
  }
}
