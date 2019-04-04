import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { catchError  } from 'rxjs/operators/catchError';

import { environment } from '../../environments/environment';


@Injectable()
export class GeneralService {

  public apiUrl = `${environment.baseApiUrl}`;

  constructor(private _http: HttpClient) { }

  get(url: string): Observable<any> {
    let urlStr = `${this.apiUrl}/${url}`;
    const request: any = this._http.get(urlStr).pipe(map( response => response ));
    return request;
  }

  post(url: string, body): Observable<any> {
    const urlStr = `${this.apiUrl}/${url}`;
    //console.log('post method : ' + urlStr);
    const request: any = this._http.post(urlStr, body).pipe(map( response => response ));
    return request;
   
  }

   put(url: string, body): Observable<any> {
     let urlStr = `${this.apiUrl}/${url}`;
     const request: any = this._http.put(urlStr, body).pipe(map( response => response ));
     return request;
  }

  deleteRequest(url: string): Observable<any> {
    let urlStr = `${this.apiUrl}/${url}`;
    const request: any = this._http.delete(urlStr).pipe(map( response => response ));
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
