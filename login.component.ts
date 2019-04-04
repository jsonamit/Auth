import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { GeneralService } from "../../services/general.service";
import { AdminTokenService } from "../../shared/auth/admin/token.service";
import { AdminAuthService } from "../../shared/auth/admin/auth.service";
import { Injectable } from '@angular/core';

import { UserDataService } from "../../admin/services/userdata.service";

@Injectable() 
@Component({
    selector: 'app-admin-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class AdminLoginComponent {

    public form = {
        email: null,
        password: null,

    };
    showErrorMessage = false;
    public error = null;
    userRole: string; 

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private gservice: GeneralService,
        private Token: AdminTokenService,
        private Auth: AdminAuthService,
        private Userdata: UserDataService
    ) { }

    onSubmit() {
      this.gservice.post('login', this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }

    handleResponse(data) { 

      this.Token.handle(data.access_token);
      this.Auth.changeAuthStatus(true);
      this.router.navigateByUrl('/admin/badges');
    }

    handleError(error) {

       this.error = error.error;
       this.showErrorMessage = true;
    }
}
