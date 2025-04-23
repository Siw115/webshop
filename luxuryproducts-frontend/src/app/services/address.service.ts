import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { TokenService } from '../auth/token.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addressUrl: string = environment.base_url + '/address';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private tokenService: TokenService) {}

  public createNewAddress(newAddress: Address): Observable<string> {
    console.log(newAddress);
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenService.loadToken(),
      'Content-Type': 'application/json'
    });

    const body = {
      street: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      postalCode: newAddress.postalCode,
      country: newAddress.country
    }
    
    return this.http.post(this.addressUrl, body, {
      headers: headers,
      responseType: 'text'
    }).pipe(
      tap(response => {
        console.log('Address response:', response);
      }),
      catchError(error => {
        console.error('Error Creating Address:', error);
        return throwError(() => error);
      })
    );
  } 

  public deleteAddress(id: number): Observable<any> {
    console.log("Deleting with id "+id);
    
    return this.http.delete(environment.base_url + `/address/${id}`);
  }

  updateAddress(address: Address): Observable<any> {
    const body = {
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      street: address.street,
      country: address.country
    }
    return this.http.put(environment.base_url + `/address/${address.id}`, body);
  }
}
