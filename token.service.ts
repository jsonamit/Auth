import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class CustomerTokenService {

  private iss = {
    login: `${environment.baseApiUrl}/customers/login`
  };

  constructor() { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('customer_token', token);
  }

  get() {
    return localStorage.getItem('customer_token');
  }

  remove() {
    localStorage.removeItem('customer_token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return (<any>Object).values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
