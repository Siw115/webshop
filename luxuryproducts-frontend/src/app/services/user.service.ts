import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import {Observable, delay, of, throwError, catchError, map} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { CustomUser } from '../models/customuser.model';
import { TokenService } from '../auth/token.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private profileUrl = environment.base_url + '/profile';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public getUserInfo(): Observable<CustomUser> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenService.loadToken()
    })
    return this.http.get<CustomUser>(this.profileUrl, { headers })
  }

  public isLoggedIn(): boolean {
    return !!this.tokenService.loadToken();
  }

  getUsersByRole(role: string): Observable<CustomUser[]> {
    return this.http.get<CustomUser[]>(`${this.profileUrl}/role/${role}`).pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

}
