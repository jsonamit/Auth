import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AdminAuthService } from '../shared/auth/admin/auth.service';
import { AdminTokenService } from '../shared/auth/admin/token.service';

import { CustomerAuthService } from '../shared/auth/auth.service';
import { CustomerTokenService } from '../shared/auth/token.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private Auth: AdminAuthService,
      private Token: AdminTokenService,
      private CustomerAuth: CustomerAuthService,
      private CustomerToken: CustomerTokenService


    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
           console.log(err.status);
            if (err.status === 401) {
                const currentPath = window.location.pathname;
                if(currentPath.search("/admin/") > -1) {
                    this.Token.remove();
                    this.Auth.changeAuthStatus(false);
                    this.router.navigateByUrl('/a/login');
                }else if(!( (currentPath.search('/a/login') > -1) || (request.url.search('/customers/login') > -1) )){
                    this.CustomerToken.remove();
                    this.CustomerAuth.changeAuthStatus(false);
                    this.router.navigateByUrl('/customer/?return'+currentPath);
                }
            }
            const error = err.error || err.statusText;
            return throwError(error);
        }))
    }
}
