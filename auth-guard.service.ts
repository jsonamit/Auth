import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CustomerTokenService } from './token.service';

@Injectable()
export class CustomerAuthGuard implements CanActivate {

  constructor(private Token: CustomerTokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

      if (this.Token.loggedIn()) {
        return true;
      } else {
        //this.router.navigateByUrl('/a/login');
        return false;
      }
  }
}
