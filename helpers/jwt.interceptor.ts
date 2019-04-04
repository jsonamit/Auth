import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AdminTokenService } from '../shared/auth/admin/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
      private token: AdminTokenService,
      private route: ActivatedRoute
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if(window.location.pathname.search("/admin/") > -1) {
            let currentToken = this.token.get();
            if (currentToken) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentToken}`
                    }
                });
            }
        }

        return next.handle(request);
    }
}
