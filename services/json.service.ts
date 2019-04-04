import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { catchError  } from 'rxjs/operators/catchError';

import { environment } from '../../environments/environment';

import { CustomerTokenService } from '../shared/auth/token.service'; 

@Injectable()
export class JsonService {

  public apiUrl = `${environment.baseApiUrl}`;

  constructor(
      private _http: HttpClient,
      private token : CustomerTokenService
  ) { }

  protected headers() {
    //console.log(this.token.get());
    return {
		'Authorization': `Bearer ${this.token.get()}`,
        'Content-Type' : 'application/json'
    }
  }

  get(url: string, headers = this.headers()): Observable<any> {
    let urlStr = `${this.apiUrl}/${url}`;
    const request: any = this._http.get(urlStr, { headers: headers } ).pipe(map( response => response ));
    return request;
  }

  post(url: string, body, headers = this.headers()): Observable<any> {
    let urlStr = `${this.apiUrl}/${url}`;
    const request: any = this._http.post(urlStr, body, { headers: headers } ).pipe(map( response => response ));
    return request;
  }

  put(url: string, body, headers = this.headers()): Observable<any> {
    let urlStr = `${this.apiUrl}/${url}`;
    const request: any = this._http.put(urlStr, body, { headers: headers } ).pipe(map( response => response ));
    return request;
  }

  deleteRequest(url: string, headers = this.headers()): Observable<any> {
    let urlStr = `${this.apiUrl}/${url}`;
    const request: any = this._http.delete(urlStr, { headers: headers } ).pipe(map( response => response ));
    return request;
  }


  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {
      // console.log(error); // log to console instead
       return of(error.error);
     };
  }


}
