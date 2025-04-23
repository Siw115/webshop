import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../environments/environment.development";
import {Variant} from "../models/variant.model";

@Injectable({
    providedIn: 'root'
})
export class VariantService {
    private apiUrl = environment.base_url + '/variant';

    constructor(private http: HttpClient) {}

    getAllVariants(): Observable<Variant[]> {
        return this.http.get<Variant[]>(this.apiUrl)
            .pipe(catchError(this.handleError));
    }

    getVariantById(id: number): Observable<Variant> {
        return this.http.get<Variant>(`${this.apiUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    updateVariant(id: number, variant: Variant): Observable<Variant> {
        const url = `${this.apiUrl}/${id}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // No charset
        return this.http.put<Variant>(url, variant, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    createVariant(variant: Variant): Observable<string> { // Change return type to string
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.apiUrl, variant, { headers, responseType: 'text' }).pipe( // Specify responseType as 'text'
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        return throwError('Something bad happened; please try again later.');
    }

    deleteVariant(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.delete<void>(url, { headers })
            .pipe(catchError(this.handleError));
    }

}
