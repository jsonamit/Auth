import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule, AdminLoginServices } from "./shared/shared.module";
import { AdminModule } from "./admin/admin.module";

import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { reducers, CustomSerializer } from "./store";
import { EffectsModule } from '@ngrx/effects';


import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { DragulaService } from 'ng2-dragula';
import { CustomerAuthService } from './shared/auth/auth.service';
import { CustomerAuthGuard } from './shared/auth/auth-guard.service';

import { GeneralService } from './services/general.service';
import { AdminLoginComponent } from "./login/admin/login.component";
import { UserLoginComponent } from "./login/login.component";

import { JwtInterceptor, ErrorInterceptor } from "./helpers/";

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { UserDataService } from "./admin/services/userdata.service";
import {JsonService} from './services/json.service';

import * as $ from 'jquery';
import { UpdatepasswordComponent } from './login/updatepassword/updatepassword.component';

export const metaReducers: MetaReducer<any>[] = [];

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        AdminLoginComponent,
        UserLoginComponent,
        UpdatepasswordComponent
    ],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule,
        SharedModule,
        AdminModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        ToastrModule.forRoot(),
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
              }
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo'
        })

    ],
    providers: [
        CustomerAuthService,
        CustomerAuthGuard,
        DragulaService,
        AdminLoginServices,
        GeneralService,
        UserDataService,
        // JsonService,
        { provide: RouterStateSerializer, useClass: CustomSerializer },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
